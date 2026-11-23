# PartPark — załącznik: integracja z ERP (moduł opcjonalny N6)

| | |
|---|---|
| Status | Moduł opcjonalny, poza MVP w specyfikacji 2.0 |
| Pochodzenie | Sekcja 6 i historie US-20 do US-24 ze specyfikacji 1.2 (2026-11-17) |
| Powiązane | [specyfikacja.md](./specyfikacja.md) · [design.md](../DESIGN.md) |

**Jak czytać ten załącznik.** W specyfikacji 2.0 podstawowym kanałem jest zapytanie ofertowe wysyłane e-mailem w formatach XML i PDF do biura obsługi klienta producenta. Ceny w PartPark są poglądowe, a ostateczną ofertę przesyła biuro obsługi klienta. Integracja z ERP pozostaje modułem opcjonalnym i służy do dwóch rzeczy:

1. **ERP → PartPark:** import indeksów i cennika poglądowego do sBoM Studio (`PUT /items`, `PUT /prices`).
2. **PartPark → ERP / CRM:** przekazanie zapytania ofertowego jako komunikatu JSON (zdarzenie `rfq.created`) przez ten sam silnik mapowania.

Poniższy opis pochodzi z wersji 1.2 i mówi o zamówieniach i płatnościach (`order.created`, `order.paid`). Zasady kontraktu, konektory i mapowanie pól pozostają aktualne. Komunikaty zamówień i płatności wymagają przepisania na zapytanie ofertowe, zanim moduł trafi do realizacji.

Kody ekranów S-15 do S-19 i numery funkcji w tym załączniku pochodzą z wersji 1.2 (panel integracji) i nie odpowiadają numeracji specyfikacji 2.0.

## 1. Standard wymiany danych i mapowanie pól

PartPark wystawia jeden, niezależny od dostawcy standard wymiany danych: model kanoniczny w JSON. Dopasowanie do konkretnego ERP odbywa się w profilu mapowania połączenia, a nie w kodzie. Rdzeń PartPark zna tylko model kanoniczny.

```text
PartPark (model kanoniczny JSON) → profil mapowania (pola, transformacje, słowniki) → konektor (push / pull) → API dowolnego ERP
ERP (indeksy, ceny, kontrahenci, statusy) → profil mapowania wejściowego → model kanoniczny → PartPark
```

### 1.1 Zasady kontraktu

| Zasada | Ustalenie |
|---|---|
| Format | JSON, UTF-8, `Content-Type: application/json` |
| Specyfikacja | OpenAPI 3.1, schematy JSON Schema 2020-12, publikowane pod `/erp/v1/openapi.json` |
| Wersjonowanie | Wersja w ścieżce (`/erp/v1`); zmiany wstecznie zgodne tylko przez dodanie pól opcjonalnych; odbiorca ignoruje nieznane pola |
| Daty | ISO 8601 z przesunięciem strefy, np. `2026-11-17T10:42:00+01:00` |
| Kwoty | Liczba dziesiętna zapisana tekstem (`"412.00"`), waluta ISO 4217 osobno (`"PLN"`) |
| Ilości | Liczba dziesiętna zapisana tekstem (`"2"`, `"0.5"`) + jednostka (`"szt"`, `"kg"`) |
| Identyfikatory | `orderId` (UUID PartPark), `orderNumber` (czytelny, np. `PP-2026-001234`), `itemCode` = indeks w ERP |
| Idempotencja | Nagłówek `Idempotency-Key` w każdym zapisie; powtórzenie z tym samym kluczem zwraca wynik pierwszego wywołania |
| Bezpieczeństwo | TLS 1.2+; webhooki podpisane HMAC-SHA256 (`X-PartPark-Signature`, `X-PartPark-Timestamp`, okno 5 min); wywołania do PartPark przez OAuth 2.0 client credentials |
| Błędy | RFC 9457 (`application/problem+json`) z polem `errors[]` wskazującym ścieżkę JSON |

### 1.2 Przepływy

