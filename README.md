# PartPark

PartPark to aplikacja dla serwisantów i pracowników utrzymania ruchu: wskazują uszkodzoną część na modelu 3D produktu, widzą dobrany komplet z cenami poglądowymi i wysyłają producentowi zapytanie ofertowe.

| | |
|---|---|
| Stan | Prototyp w wersji 11 i szkic specyfikacji MVP w wersji 1.4 (2026-11-22) |
| Charakter | Projekt szkoleniowy. Wszystkie dane w prototypie są fikcyjne |
| Co jest w repozytorium | Prototyp (źródła, plik gotowy do otwarcia, testy) i dokumentacja |
| Czego jeszcze nie ma | Kodu aplikacji MVP. Powstanie po uzupełnieniu sekcji 6 i 7 w [SPEC.md](./SPEC.md) |

## Jak obejrzeć prototyp

Otwórz plik [`prototype/partpark-prototyp.html`](./prototype/partpark-prototyp.html) dwuklikiem w przeglądarce na komputerze. Plik działa bez instalacji i bez internetu.

Prototyp ma dwie ścieżki, przełączane w nagłówku:

- **Klient:** Produkt → Części → Zapytanie → Potwierdzenie.
- **Producent · sBoM Studio:** Repozytorium → Przegląd → Publikacja → Cennik.

## Struktura repozytorium

```text
PartPark/
├── README.md                  ten plik
├── SPEC.md                    specyfikacja MVP (7 sekcji)
├── DESIGN.md                  system projektowy
├── DESIGN-LICENSE.md          źródło i licencja DESIGN.md oraz krojów pisma
├── package.json               skrypty budowania i testów, wersje bibliotek
├── package-lock.json          dokładne wersje zależności
├── .gitignore
├── .gitattributes
├── docs/
│   ├── brief.md               brief: problem, użytkownik, wartość, zakres, wymagania do MVP
│   ├── wyniki-testow.md       uwagi osób testujących i co z nich wynikło
│   ├── specyfikacja.md        szeroka specyfikacja 2.4 (materiał źródłowy)
│   ├── zalacznik-erp-api.md   moduł opcjonalny: integracja z ERP
│   ├── kurs/                  odpowiedzi do zadań kursu (PR1, PR2)
│   └── szkice/                materiały robocze, m.in. szkic sekcji 6 i 7 SPEC.md
└── prototype/
    ├── README.md              opis źródeł, budowania i testów prototypu
    ├── THIRD-PARTY-NOTICES.md licencje bibliotek i kroju użytych w prototypie
    ├── partpark-prototyp.html plik gotowy do otwarcia (wynik budowania)
    ├── src/                   źródła: page.html, app.js, fonts/
    ├── scripts/build.js       budowanie
    └── tests/                 testy w przeglądarce (Playwright)
```

## Dokumentacja

| Plik | Co zawiera | Kiedy czytać |
|---|---|---|
| [SPEC.md](./SPEC.md) | Zakres MVP, ekrany głównej ścieżki, user stories z kryteriami | Przed budową aplikacji. Sekcje 6 i 7 uzupełnia właściciel PartPark |
| [DESIGN.md](./DESIGN.md) | Kolory, typografia, ramka aplikacji, komponenty, dostępność, język | Przy każdym ekranie |
| [DESIGN-LICENSE.md](./DESIGN-LICENSE.md) | Źródło DESIGN.md, licencja CC BY 4.0, licencje krojów | Przed udostępnieniem DESIGN.md innym |
| [docs/brief.md](./docs/brief.md) | Brief prototypu i wymagania do MVP dodane po prototypie | Żeby sprawdzić, czy funkcja jest w zakresie |
| [docs/wyniki-testow.md](./docs/wyniki-testow.md) | Wyniki testów i zmiany, które z nich wynikły | Po każdym teście |
| [docs/specyfikacja.md](./docs/specyfikacja.md) | Specyfikacja 2.4: formaty danych, XML zapytania, architektura | Jako źródło szczegółów. Opisuje wcześniejszy pomysł na stos; obowiązuje SPEC.md |
| [docs/zalacznik-erp-api.md](./docs/zalacznik-erp-api.md) | Standard API JSON i mapowanie pól do ERP | Gdy integracja z ERP wejdzie do planu |
| [docs/kurs/](./docs/kurs/) | Odpowiedzi do pól formularzy PR1 i PR2 | Przy oddawaniu zadań kursu |
| [docs/szkice/SPEC-szkic-sekcji-6-7.md](./docs/szkice/SPEC-szkic-sekcji-6-7.md) | Szkic sekcji „Kierunek budowy” i „Wygląd” | Jako materiał pomocniczy do sekcji 6 i 7 |

## Praca nad prototypem

Potrzebny jest Node.js 20 lub nowszy.

```bash
npm install                      # biblioteki: three.js, jsPDF, JSZip, Playwright
npm run build                    # składa prototype/partpark-prototyp.html ze źródeł
npx playwright install chromium  # raz, przed pierwszym uruchomieniem testów
npm test                         # budowanie i trzy zestawy testów
```

Szczegóły są w [prototype/README.md](./prototype/README.md).

## Zasady

- **Dane fikcyjne.** W prototypie i w przykładach nie ma imion i nazwisk, adresów, telefonów ani nazw firm. Zamiast osób są role („Serwisant”), producenci nazywają się „Producent A–D”, a adresy e-mail mają domenę `.example`.
- **Plik gotowy do otwarcia jest w repozytorium.** Po każdej zmianie w `prototype/src/` uruchom `npm run build` i zapisz w tym samym commicie źródła razem z `prototype/partpark-prototyp.html`.
- **Zakres pilnuje SPEC.md.** Funkcja, której nie ma w briefie, trafia do kolumny „Poza zakresem”. Pytanie bez odpowiedzi ma oznaczenie `[DO USTALENIA: …]`.
- **Sekrety nie trafiają do repozytorium.** Pliki `.env` są pominięte w `.gitignore`.

## Licencje

| Co | Licencja |
|---|---|
| `DESIGN.md` | Creative Commons Uznanie autorstwa 4.0 (CC BY 4.0). Treść i nota w [DESIGN-LICENSE.md](./DESIGN-LICENSE.md) |
| Kod prototypu i pozostałe dokumenty | Licencja nie została jeszcze wybrana. Do czasu decyzji właściciela PartPark wszelkie prawa są zastrzeżone |
| Biblioteki i krój osadzone w prototypie | three.js (MIT), jsPDF (MIT), JSZip (MIT albo GPLv3), DejaVu Sans (licencja Bitstream Vera). Teksty w [prototype/THIRD-PARTY-NOTICES.md](./prototype/THIRD-PARTY-NOTICES.md) |