| Kierunek | Zdarzenie / endpoint | Kiedy | Tryb |
|---|---|---|---|
| PartPark → ERP | Webhook `order.created` | Zamówienie złożone (przelew z terminem) | push lub pull |
| PartPark → ERP | Webhook `order.paid` | Operator potwierdził płatność online | push lub pull |
| PartPark → ERP | Webhook `order.cancelled` | Anulowanie przed realizacją | push lub pull |
| ERP → PartPark | `GET /erp/v1/orders?status=pending&since=…` | ERP w trybie pull pobiera zamówienia (w formacie kanonicznym lub po mapowaniu) | pull |
| ERP → PartPark | `POST /erp/v1/orders/{orderId}/ack` | ERP potwierdza przyjęcie i podaje numer dokumentu | pull |
| ERP → PartPark | `POST /erp/v1/orders/{orderId}/status` | Zmiana statusu: w realizacji, wysłane, zafakturowane (+ nr faktury, PDF, nr przesyłki) | zawsze |
| ERP → PartPark | `PUT /erp/v1/items` | Indeksy: nazwa, jednostka, aktywność (wsadowo, do 1000 rekordów) | zawsze |
| ERP → PartPark | `PUT /erp/v1/prices` | Cenniki i ceny kontrahentów | zawsze |
| ERP → PartPark | `PUT /erp/v1/customers` | Kontrahenci: NIP, cennik, limit kupiecki, termin płatności | zawsze |
| ERP → PartPark | `PUT /erp/v1/stock` | Stany i terminy dostawy (N5) | opcjonalnie |
| PartPark → ERP | `price-quote` (adres z połączenia) | Potwierdzenie ceny przed płatnością | opcjonalnie |

Zdarzenia przychodzące z ERP (`PUT /items`, `/prices`, `/customers`, `POST /status`) mogą mieć format kanoniczny albo własny format ERP; w drugim przypadku przechodzą przez mapowanie wejściowe połączenia.

W trybie push ERP odpowiada `200`/`201` z identyfikatorem dokumentu albo `202 Accepted`, gdy dokument powstaje asynchronicznie i numer przyjdzie w `/status`. PartPark ponawia dostarczenie przy błędach `5xx` i przekroczeniu czasu (10 s) z wykładniczym odstępem do 24 h, a komunikaty z błędem `4xx` od razu trafiają do S-15.

### 1.3 Komunikat zamówienia (przykład)

```json
{
  "event": "order.paid",
  "eventId": "6f1c2a9e-0d4b-4c1e-9a37-2b8e5d1f7c40",
  "occurredAt": "2026-11-17T10:42:00+01:00",
  "apiVersion": "1.0",
  "order": {
    "orderId": "b3e1a7c2-58f4-4f0a-9c6d-1e2f3a4b5c6d",
    "orderNumber": "PP-2026-001234",
    "createdAt": "2026-11-17T10:38:12+01:00",
    "currency": "PLN",
    "customer": {
      "erpCustomerId": "K-004512",
      "taxId": "PL1234567890",
      "name": "Firma utrzymaniowa (dane demo)",
      "contact": { "name": "Serwisant (rola)", "email": "serwisant@firma-utrzymaniowa.example", "phone": "000 000 000" }
    },
    "billingAddress": { "street": "Adres siedziby (demo)", "postalCode": "00-000", "city": "Miasto (demo)", "country": "PL" },
    "shippingAddress": { "street": "Miejsce instalacji produktu (demo)", "postalCode": "00-000", "city": "Miasto (demo)", "country": "PL" },
    "site": { "name": "Miejsce instalacji (demo)", "equipmentSerials": ["2021/04/1187"] },
    "fulfilment": { "mode": "express", "installationRequested": false, "notes": "Urządzenie wyłączone z użytku" },
    "lines": [
      {
        "lineId": "L1", "lineType": "part", "parentLineId": null,
        "itemCode": "KR-0110-02", "name": "Łożysko główne 6208-2RS w obudowie",
        "quantity": "1", "unit": "szt", "unitNetPrice": "412.00", "vatRate": "23", "netAmount": "412.00",
        "product": { "code": "KR-0110", "name": "Karuzela tarczowa Orbit" },
        "model": { "nodeKey": "Orbit/Lozysko-1", "pdmVersion": "7" }
      },
      {
        "lineId": "L2", "lineType": "kit", "parentLineId": "L1",
        "itemCode": "SRV-SM-LT2-400", "name": "Smar łożyskowy LT-2, 400 g",
        "quantity": "1", "unit": "szt", "unitNetPrice": "38.00", "vatRate": "23", "netAmount": "38.00",
        "kit": { "kitId": "KIT-KR-0110-02", "kitVersion": 3, "required": true }
      },
      {
        "lineId": "L3", "lineType": "kit", "parentLineId": "L1",
        "itemCode": "SRV-SR-40628", "name": "Semmering 40×62×8 NBR",
        "quantity": "2", "unit": "szt", "unitNetPrice": "24.50", "vatRate": "23", "netAmount": "49.00",
        "kit": { "kitId": "KIT-KR-0110-02", "kitVersion": 3, "required": true }
      },
      {
        "lineId": "L4", "lineType": "service", "parentLineId": null,
        "itemCode": "USL-EXPRESS", "name": "Tryb ekspres 48 h",
        "quantity": "1", "unit": "usł", "unitNetPrice": "180.00", "vatRate": "23", "netAmount": "180.00"
      }
    ],
    "totals": { "net": "679.00", "vat": "156.17", "gross": "835.17", "shippingNet": "0.00" },
    "payment": {
      "method": "blik", "status": "paid", "provider": "przelewy24",
      "transactionId": "P24-9876543210", "amount": "835.17", "paidAt": "2026-11-17T10:41:47+01:00"
    }
  }
}
```

Przykład jest skrócony do czterech pozycji; pełny komunikat zawiera wszystkie pozycje kompletu.

**Typy pozycji (`lineType`):** `part` to część wskazana na modelu, `kit` to pozycja kompletu sBoM wskazująca część nadrzędną w `parentLineId`, `service` to usługa (ekspres, dostawa, montaż). Pozycje zalecane odznaczone przez klienta nie trafiają do komunikatu.

**Wartości `payment.method`:** `card`, `blik`, `pay_by_link`, `bank_transfer_deferred`. Przy przelewie z terminem `payment.status` = `pending` i pole `dueDate`.

### 1.4 Potwierdzenie i status (przykłady)

Odpowiedź ERP (po mapowaniu odpowiedzi) lub treść `POST /erp/v1/orders/{orderId}/ack`:

```json
{ "orderId": "b3e1a7c2-58f4-4f0a-9c6d-1e2f3a4b5c6d", "erpDocumentId": "ZS-2026/11/00321", "acceptedAt": "2026-11-17T10:42:03+01:00" }
```

Aktualizacja statusu z ERP (`POST /erp/v1/orders/{orderId}/status`):

```json
{
  "status": "invoiced",
  "erpDocumentId": "ZS-2026/11/00321",
  "invoice": { "number": "FS-2026/11/01877", "ksefId": "1234567890-20261118-ABC123", "pdfUrl": "https://erp.producent.example/faktury/FS-2026-11-01877.pdf" },
  "shipment": { "carrier": "Przewoźnik (demo)", "trackingNumber": "0000123456789" },
  "changedAt": "2026-11-18T14:05:00+01:00"
}
```

Dozwolone wartości `status`: `accepted`, `in_progress`, `shipped`, `invoiced`, `cancelled`, `rejected` (z polem `reason`).

### 1.5 Konektory

| Konektor | Jak działa | Dla kogo | Zakres |
|---|---|---|---|
| REST push | PartPark wywołuje API ERP komunikatem po mapowaniu i mapuje odpowiedź | ERP z API REST/JSON (np. SAP Business One Service Layer, Dynamics 365 BC, enova365 API) | MVP (M19) |
| REST pull | ERP lub jego middleware pobiera komunikaty z PartPark i je potwierdza | ERP za firewallem, integratorzy z własną szyną | MVP (M19) |
| Agent on-premise | Usługa Windows w sieci klienta pobiera komunikaty (pull) i zapisuje je biblioteką ERP lub do bazy pośredniej | ERP bez API REST (np. Comarch ERP XL przez API XL) | N12 |
| Pliki | Komunikaty JSON / XML / CSV na SFTP, potwierdzenia plikami zwrotnymi | Starsze systemy | N13 |

Każdy konektor używa tego samego modelu kanonicznego i tego samego silnika mapowania.

### 1.6 Mapowanie pól

| Element | Opis |
|---|---|
| Połączenie | Nazwa, konektor, adresy (produkcja, sandbox), uwierzytelnianie, zdarzenia, harmonogram synchronizacji, reguła routingu |
| Profil mapowania | Osobny dla każdego zdarzenia i kierunku (np. `order.paid` → dokument sprzedaży ERP; statusy ERP → `status`); wersjonowany |
| Reguła pola | Pole docelowe ← źródło (ścieżka JSON), stała lub wyrażenie; transformacja; słownik; wartość domyślna; „wymagane” |
| Mapowanie tablic | Pozycje 1:1, filtr, grupowanie, podział na kilka dokumentów, spłaszczenie pozycji kompletu |
| Słowniki | Jednostki, stawki VAT, metody płatności, statusy, magazyny, waluty, kraje |
| Tabele powiązań | Indeksy i kontrahenci PartPark ↔ ERP, gdy kody się różnią |
| Mapowanie odpowiedzi | Gdzie w odpowiedzi ERP jest identyfikator dokumentu, status i komunikat błędu |
| Silnik | Wyrażenia JSONata, wykonywane w izolacji z limitem czasu i pamięci; edytor graficzny generuje wyrażenia, a tryb zaawansowany pozwala je edytować |
| Szablony | Gotowe profile dla popularnych ERP (N11), kopiowane do połączenia i dostosowywane |

### 1.7 Przykład profilu mapowania

Profil przekształca zdarzenie `order.paid` na dokument sprzedaży w przykładowym ERP z API REST. Nazwy pól po stronie ERP są przykładowe.

```json
{
  "profileId": "erp-x-sales-order",
  "connectionId": "erp-x-produkcja",
  "event": "order.paid",
  "direction": "outbound",
  "version": 4,
  "status": "published",
  "target": {
    "method": "POST",
    "path": "/api/v2/sales-orders",
    "schemaRef": "erp-x/sales-order.schema.json"
  },
  "fields": [
    { "target": "DocumentType", "value": "SO" },
    { "target": "ExternalReference", "source": "$.order.orderNumber", "required": true },
    { "target": "CustomerCode", "source": "$.order.customer.taxId", "lookup": "customers", "onMissing": "hold" },
    { "target": "OrderDate", "source": "$.order.createdAt", "transform": "$fromMillis($toMillis(value), '[Y0001]-[M01]-[D01]')" },
    { "target": "Currency", "source": "$.order.currency" },
    { "target": "PaymentMethod", "source": "$.order.payment.method", "dictionary": "payment-methods" },
    { "target": "DeliveryAddress.Street", "source": "$.order.shippingAddress.street" },
    { "target": "DeliveryAddress.City", "source": "$.order.shippingAddress.city" },
    { "target": "Remarks", "expr": "'PartPark ' & $.order.orderNumber & ' / ' & $.order.site.name" }
  ],
  "arrays": [
    {
      "target": "Lines",
      "source": "$.order.lines",
      "filter": "lineType in ['part', 'kit', 'service']",
      "fields": [
        { "target": "ItemCode", "source": "itemCode", "lookup": "items", "onMissing": "passThrough" },
        { "target": "Quantity", "source": "quantity", "transform": "$number(value)" },
        { "target": "UnitOfMeasure", "source": "unit", "dictionary": "units" },
        { "target": "UnitPrice", "source": "unitNetPrice", "transform": "$round($number(value), 2)" },
        { "target": "TaxCode", "source": "vatRate", "dictionary": "vat-rates" },
        { "target": "LineComment", "expr": "lineType = 'kit' ? 'Komplet do pozycji ' & parentLineId : ''" }
      ]
    }
  ],
  "dictionaries": {
    "units": { "szt": "PCS", "kg": "KG", "usł": "SRV" },
    "vat-rates": { "23": "VAT23", "8": "VAT8", "0": "VAT0" },
    "payment-methods": { "card": "CARD", "blik": "CARD", "pay_by_link": "ONLINE", "bank_transfer_deferred": "TRANSFER14" }
  },
  "response": {
    "documentId": "$.Id",
    "documentNumber": "$.Number",
    "error": "$.Errors[0].Message"
  }
}
```

Komunikat kanoniczny z sekcji 1.3 po tym mapowaniu daje dokument z czterema pozycjami. Pozycje kompletu mają komentarz wskazujący pozycję części, a jednostka `szt` zamienia się na `PCS`.

## 2. Historie użytkownika modułu

### ERP-US-01 Standard API i konektory · S-16

Jako administrator integracji chcę podłączyć dowolny ERP do PartPark według udokumentowanego standardu, bez zmian w kodzie PartPark.

- Standard (model kanoniczny) jest opublikowany jako OpenAPI 3.1 z JSON Schema 2020-12 i przykładami. Zmiany niezgodne wstecz wymagają nowej wersji (`/v2`), a `/v1` działa co najmniej 12 miesięcy po jej wydaniu.
- Połączenie działa w trybie **push** (PartPark wywołuje API ERP z komunikatem po mapowaniu) albo **pull** (ERP pobiera komunikaty z PartPark i je potwierdza). Tryb pull nie wymaga otwierania portów w sieci klienta.
- Push obsługuje uwierzytelnianie API key, Basic, OAuth 2.0 client credentials i certyfikat klienta (mTLS); sekrety są przechowywane w Key Vault i nie są widoczne w panelu po zapisaniu.
- Każdy komunikat PartPark ma podpis HMAC-SHA256 w nagłówku `X-PartPark-Signature`.
- Wywołania z ERP do PartPark (indeksy, ceny, kontrahenci, statusy) uwierzytelnia OAuth 2.0 client credentials z zakresami (`erp.items.write`, `erp.prices.write`, `erp.orders.read`, `erp.orders.status.write`).
- Jedna instalacja PartPark obsługuje wiele połączeń (np. różne ERP dla różnych spółek lub regionów); reguła routingu wskazuje połączenie dla zamówienia.

### ERP-US-02 Mapowanie pól zamówienia · S-17

Jako administrator integracji chcę wskazać, które pole naszego ERP odpowiada polu standardu PartPark, aby zamówienie powstało w ERP w poprawnej strukturze.

- **Mając** schemat dokumentu ERP (wgrany jako JSON Schema / OpenAPI lub wywnioskowany z przykładowego JSON), **gdy** otworzę edytor, **wtedy** widzę pola standardu po lewej i pola ERP po prawej.
- Regułę pola tworzę przez wskazanie źródła (ścieżka w modelu kanonicznym), stałej wartości lub wyrażenia; dostępne transformacje: format daty, liczby i zaokrąglenie, łączenie i przycinanie tekstu, wielkość liter, warunek, wartość domyślna, słownik, tabela powiązań.
- Tablicę `lines` mogę zmapować na tablicę pozycji ERP 1:1, z filtrem (np. tylko `lineType = "part"`) albo z rozdzieleniem na dokumenty (np. usługi osobno).
- Pozycje kompletu mogę przekazać jako zwykłe pozycje, jako pozycje podrzędne albo jako komentarz do pozycji części, zależnie od możliwości ERP.
- Mapowanie odpowiedzi ERP wskazuje, skąd odczytać identyfikator dokumentu i komunikat błędu.
- Pole wymagane w schemacie ERP bez reguły blokuje publikację wersji mapowania.

### ERP-US-03 Słowniki i tabele powiązań · S-18

Jako administrator integracji chcę przełożyć wartości PartPark na kody ERP, aby jednostki, stawki VAT, metody płatności i statusy były zgodne z ERP.

- Słownik to para „wartość PartPark → wartość ERP” z wartością domyślną; słowniki działają w obu kierunkach (np. statusy ERP → statusy PartPark).
- Tabela powiązań indeksów pozwala używać w PartPark innych kodów niż w ERP; brak powiązania przekazuje kod bez zmian albo zatrzymuje komunikat (do wyboru).
- Słowniki i tabele mogę importować i eksportować w CSV.
- **Gdy** w ruchu pojawi się wartość bez wpisu w słowniku, **wtedy** komunikat trafia do kolejki „do uzupełnienia”, a w S-18 widzę brakującą wartość z przyciskiem dodania wpisu i ponowienia.

### ERP-US-04 Test, publikacja i wycofanie mapowania · S-17, S-19

Jako administrator integracji chcę sprawdzić mapowanie przed uruchomieniem, aby błędna konfiguracja nie zatrzymała sprzedaży.

- Podgląd pokazuje wynik mapowania dla wybranego, prawdziwego lub przykładowego zamówienia obok komunikatu kanonicznego.
- Walidacja wyniku względem schematu ERP wskazuje ścieżkę i przyczynę błędu.
- Wysyłka testowa trafia na adres sandbox połączenia i pokazuje pełną odpowiedź ERP.
- Mapowanie ma wersje: szkic, opublikowana, archiwalna. Publikacja wymaga udanego testu; wycofanie do poprzedniej wersji działa jednym kliknięciem.
- Każde zamówienie zapisuje wersję mapowania, którą zostało wysłane; zmiany są w dzienniku audytu (kto, kiedy, co).

### ERP-US-05 Monitor wymiany danych · S-15, S-19

Jako administrator integracji chcę widzieć każdy komunikat w obie strony, aby szybko znaleźć przyczynę błędu.

- Log pokazuje komunikat kanoniczny, komunikat po mapowaniu, odpowiedź ERP, czas, liczbę prób i status; dane osobowe są maskowane dla ról bez uprawnień.
- Komunikat z dead-letter mogę ponowić po poprawie mapowania lub słownika.
- Alert (e-mail, Teams) pojawia się po 3 nieudanych próbach albo gdy połączenie nie odpowiada dłużej niż 15 min.
- Log jest przechowywany 90 dni.
