# PartPark — specyfikacja aplikacji (MVP)

| | |
|---|---|
| Wersja | 2.4 (szkic do akceptacji): ergonomia interfejsu: każdy etap to jeden ekran, który mieści się w oknie na komputerze i telefonie, ze stałym paskiem kroków i paskiem akcji (M25, US-27, sekcja 3.4) |
| Data | 2026-11-22 |
| Autor | Jarosław Seretny / Claude |
| Powiązane | [Prototyp](https://claude.ai/artifact/WcigZ593MGMhwZZYKV7qMv) · [brief.md](./brief.md) · [design.md](../DESIGN.md) · [zalacznik-erp-api.md](./zalacznik-erp-api.md) |

Numeracja funkcji, ekranów i historii od wersji 2.0 zastępuje numerację z wersji 1.x.

**Poprawka danych przykładowych (2026-11-22, po porównaniu z materiałem kursu o prototypie):** w przykładach XML i JSON nie ma już nazwiska, numeru NIP wyglądającego na prawdziwy, telefonu ani adresu. Zastąpiły je role i dane demonstracyjne. Wymagania się nie zmieniły.

**Zmiany w wersji 2.4** (ergonomia interfejsu):

- Każdy etap obu ścieżek jest osobnym ekranem, który mieści się w oknie przeglądarki na komputerze i na telefonie. Strona się nie przewija; przewijają się tylko listy, we własnych ramkach (M25, US-27, sekcja 3.4).
- Użytkownik zawsze widzi, gdzie jest: stały pasek kroków pokazuje numer i nazwę etapu oraz stan każdego kroku, a stały pasek akcji pokazuje stan pracy i jedną główną akcję ekranu (US-27).
- Nawigację po sekcjach zastąpiły kroki: klient „Produkt, Części, Zapytanie, Potwierdzenie”, sBoM Studio „Repozytorium, Przegląd, Publikacja, Cennik” (sekcja 1.4, US-26).
- Strona główna klienta (S-01) została usunięta: aplikacja otwiera się na katalogu. Potwierdzenie zapytania (S-06) i publikacja (S-15) są ekranami kroku, a nie oknem nad stroną ani stopką listy.
- Formularz zapytania (S-05): sześć pól wymaganych i przełącznik pilności mieszczą się w oknie, a pola opcjonalne są zwinięte (US-12).

**Zmiany w wersji 2.3:**

- Cennik poglądowy (S-14, US-22): cenę jednej części ustawia się w edytorze części, a ekran cennika służy do masowej aktualizacji cen z pliku CSV. Ekran pozwala pobrać wzorcowy plik CSV, zapisuje historię cen i pokazuje trend ceny w trzech stanach: wzrost, stała, spadek.
- Uprawnienia właściciela produktu są rozstrzygnięte: jest przypisany do wszystkich produktów producenta, widzi całe repozytorium producenta i sam zatwierdza publikację (sekcja 1.3, US-23, US-26). Oba pytania zniknęły z sekcji 10.
- Ścieżka modułu sBoM Studio ma cztery ekrany: S1–S4 (sekcja 1.4).

**Zmiany w wersji 2.2:**

- Ścieżka klienta i ścieżka modułu sBoM Studio są opisane osobno (sekcje 1.4 i 3) i mają osobne wejścia, nawigację i uprawnienia (M24, US-26).
- Rola „inżynier serwisu producenta” nazywa się teraz „właściciel produktu”: to osoba po stronie producenta, która odpowiada za poprawną definicję sBoM i cennik poglądowy.
- Kody ekranów `S-xx` zostają bez zmian. Doszło oznaczenie miejsca na ścieżce: K1–K4 dla klienta i S1–S3 dla sBoM Studio.

**Zmiany w wersji 2.1** (po przejściu ścieżki na komputerze i telefonie, opis w [pr2-odpowiedzi.md](./kurs/pr2-odpowiedzi.md)):

- Aplikacja startuje z pustym zapytaniem, a viewer pokazuje podpowiedź pierwszego kroku (US-04).
- Rozsunięcie modelu ma przycisk z napisem, a część wybrana z listy sama się odsłania (US-05, US-06).
- Dotyk ma większą tolerancję ruchu palca, a ostatnio zaznaczoną część i jej komplet pokazuje pasek w viewerze (US-04).

## 1. Cel produktu

PartPark pozwala wskazać uszkodzoną część dowolnego produktu na interaktywnym modelu serwisowym i wysłać do producenta kompletne zapytanie ofertowe. Serwisowy BoM (sBoM) sam dobiera elementy zależne potrzebne do wymiany, np. do łożyska: smar, uszczelnienie i śruby zabezpieczające.

Aplikacja nie jest związana z jedną branżą. Nadaje się do każdego produktu, którego cykl życia kończy się etapem serwisu części zamiennych: urządzeń placów zabaw, wózków paletowych, mebli biurowych, pomp przemysłowych i innych.

### 1.1 Założenia podstawowe

1. **Dowolny produkt.** Model danych opisuje produkt, jego elementy i komplety serwisowe bez pojęć branżowych.
2. **Wielu producentów.** Każdy producent prowadzi własne repozytorium sBoM i udostępnia swoim klientom aktualizacje sBoM razem z cenami.
3. **Ceny poglądowe.** Ceny w aplikacji nie stanowią oferty handlowej. Wymagają potwierdzenia przez biuro obsługi klienta (BOK) producenta.
4. **Zapytanie ofertowe zamiast zamówienia.** Klient wysyła zapytanie, które trafia na określony adres e-mail BOK w formatach XML i PDF. Ostateczną ofertę przesyła BOK.
5. **sBoM Studio.** Producent tworzy uproszczony model serwisowy z pliku STEP albo PNG, a automat proponuje części zamienne i komplety.
6. **Człowiek zatwierdza.** Każdą propozycję automatu przegląda właściciel produktu po stronie producenta. Do klientów trafiają tylko elementy zatwierdzone.
7. **Dwie ścieżki.** Klient i producent pracują w osobnych perspektywach. Klient nie widzi modułu sBoM Studio, a jedynym połączeniem obu ścieżek jest publikacja wersji sBoM z cenami.

### 1.2 Miary sukcesu MVP

Wartości są propozycją do ustalenia z zespołem.

- Co najmniej 80% zapytań od klientów pilotażowych nie wymaga dopytania przez BOK, o którą część chodzi.
- Zero zapytań, w których brakuje wymaganego elementu kompletu.
- Mediana czasu od otwarcia produktu do wysłania zapytania poniżej 5 minut.
- Przygotowanie modelu serwisowego w sBoM Studio (od importu do publikacji) trwa poniżej 2 godzin dla złożenia do 200 komponentów.
- Co najmniej 70% propozycji automatu człowiek zatwierdza bez zmian.

### 1.3 Role

| Rola | Kto | Co robi w MVP |
|---|---|---|
| Klient | Serwisant, dział utrzymania ruchu, użytkownik produktu | Wybiera produkt, zaznacza części, wysyła zapytanie ofertowe, czyta instrukcje |
| Gość | Niezalogowany użytkownik | Przegląda katalog i model, buduje listę części; do wysłania zapytania podaje dane firmy |
| Właściciel produktu (producent) | Osoba po stronie producenta, która odpowiada za poprawną definicję sBoM i cennik poglądowy produktu, np. z działu serwisu lub konstrukcyjnego | Pracuje w module sBoM Studio: importuje modele, przegląda propozycje automatu, ustala indeksy, komplety i ceny poglądowe, aktualizuje cennik, publikuje wersje. Jest przypisany do wszystkich produktów producenta, widzi całe jego repozytorium i sam zatwierdza publikację |
| Biuro obsługi klienta (BOK) | Pracownik producenta | Odbiera zapytanie e-mailem (XML + PDF), potwierdza ceny i dostępność, przesyła ostateczną ofertę |
| Administrator producenta | Osoba odpowiedzialna za konto producenta | Zarządza użytkownikami, adresami e-mail BOK, regułami kierowania zapytań i widocznością katalogu |
| Operator platformy | Zespół PartPark | Zakłada konta producentów, nadzoruje konwersje i dostarczanie e-maili |

### 1.4 Dwie ścieżki

PartPark ma dwie perspektywy z osobnym wejściem, paskiem kroków i uprawnieniami. Nie mieszają się na jednym ekranie.

| | Ścieżka klienta | Ścieżka producenta: moduł sBoM Studio |
|---|---|---|
| Kto | Klient albo gość | Właściciel produktu po stronie producenta |
| Za co odpowiada | Wskazanie uszkodzonych części i wysłanie zapytania | Poprawna definicja sBoM i cennik poglądowy |
| Wejście | Adres aplikacji klienta, bez logowania do przeglądania | Osobny adres modułu, po zalogowaniu kontem producenta |
| Pasek kroków | 1 Produkt → 2 Części → 3 Zapytanie → 4 Potwierdzenie; obok, poza numeracją, „Instrukcje” | 1 Repozytorium → 2 Przegląd → 3 Publikacja → 4 Cennik |
| Ekrany po kolei | K1 Wybór produktu (S-02) → K2 Model serwisowy (S-03, S-04) → K3 Zapytanie ofertowe (S-05) → K4 Potwierdzenie (S-06) | S1 Repozytorium i import (S-10, S-11) → S2 Przegląd modelu i sBoM (S-12, S-13) → S3 Publikacja (S-15) → S4 Cennik poglądowy (S-14) |
| Wynik | Zapytanie ofertowe XML + PDF w skrzynce BOK | Opublikowana wersja sBoM i aktualny cennik poglądowy w katalogu klientów |

Ścieżki łączy tylko publikacja: klient widzi wyłącznie wersję sBoM i cennik opublikowane przez właściciela produktu. Ekran S4 nie jest krokiem obowiązkowym przy każdym modelu: właściciel produktu wraca do niego przy każdej masowej zmianie cen. Właściciel produktu może otworzyć opublikowany produkt w podglądzie „Zobacz jako klient”, żeby sprawdzić wynik swojej pracy.

Każdy krok jest jednym ekranem. Zasady układu wspólne dla obu ścieżek opisuje sekcja 3.4.

W prototypie logowanie zastępuje przełącznik perspektywy w nagłówku („Klient” / „Producent · sBoM Studio”). Każda perspektywa pamięta krok, na którym ją zostawiono.

## 2. Zakres MVP

Priorytety: **Must-have** blokuje start pilotażu. **Nice-to-have** wchodzi, jeśli zmieści się w czasie, albo w kolejnym wydaniu. **Poza zakresem** jest świadomie wyłączone z MVP.

### 2.1 Must-have

| ID | Funkcja | User stories |
|---|---|---|
| | **Strona klienta** | |
| M1 | Katalog produktów wielu producentów: filtr branż, wyszukiwanie po nazwie, kodzie i producencie, wersja i data sBoM na karcie | US-01, US-02 |
| M2 | Viewer modelu serwisowego (model 3D ze STEP i model płaski z PNG): obrót wokół dowolnej osi, zoom, przesuwanie, reset, sterowanie przyciskami i klawiaturą | US-03 |
| M3 | Zaznaczanie dowolnej liczby części klikiem na modelu i na liście; inny kolor zaznaczenia i podświetlenie pod kursorem | US-04, US-05 |
| M4 | Rozstrzelenie modelu z regulacją stopnia oraz wyszarzenie niezaznaczonych części | US-06 |
| M5 | Automatyczny komplet serwisowy: elementy zależne wymagane i zalecane, w tym inne elementy modelu podświetlane na modelu | US-07, US-08 |
| M6 | Lista części z wielu produktów i wielu producentów; widok „według części” i „zbiorczo po indeksach” | US-09 |
| M7 | Ceny poglądowe z cennika producenta, oznaczone w każdym miejscu, z zastrzeżeniem o braku oferty handlowej | US-10 |
| M8 | Konto firmowe klienta: logowanie, dane firmy, NIP, adresy dostaw | US-11 |
| M9 | Zapytanie ofertowe: osobne dla każdego producenta, wysyłane e-mailem na adres BOK z załącznikami XML i PDF, kopia do klienta | US-12 |
| M10 | Historia i status zapytań klienta | US-13 |
| M11 | Instrukcje wymiany dla zaznaczonych części | US-14 |
| | **sBoM Studio (producent)** | |
| M12 | Repozytorium produktów sBoM: produkty, źródło modelu, wersje, stan (szkic, zmiany robocze, opublikowany) | US-15 |
| M13 | Import STEP (AP203, AP214, AP242) i konwersja do uproszczonego modelu GLB z hierarchią złożenia i metadanymi węzłów | US-16 |
| M14 | Import PNG / JPG: obszary części zaznaczane na obrazie i zapisywane jako płaskie siatki w GLB | US-17 |
| M15 | Automat: klasyfikacja elementów na części zamienne i propozycje kompletów, z poziomem pewności i uzasadnieniem | US-18 |
| M16 | Przegląd człowieka: zatwierdzenie, zmiana albo odrzucenie każdej propozycji; dziennik decyzji | US-19 |
| M17 | Edytor części i kompletu: nazwa, indeks, status, elementy zależne z modelu i z biblioteki indeksów, ilość, wymagane / zalecane, indeksy wpisywane ręcznie | US-20 |
| M18 | Rozstrzał modelu serwisowego: wektory wyliczane automatycznie z możliwością korekty | US-21 |
| M19 | Cennik poglądowy: cena jednej części w edytorze części, masowa aktualizacja z pliku CSV z podglądem zmian, wzorcowy plik CSV do pobrania, historia cen, trend w trzech stanach, wersjonowanie niezależne od modelu | US-22 |
| M20 | Publikacja wersji sBoM i udostępnienie aktualizacji klientom producenta | US-23 |
| | **Platforma** | |
| M21 | Wielodostępność: izolacja danych producentów, adresy BOK, reguły kierowania zapytań | US-24 |
| M22 | Aplikacja web responsywna i PWA instalowalna na Windows i macOS | US-25 |
| M23 | Język polski | — |
| M24 | Rozdzielenie perspektyw: aplikacja klienta i moduł sBoM Studio mają osobne wejścia, paski kroków i uprawnienia | US-26 |
| M25 | Praca w jednym oknie i orientacja w procesie: każdy etap to ekran mieszczący się w oknie na komputerze i telefonie, ze stałym paskiem kroków i paskiem akcji | US-27 |

### 2.2 Nice-to-have

| ID | Funkcja | Uwagi |
|---|---|---|
| N1 | Aplikacje iOS i Android (Capacitor) w sklepach | Ten sam kod co web |
| N2 | Skanowanie tabliczki znamionowej (QR / OCR numeru seryjnego) | Wymaga N1 albo dostępu do kamery w PWA |
| N3 | Wersja angielska i inne waluty | Rynki eksportowe |
| N4 | Rejestr produktów klienta („Moje produkty”) z numerami seryjnymi | Szybsze ponowne zapytania |
| N5 | Automatyczne rozpoznawanie części na obrazie PNG (segmentacja) | W MVP obszary zaznacza człowiek |
| N6 | Integracja z ERP przez standard API JSON i mapowanie pól: import indeksów i cennika do Studio, przekazanie zapytania do ERP / CRM | Opis w [zalacznik-erp-api.md](./zalacznik-erp-api.md) |
| N7 | Panel BOK: skrzynka zapytań, odpowiedź ofertą w systemie, statusy | W MVP BOK pracuje w poczcie |
| N8 | Zdjęcie uszkodzenia dołączone do zapytania | Pomaga BOK zweryfikować dobór |
| N9 | Instrukcje z ilustracjami generowanymi z modelu serwisowego | W MVP tekst i załącznik PDF |
| N10 | Udostępnienie listy części linkiem (np. serwisant → osoba akceptująca) | |
| N11 | Tryb offline katalogu i modeli | Zależy od N1 |
| N12 | Dostępność części i przewidywany termin dostawy | Dane od producenta |
| N13 | Osadzenie katalogu na stronie producenta pod jego marką | |
| N14 | Import modeli bezpośrednio z systemu PDM / PLM producenta | W MVP plik wgrywa człowiek |
| N15 | Eksport zapytania w standardach branżowych (UBL RequestForQuotation, openTRANS RFQ) | W MVP własny schemat XML |

### 2.3 Poza zakresem MVP

- Płatności online i zamówienie wiążące. Po akceptacji oferty zamówienie obsługuje BOK w swoich narzędziach.
- Przygotowanie ostatecznej oferty handlowej w systemie.
- Ceny indywidualne klienta i rabaty.
- Sprzedaż detaliczna bez NIP.
- Edycja geometrii CAD. Zmiany konstrukcyjne powstają w systemie CAD producenta.
- Zwroty i reklamacje online.
- Porównywanie producentów i zamienniki części innych marek.

## 3. Lista ekranów

Kod ekranu (`S-xx`) wiąże ekran z user stories i z [design.md](../DESIGN.md). Kolumna „Ścieżka” podaje miejsce ekranu na jednej z dwóch ścieżek z sekcji 1.4. Prototyp pokazuje ekrany S-02 do S-07 oraz S-10 do S-14 i publikację z S-15. Wszystkie ekrany obu ścieżek stoją w ramce z sekcji 3.4.

### 3.1 Ścieżka klienta

| Kod | Ścieżka | Ekran | Rola | Najważniejsze elementy | Stany do zaprojektowania |
|---|---|---|---|---|---|
| S-01 | — | Strona główna klienta (usunięta w wersji 2.4) | — | Aplikacja otwiera się na katalogu (S-02). Opis kroków zastąpił pasek kroków | — |
| S-02 | K1 | Katalog produktów | klient | Wyszukiwarka, filtry branż, karty z miniaturą, producentem, wersją i datą sBoM, znacznik nowej wersji | brak wyników, ładowanie |
| S-03 | K2 | Model serwisowy | klient | Viewer (autoobrót, izolacja, reset, odznacz; przycisk „Rozsuń części” z suwakiem; zoom; pad obrotu tylko przy myszy), pasek zaznaczenia z podpowiedzią, szuflada „Lista części” / „Zaznaczone”; na wąskim oknie zakładki „Model”, „Lista części”, „Zaznaczone”; suma szacunkowa w pasku akcji | brak WebGL, ładowanie, produkt bez opublikowanych części, nic nie zaznaczono |
| S-04 | K2 | Karta zaznaczonej części (w S-03) | klient | Nazwa, indeks, cena poglądowa, ilość, rozwijany komplet (wymagane / zalecane / element modelu), akcje | część z innego produktu, element zależny zaznaczony osobno |
| S-05 | K3 | Zapytanie ofertowe | klient | Pozycje pogrupowane po producentach (2 widoki), suma szacunkowa i zastrzeżenie cenowe zawsze widoczne; formularz: przełącznik pilności, sześć pól wymaganych, zwinięte informacje dodatkowe (nr seryjny, wycena wymiany, uwagi); na wąskim oknie zakładki „Pozycje” i „Dane do zapytania”; wysyłka w pasku akcji | pusta lista, błędy walidacji |
| S-06 | K4 | Potwierdzenie zapytania | klient | Osobny ekran kroku 4: numer zapytania, adres BOK, zakładki producentów, podgląd PDF, XML, pobranie plików, „Nowe zapytanie” | kilka zapytań, błąd wysyłki |
| S-07 | obok ścieżki | Instrukcje wymiany | klient | Ekran pomocniczy otwierany z paska kroków, z powrotem do kroku, z którego go otwarto. Akordeon dla każdej części: kroki, narzędzia, momenty, pozycje z kompletu, ostrzeżenie | brak zaznaczeń |
| S-08 | obok ścieżki | Logowanie i rejestracja firmy | gość | Logowanie, formularz firmy z NIP | konto oczekuje na potwierdzenie |
| S-09 | obok ścieżki | Moje zapytania | klient | Lista zapytań, status, pliki XML i PDF, „Zapytaj ponownie” | brak zapytań |

### 3.2 Ścieżka producenta: moduł sBoM Studio

Moduł jest dostępny dla właściciela produktu po zalogowaniu kontem producenta. Klient i gość nie widzą żadnego z tych ekranów.

| Kod | Ścieżka | Ekran | Rola | Najważniejsze elementy | Stany do zaprojektowania |
|---|---|---|---|---|---|
| S-10 | S1 | Studio: repozytorium | właściciel produktu | Tabela produktów: źródło, wersja, liczba części, liczba propozycji do przeglądu, stan; na wąskim oknie zakładki „Repozytorium” i „Nowy model” | puste repozytorium |
| S-11 | S1 | Studio: import | właściciel produktu | Wybór pliku STEP lub PNG, log kroków konwersji, wynik i przejście do przeglądu | błąd pliku, konwersja w toku |
| S-12 | S2 | Studio: przegląd modelu | właściciel produktu | Viewer z kolorami statusów, lista elementów z filtrem, edytor części i kompletu z ceną poglądową, metadane węzła, licznik propozycji i zmian roboczych; na wąskim oknie zakładki „Model” i „Elementy” | brak indeksu w zatwierdzonej części |
| S-13 | S2 | Studio: obszary na obrazie (w S-12) | właściciel produktu | Narzędzie zaznaczania prostokątnego obszaru części na rysunku, usuwanie obszaru | obszar za mały |
| S-14 | S4 | Studio: cennik poglądowy | właściciel produktu | Wersja i data cennika; „Importuj CSV” z podglądem zmian jako osobnym trybem ekranu i „Opublikuj cennik vN” w pasku akcji; „Pobierz wzór CSV”; infografika trendu (liczniki wzrost / stała / spadek i pasek udziałów) działająca jak filtr; wyszukiwarka; tabela: indeks, nazwa, cena poglądowa, trend, poprzednia cena; rozwijana historia cen z wykresem | plik bez wymaganych kolumn, nieznany indeks, błędna cena, plik bez zmian, brak wyników filtra |
| S-15 | S3 | Studio: publikacja i historia wersji | właściciel produktu | Osobny ekran kroku 3: liczniki (części zamienne, do przeglądu, wyłączone), lista zmian cen, publikacja zatwierdzana przez właściciela produktu, podgląd „Zobacz jako klient”, lista wersji, wycofanie do poprzedniej | propozycje bez decyzji, nic do publikacji, zatwierdzona część bez indeksu |

### 3.3 Administracja

| Kod | Ekran | Rola | Najważniejsze elementy | Stany do zaprojektowania |
|---|---|---|---|---|
| S-16 | Ustawienia producenta | administrator producenta | Użytkownicy i role (w tym właściciele produktów), adresy e-mail BOK, reguły kierowania zapytań, widoczność katalogu | adres BOK niezweryfikowany |

### 3.4 Ramka aplikacji i zasady układu

Zasady obowiązują na wszystkich ekranach obu ścieżek. Szczegóły wyglądu opisuje [design.md](../DESIGN.md), sekcje 5 i 6.1.

**Cztery stałe strefy okna:**

| Strefa | Co pokazuje | Na jakie pytanie odpowiada |
|---|---|---|
| Nagłówek | Marka, perspektywa (Klient albo Producent · sBoM Studio), u klienta licznik zapytania | W czyjej roli pracuję? |
| Pasek kroków | Cztery kroki ścieżki z numerem, nazwą i stanem: zrobiony, bieżący, przed tobą, niedostępny; krótki stan na żywo pod nazwą | Na którym etapie jestem i co już zrobiłem? |
| Scena | Jeden ekran etapu | Co robię teraz? |
| Pasek akcji | Powrót do poprzedniego kroku, stan pracy, jedna główna akcja ekranu | Co mam na liczniku i co dalej? |

**Reguły:**

1. Strona nie przewija się w pionie ani w poziomie. Lista dłuższa niż okno przewija się we własnej ramce, a trzy stałe strefy zostają na miejscu.
2. Okna odniesienia: komputer 1366 × 650 px (laptop z paskami przeglądarki) i telefon 390 × 844 px. Najmniejsze obsługiwane okno telefonu: 360 × 640 px.
3. Na oknie węższym niż 1021 px ekran z dwoma panelami pokazuje jeden panel naraz. Panele przełączają zakładki z nazwami; aplikacja sama otwiera zakładkę, której wymaga akcja (np. formularz przy błędzie walidacji).
4. Główna akcja ekranu jest zawsze w tym samym miejscu: w pasku akcji, po prawej. Niedostępna akcja jest wyszarzona i podaje powód.
5. Krok jest oznaczony jako zrobiony tylko wtedy, gdy zrobione są wszystkie kroki przed nim.
6. Treści pomocnicze (opis formatu, zasady importu, pola opcjonalne) są zwinięte i nie zabierają miejsca, dopóki użytkownik ich nie otworzy.
7. Okno niższe niż 521 px (telefon trzymany poziomo) jest wyjątkiem: ekran się przewija, a nagłówek i pasek akcji są przyklejone do krawędzi okna.

**Co musi być widoczne bez przewijania w oknach odniesienia:**

| Ekran | Widoczne bez przewijania | Może się przewijać w ramce |
|---|---|---|
| K1 Katalog (S-02) | Wyszukiwarka, filtry, co najmniej 5 produktów | Kolejne produkty |
| K2 Model (S-03, S-04) | Cały model z narzędziami, pasek zaznaczonej części | Lista części, pozycje kompletu |
| K3 Zapytanie (S-05) | Suma szacunkowa, zastrzeżenie cenowe, przełącznik pilności, sześć pól wymaganych | Pozycje zapytania, informacje dodatkowe po rozwinięciu |
| K4 Potwierdzenie (S-06) | Numer zapytania, adres BOK, przyciski pobierania | Podgląd PDF i XML |
| S1 Repozytorium (S-10, S-11) | Nagłówek tabeli, przyciski importu | Wiersze repozytorium |
| S2 Przegląd (S-12, S-13) | Cały model, filtr elementów, licznik propozycji i zmian | Lista elementów z edytorem |
| S3 Publikacja (S-15) | Liczniki, blokada publikacji, główna akcja | Lista zmian cen |
| S4 Cennik (S-14) | Wersja cennika, infografika trendu, filtr | Wiersze cennika, podgląd importu |

## 4. User stories z kryteriami akceptacji

Format: *Jako [rola] chcę [cel], aby [korzyść].* Kryteria w formacie Mając–Gdy–Wtedy.

### US-01 Wyszukanie produktu — M1 · S-02

Jako klient chcę wpisać nazwę, kod z tabliczki znamionowej albo producenta, aby od razu otworzyć właściwy produkt.

- **Mając** katalog z produktem `HT-50-160`, **gdy** wpiszę „ht-50” lub nazwę producenta, **wtedy** karta produktu pojawi się w wynikach w czasie poniżej 300 ms od ostatniego znaku.
- **Gdy** nic nie pasuje, **wtedy** widzę komunikat z podpowiedzią, gdzie szukać kodu.
- Wyszukiwanie ignoruje wielkość liter i polskie znaki diakrytyczne.

### US-02 Katalog wielu producentów — M1 · S-02

Jako klient chcę zawęzić katalog do branży albo producenta, aby szybciej znaleźć produkt.

- Filtr branży i fraza wyszukiwania działają łącznie.
- Karta pokazuje producenta, branżę, kod, wersję sBoM i datę publikacji.
- Karta produktu, w którym mam zaznaczone części, pokazuje ich liczbę.
- Widzę tylko produkty producentów, którzy udostępnili mi katalog (albo katalogi publiczne).

### US-03 Obracanie i przybliżanie modelu — M2 · S-03

Jako klient chcę obracać model w dowolnym kierunku i przybliżać go, aby precyzyjnie wskazać uszkodzony element.

- Przeciągnięcie myszą lub palcem obraca model wokół celu, także od spodu (kąt biegunowy 0–180°).
- Kółko myszy, szczypanie i przyciski +/− zmieniają odległość; zakres zależy od wielkości modelu. Przesuwanie działa prawym przyciskiem i dwoma palcami.
- Przyciski pada obracają o 22,5°, „widok z góry” ustawia kamerę pionowo, „Resetuj widok” kadruje cały model z animacją ≤ 0,6 s. Pad jest widoczny przy obsłudze myszą; na ekranach dotykowych i węższych niż 760 px jest ukryty, bo model obraca się palcem.
- Klawiatura (fokus na viewerze): strzałki obracają, `+`/`-` przybliżają, `R` resetuje, `E` przełącza rozstrzał.
- Model do 150 tys. trójkątów renderuje się z co najmniej 30 kl./s na telefonie średniej klasy i laptopie z grafiką zintegrowaną.

### US-04 Zaznaczenie części na modelu — M3 · S-03

Jako klient chcę kliknąć element modelu, aby dodać go do zapytania.

- **Mając** otwartą aplikację, **wtedy** zapytanie jest puste (licznik 0), a na dole viewera widać podpowiedź „Kliknij lub dotknij części, aby dodać ją do zapytania”. Podpowiedź znika po pierwszym zaznaczeniu na danym modelu i wraca, gdy nic nie jest na nim zaznaczone.
- **Gdy** kliknę element myszą (przesunięcie < 6 px) albo dotknę go palcem (przesunięcie < 14 px, bez limitu czasu), **wtedy** element zmienia kolor na kolor zaznaczenia i pojawia się na liście „Zaznaczone”.
- **Wtedy** w miejscu podpowiedzi zostaje pasek ostatnio zaznaczonej części: nazwa, indeks, cena poglądowa, „+ N poz. kompletu” oraz przyciski „Cofnij” i „Komplet”. Pasek nie znika sam.
- „Komplet” rozwija w pasku listę elementów zależnych z ilościami, sumę poglądową części z kompletem i przycisk „Do zapytania”. „Cofnij” odznacza tę część.
- Na telefonie pasek z rozwiniętym kompletem mieści się w viewerze, bez przewijania strony.
- Na dotyku część wskazuje punkt pierwszego dotknięcia, a nie punkt puszczenia: drobny ruch palca nie przenosi zaznaczenia na sąsiednią część.
- Ponowne kliknięcie odznacza element i usuwa go z listy razem z kompletem.
- Najechanie kursorem podświetla element i pokazuje dymek: nazwa, indeks, cena poglądowa, liczba pozycji kompletu.
- Dwuklik przybliża kamerę do elementu.
- Liczba zaznaczonych elementów nie jest ograniczona.
- Elementy, które nie są opublikowanymi częściami zamiennymi, nie reagują na kursor i kliknięcie.

### US-05 Zaznaczenie części z listy — M3 · S-03

Jako klient chcę wybrać część z listy, gdy jest zasłonięta na modelu.

- Lista jest pogrupowana i pokazuje indeks, cenę poglądową i liczbę pozycji kompletu.
- Najechanie lub fokus na pozycji listy podświetla element na modelu.
- Stan zaznaczenia jest zsynchronizowany między listą, modelem i zapytaniem.
- **Gdy** wybiorę z listy część, której nie widać na modelu, **wtedy** aplikacja ją odsłania: jeśli część jest tylko zasłonięta, kamera obraca się na kierunek, z którego ją widać (komunikat „Część była zasłonięta. Widok został obrócony.”); jeśli jest wewnątrz, model sam się rozsuwa, a kamera przybliża część (komunikat „Ta część jest wewnątrz. Model został rozsunięty.”).
- **Gdy** część jest widoczna z bieżącego kierunku, **wtedy** kamera tylko ją przybliża, bez rozsuwania modelu.
- Na telefonie komunikat ma akcję „Pokaż model”, która otwiera zakładkę „Model”.
- Lista jest w pełni obsługiwana klawiaturą i czytnikiem ekranu (`aria-pressed`).

### US-06 Rozstrzał i izolacja — M4 · S-03

Jako klient chcę rozsunąć części modelu, aby wskazać element ukryty wewnątrz.

- Przycisk z widocznym napisem „Rozsuń części” (lewy dolny róg viewera, skrót `E`) rozsuwa części według wektorów zapisanych w modelu, z animacją. Po włączeniu napis zmienia się na „Złóż model”, a obok pojawia się suwak.
- Suwak reguluje stopień rozstrzelenia od 20% do 160%, a kamera po zmianie kadruje cały model.
- Części wewnętrzne (np. wirnik w korpusie pompy, łożysko pod tarczą karuzeli) po rozstrzeleniu są widoczne i klikalne. Wektory rozstrzelenia dobiera się tak, żeby żadna część zamienna nie została zasłonięta z każdego kierunku.
- Model płaski z PNG też się rozsuwa: obszary części odsuwają się od środka rysunku.
- „Wyszarz niezaznaczone” robi pozostałe elementy półprzezroczystymi i niewybieralnymi.

### US-07 Automatyczny komplet serwisowy — M5 · S-04, S-05

Jako klient chcę, aby do wybranej części automatycznie dobrały się elementy zależne, aby niczego nie zabrakło przy wymianie.

- **Mając** wirnik pompy z kompletem: uszczelnienie mechaniczne (element modelu, wymagane), nakrętka wirnika, wpust i o-ring (wymagane), **gdy** zaznaczę wirnik, **wtedy** wszystkie cztery pozycje trafiają do zapytania, a uszczelnienie podświetla się na modelu kolorem kompletu.
- Pozycje wymagane mają zablokowane pole wyboru i etykietę „wymagane”.
- Pozycje zalecane mogę odznaczyć; odznaczona pozycja znika z zapytania.
- **Gdy** element zależny zaznaczę też osobno, **wtedy** nie jest liczony podwójnie, a w komplecie ma etykietę „zaznaczona osobno”.
- Zapytanie zapisuje wersję sBoM użytą przy wysyłce.

### US-08 Ilość części — M5 · S-04

Jako klient chcę zmienić liczbę sztuk części, aby zapytać np. o dwa koła naraz.

- Zmiana ilości (1–99) przelicza ilości pozycji kompletu (ilość na część × liczba części) i sumę.
- Nie da się ustawić ilości 0; do usunięcia służy „Usuń”.

### US-09 Części z wielu produktów i producentów — M6 · S-05

Jako klient chcę na jednej liście zebrać części do kilku produktów, także różnych producentów.

- Zaznaczenia z różnych produktów trafiają na jedną listę i nie znikają po zmianie produktu.
- Widok „Według części” grupuje pozycje po producencie i produkcie, a pod każdą częścią pokazuje jej komplet.
- Widok „Zbiorczo po indeksach” sumuje ilości tego samego indeksu w ramach producenta.
- Lista jest zachowana po przeładowaniu strony i po zalogowaniu.

### US-10 Ceny poglądowe — M7 · S-03, S-05, S-06

Jako klient chcę znać orientacyjny koszt, zanim wyślę zapytanie, i rozumieć, że to nie jest oferta.

- Każda cena ma oznaczenie „ok.” albo „poglądowa”, a sumy noszą nazwę „szacunkowo netto”.
- Przy modelu widzę wersję sBoM i datę cennika, np. „sBoM v4 · ceny poglądowe z 12.11.2026”.
- Sekcja zapytania, plik PDF i plik XML zawierają zastrzeżenie: ceny są poglądowe, nie stanowią oferty handlowej i wymagają potwierdzenia przez BOK.
- Aplikacja nie pokazuje VAT, kosztów dostawy ani terminu płatności. Te dane zawiera oferta BOK.
- **Gdy** producent opublikuje nowy cennik, **wtedy** ceny na mojej liście aktualizują się, a ja widzę informację o nowej wersji.

### US-11 Konto firmowe klienta — M8 · S-08

Jako klient chcę założyć konto firmy, aby nie wpisywać danych przy każdym zapytaniu i widzieć historię.

- Rejestracja wymaga NIP; system sprawdza format NIP i podpowiada dane firmy.
- Administrator konta firmy może zaprosić kolejnych użytkowników e-mailem.
- Gość może wysłać zapytanie bez konta, podając dane firmy w formularzu.

### US-12 Wysłanie zapytania ofertowego — M9 · S-05, S-06

Jako klient chcę wysłać zapytanie ofertowe do producenta, aby dostać wiążącą ofertę na komplet części.

- **Mając** listę z częściami dwóch producentów, **gdy** wyślę zapytanie, **wtedy** powstają dwa zapytania z osobnymi numerami, po jednym dla każdego producenta.
- Każde zapytanie trafia e-mailem na adres BOK ustawiony przez producenta, z załącznikami XML i PDF o tej samej treści. Kopię dostaję na swój adres.
- XML jest zgodny ze schematem z sekcji 7.3 i przechodzi walidację XSD przed wysyłką.
- PDF zawiera dane zamawiającego, adresata, pozycje z indeksami, ilościami i cenami poglądowymi, sumę szacunkową i zastrzeżenie cenowe.
- Pozycje kompletu wskazują w XML pozycję części, do której należą (`parentLine`).
- **Gdy** serwer pocztowy odrzuci wiadomość, **wtedy** system ponawia wysyłkę, a po 3 nieudanych próbach administrator producenta i operator platformy dostają alert; klient widzi status „w trakcie przekazywania”.
- Formularz ma sześć pól wymaganych (firma, osoba kontaktowa, NIP, telefon, e-mail, adres dostawy) i przełącznik pilności „Standard” / „Pilne (produkt wyłączony)”. Numer seryjny, prośba o wycenę wymiany przez serwis i uwagi są w zwiniętym bloku „Dodatkowe informacje (opcjonalnie)”.
- „Wyślij zapytanie ofertowe” jest główną akcją w pasku akcji. **Gdy** brakuje pola wymaganego, **wtedy** zostaję na kroku 3, widzę nad polami, które pola uzupełnić, a na wąskim oknie otwiera się zakładka „Dane do zapytania”.
- Po wysłaniu przechodzę na ekran kroku 4 „Potwierdzenie”: widzę numer zapytania, adres BOK oraz podgląd PDF i XML, i mogę pobrać oba pliki.
- **Gdy** po wysłaniu zmienię zaznaczenie części, **wtedy** potwierdzenie przestaje być aktualne: krok 4 wraca do stanu „po wysłaniu”, a zapytanie trzeba wysłać ponownie.

### US-13 Historia i status zapytań — M10 · S-09

Jako klient chcę widzieć swoje zapytania, aby wiedzieć, na które czekam na ofertę.

- Lista pokazuje numer, datę, producenta, liczbę pozycji, sumę szacunkową i status: wysłane, doręczone do BOK, błąd doręczenia.
- Z każdej pozycji mogę pobrać XML i PDF.
- „Zapytaj ponownie” odtwarza listę części z aktualną wersją sBoM i cennika.

### US-14 Instrukcja wymiany — M11 · S-07

Jako serwisant chcę mieć instrukcję wymiany każdej wybranej części, aby wykonać naprawę poprawnie.

- Dla każdej zaznaczonej części widzę: tytuł, czas, liczbę osób, kroki w kolejności, narzędzia, momenty dokręcenia, pozycje z kompletu, ostrzeżenie.
- „Instrukcja wymiany” na karcie części otwiera ekran instrukcji z rozwiniętą instrukcją tej części. „Wróć” w pasku akcji wraca do kroku, z którego otwarto instrukcje.
- Instrukcję przypisuje producent w sBoM Studio do części albo do kompletu.

### US-15 Repozytorium produktów sBoM — M12 · S-10

Jako właściciel produktu chcę widzieć wszystkie modele serwisowe mojej firmy, aby wiedzieć, co jest opublikowane, a co czeka na przegląd.

- Tabela pokazuje produkt, kod, źródło modelu (STEP albo PNG i nazwa pliku), opublikowaną wersję z datą, liczbę części zamiennych i liczbę propozycji do przeglądu.
- Stan produktu to: szkic (nigdy nie publikowany), zmiany robocze (są niepublikowane zmiany), opublikowany.
- „Otwórz” przenosi do przeglądu modelu (S-12).
- Widzę wszystkie produkty mojego producenta i żadnych produktów innych producentów.

### US-16 Import STEP — M13 · S-11

Jako właściciel produktu chcę wgrać plik STEP produktu, aby powstał z niego lekki model serwisowy.

- System przyjmuje pliki `.step` / `.stp` w protokołach AP203, AP214 i AP242 do 500 MB.
- Konwersja zachowuje hierarchię złożenia i nazwy komponentów; każdy komponent staje się węzłem modelu.
- Model jest upraszczany: mniejsza gęstość siatki, usunięte drobne detale i elementy niewidoczne, powtarzalne elementy zapisane jako instancje. Wynik ma poniżej 5 MB i 150 tys. trójkątów (limity konfigurowalne).
- Wynik to paczka `model.glb` + `sbom.json` opisana w sekcji 6.
- Log pokazuje kroki konwersji, liczbę komponentów i trójkątów oraz ostrzeżenia. **Gdy** pliku nie da się odczytać, **wtedy** widzę przyczynę, a repozytorium się nie zmienia.
- Plik STEP zostaje w prywatnym magazynie producenta i nie jest udostępniany klientom.

### US-17 Import PNG i obszary części — M14 · S-11, S-13

Jako właściciel produktu chcę zbudować model serwisowy z rysunku złożeniowego albo zdjęcia, gdy nie mam modelu 3D.

- System przyjmuje PNG i JPG; obrazy większe niż 4096 px są zmniejszane.
- Obszar części zaznaczam przeciągnięciem prostokąta na obrazie; obszar mniejszy niż 3% boku obrazu jest odrzucany z komunikatem.
- Każdy obszar staje się elementem modelu z własną nazwą, indeksem, ceną i kompletem, tak jak komponent ze STEP.
- Model z PNG jest zapisywany w tym samym formacie GLB: każdy obszar to płaska siatka z wycinkiem tekstury.
- Obszar mogę usunąć; powiązania w kompletach innych elementów usuwają się razem z nim.

### US-18 Propozycje automatu — M15 · S-12

Jako właściciel produktu chcę dostać wstępną klasyfikację elementów, aby nie zaczynać od pustej listy.

- Po konwersji każdy element ma status: propozycja części zamiennej albo propozycja wyłączenia, z poziomem pewności (0–100%) i jednym zdaniem uzasadnienia.
- Automat korzysta z nazw i norm w nazwach komponentów, typu elementu (łożysko, uszczelnienie, element złączny, koło), relacji w złożeniu oraz historii sprzedaży części, jeśli producent ją udostępni.
- Dla proponowanej części automat proponuje komplet: elementy stykające się z częścią i elementy jednorazowe z biblioteki indeksów.
- Propozycja nigdy nie jest widoczna dla klienta, dopóki nie zatwierdzi jej człowiek.

### US-19 Przegląd i zatwierdzanie przez człowieka — M16 · S-12

Jako właściciel produktu chcę zatwierdzić, zmienić albo odrzucić każdą propozycję, aby do klientów trafiały tylko sprawdzone części.

- Viewer koloruje elementy statusem: część zamienna, do przeglądu, wyłączona. Kliknięcie elementu otwiera jego edytor.
- **Gdy** zatwierdzam część bez indeksu, **wtedy** system prosi o indeks i nie zmienia statusu.
- Zatwierdzoną część mogę później wyłączyć, a wyłączoną włączyć.
- Filtr listy pokazuje wszystkie elementy, do przeglądu, części zamienne albo wyłączone, z licznikami.
- Każda decyzja trafia do dziennika: kto, kiedy, element, poprzedni i nowy status.

### US-20 Edytor części i kompletu — M17 · S-12

Jako właściciel produktu chcę ustawić dane części i jej elementy zależne, aby klient po wskazaniu jednego elementu dostał cały komplet.

- Dla części ustawiam nazwę, indeks serwisowy i cenę poglądową.
- Do kompletu dodaję inny element tego samego modelu albo pozycję z biblioteki indeksów serwisowych.
- Dodatkowy indeks mogę wpisać ręcznie (indeks, nazwa, cena poglądowa); trafia do biblioteki producenta.
- Każda pozycja kompletu ma ilość na jedną część (1–99) i oznaczenie „wymagane” albo „zalecane”.
- Element nie może być zależny od samego siebie; komplet nie rozwija się rekurencyjnie (elementy zależne elementu zależnego nie są dodawane automatycznie).
- Widzę metadane, które trafią do węzła GLB.

### US-21 Rozstrzał modelu serwisowego — M18 · S-12

Jako właściciel produktu chcę, aby model dało się rozsunąć, żeby klient mógł wskazać części wewnętrzne.

- Po konwersji każdy element dostaje wektor rozstrzelenia wyliczony od środka złożenia.
- Wektor mogę poprawić ręcznie (kierunek i odległość), np. dla części współosiowych rozsuwanych wzdłuż osi.
- Podgląd rozstrzału w Studio działa tak samo jak u klienta.
- Wektory są zapisane w metadanych węzłów i jako animacja `explode` w pliku GLB.

### US-22 Cennik poglądowy — M19 · S-12, S-14

Jako właściciel produktu chcę utrzymywać ceny poglądowe części pojedynczo i masowo, aby klient znał orientacyjny koszt, a ja widziałem, jak ceny się zmieniają.

- Każda część zamienna i każda pozycja biblioteki indeksów ma cenę poglądową netto i walutę.
- Cenę jednej części ustawiam w edytorze części (S-12). Trafia do klientów razem z publikacją sBoM.
- Ekran cennika (S-14) służy do masowej aktualizacji cen. Cennik ma własną wersję i datę obowiązywania, niezależne od wersji modelu.
- **Wzór CSV.** „Pobierz wzór CSV” zapisuje plik ze wszystkimi indeksami i aktualnymi cenami w kolumnach `indeks;nazwa;cena_netto;waluta`. Plik ma kodowanie UTF-8 ze znacznikiem BOM, średnik jako separator i przecinek dziesiętny, żeby otwierał się poprawnie w arkuszu kalkulacyjnym.
- **Import CSV.** System dopasowuje wiersze po indeksie, bez rozróżniania wielkości liter. Wymaga kolumn `indeks` i `cena_netto`, a pozostałe pomija. Przyjmuje separator średnik, tabulator albo przecinek oraz cenę z przecinkiem albo kropką.
- **Gdy** wczytam plik, **wtedy** widzę podgląd przed zapisaniem: liczbę cen ze wzrostem, bez zmian i ze spadkiem, listę zmian (było, będzie, zmiana w procentach) oraz wiersze do sprawdzenia z numerem wiersza i powodem: nieznany indeks, błędna cena, indeks powtórzony w pliku.
- Podgląd importu jest osobnym trybem ekranu cennika: zastępuje tabelę, a pasek akcji ma wtedy „Anuluj import” i „Opublikuj cennik vN”.
- Nic nie jest zapisane, dopóki nie kliknę „Opublikuj cennik vN”. **Gdy** plik nie ma wymaganych kolumn albo nie zmienia żadnej ceny, **wtedy** publikacja jest niedostępna, a ja widzę powód.
- **Gdy** opublikuję cennik, **wtedy** powstaje nowa wersja cennika z datą obowiązywania, a klienci widzą nowe ceny bez ponownej publikacji modeli.
- **Historia cen.** Każda opublikowana zmiana ceny trafia do historii indeksu: wersja cennika, data, cena i źródło (import CSV z nazwą pliku, edytor części z wersją sBoM, indeks dodany ręcznie). Historii nie da się edytować. Dla każdego indeksu mogę ją rozwinąć razem z wykresem.
- **Trend ceny** ma trzy stany: wzrost, stała, spadek. Porównuje cenę indeksu w bieżącej wersji cennika z ceną w poprzedniej wersji. Indeks dodany w bieżącej wersji ma oznaczenie „nowy indeks”.
- Trend pokazuje znacznik przy każdym indeksie (ikona, słowo i zmiana w procentach) oraz infografika nad tabelą: trzy liczniki i pasek udziałów. Kliknięcie licznika filtruje tabelę do jednego stanu.
- W cenniku są indeksy opublikowanych części i biblioteki indeksów. Cena części z wersji roboczej trafia do cennika po publikacji sBoM.
- Część zamienna bez ceny blokuje publikację albo jest publikowana z oznaczeniem „cena na zapytanie” (ustawienie producenta).

### US-23 Publikacja i udostępnianie aktualizacji — M20 · S-15

Jako producent chcę jednym krokiem udostępnić klientom nową wersję sBoM z cenami, aby wszyscy pracowali na aktualnych danych.

- Publikacja jest osobnym ekranem (krok 3). Przed decyzją widzę liczbę części, które trafią do klientów, liczbę propozycji bez decyzji i części wyłączonych oraz listę zmian cen w tej publikacji.
- **Gdy** zatwierdzona część nie ma indeksu, **wtedy** publikacja jest zablokowana, a ekran wymienia te części i prowadzi z powrotem do przeglądu.
- Publikacja tworzy nową, niezmienną wersję (model, sBoM, cennik) z numerem i datą.
- Do wersji trafiają tylko elementy zatwierdzone. Propozycje bez decyzji zostają w wersji roboczej.
- **Gdy** opublikuję wersję, **wtedy** klienci widzą ją w katalogu przy następnym otwarciu lub odświeżeniu, bez instalowania czegokolwiek, a karta produktu ma znacznik „nowa wersja sBoM”.
- Części usunięte w nowej wersji znikają z list klientów; klient dostaje o tym informację.
- Zmiana samego cennika nie wymaga ponownego pobrania modelu.
- Poprzednią wersję mogę przywrócić; wysłane zapytania zachowują numer wersji, z której powstały.
- Publikację sBoM i cennika zatwierdza właściciel produktu samodzielnie. Akceptacja drugiej osoby nie jest wymagana. Dziennik zapisuje, kto i kiedy opublikował wersję.

### US-24 Konto producenta i kierowanie zapytań — M21 · S-16

Jako administrator producenta chcę ustawić, dokąd trafiają zapytania, aby obsługiwał je właściwy zespół BOK.

- Ustawiam główny adres e-mail BOK i potwierdzam go linkiem weryfikacyjnym.
- Mogę dodać reguły: inny adres dla linii produktów, kraju dostawy albo zapytań pilnych.
- Dane, modele i cenniki producenta są niewidoczne dla innych producentów.
- Decyduję, czy katalog jest publiczny, czy tylko dla zaproszonych klientów.

### US-25 Dostępność na komputerach i telefonach — M22 · wszystkie

Jako użytkownik chcę korzystać z PartPark na Windows, macOS i telefonie, aby pracować w biurze i przy produkcie.

- Aplikacja działa w aktualnych wersjach Chrome, Edge, Safari i Firefox oraz na iOS 16+ i Android 11+ w przeglądarce.
- Układ działa od 360 px szerokości bez przewijania w poziomie. Zasady pracy w jednym oknie opisuje US-27.
- PWA można zainstalować z Edge i Chrome na Windows i macOS.
- Lighthouse: Performance ≥ 80 (mobile, strona katalogu), Accessibility ≥ 95.

### US-26 Osobne wejście do sBoM Studio — M24 · S-08, S-10

Jako właściciel produktu chcę wejść do sBoM Studio osobnym wejściem, aby pracować nad sBoM i cennikiem bez ekranów klienta, a klient nie widział mojej wersji roboczej.

- Klient i gość nie widzą żadnego ekranu, linku ani danych roboczych sBoM Studio.
- sBoM Studio otwiera się pod osobnym adresem po zalogowaniu kontem producenta z rolą właściciela produktu.
- Każda perspektywa ma własny pasek kroków: klient „Produkt, Części, Zapytanie, Potwierdzenie” (obok „Instrukcje”), Studio „Repozytorium, Przegląd, Publikacja, Cennik”. W Studio nie ma licznika zapytania.
- Właściciel produktu jest przypisany do wszystkich produktów producenta i widzi całe jego repozytorium. Uprawnień do pojedynczych produktów w MVP nie ma.
- **Gdy** opublikuję wersję, **wtedy** mogę otworzyć ten produkt w podglądzie „Zobacz jako klient” i wrócić do Studio jednym krokiem.
- Zmiana perspektywy nie kasuje listy części klienta ani wersji roboczej w Studio. Każda perspektywa wraca na krok, na którym ją zostawiono.
- W prototypie logowanie zastępuje przełącznik perspektywy w nagłówku.

### US-27 Praca w jednym oknie i orientacja w procesie — M25 · ekrany obu ścieżek

Jako klient albo właściciel produktu chcę w każdej chwili widzieć, na którym etapie jestem, co już zrobiłem i jaki jest następny krok, bez przewijania strony, aby nie gubić się w procesie na telefonie przy produkcie i na komputerze w biurze.

- Każdy etap ścieżki (K1–K4, S1–S4) jest osobnym ekranem. Strona nie przewija się w pionie ani w poziomie w oknach od 360 × 640 px (telefon) i od 1366 × 650 px (komputer).
- Listy dłuższe niż okno (katalog, lista części, pozycje zapytania, repozytorium, cennik) przewijają się we własnej ramce. Nagłówek, pasek kroków i pasek akcji zostają na miejscu.
- Pasek kroków jest widoczny na każdym ekranie. Pokazuje numer i nazwę bieżącego kroku („Krok 2 z 4 · Części”), stan każdego kroku (zrobiony, bieżący, przed tobą, niedostępny) i krótki stan na żywo, np. „zaznaczone: 1 · indeksy: 5”.
- Krok jest oznaczony jako zrobiony tylko wtedy, gdy zrobione są wszystkie kroki przed nim.
- Kroki są klikalne: mogę wrócić do wcześniejszego kroku i przejść dalej. Krok „Potwierdzenie” otwiera się dopiero po wysłaniu zapytania.
- Pasek akcji jest widoczny na każdym ekranie. Zawiera powrót do poprzedniego kroku, stan pracy (u klienta liczbę zaznaczonych części, indeksów i kwotę szacunkową; w Studio liczbę propozycji do przeglądu i zmian roboczych) oraz jedną główną akcję ekranu.
- **Gdy** główna akcja jest niedostępna, **wtedy** jest wyszarzona i podaje powód, np. „Najpierw zaznacz co najmniej jedną część”.
- **Gdy** okno jest węższe niż 1021 px, **wtedy** ekran z dwoma panelami pokazuje jeden panel naraz, a panele przełączają zakładki z nazwami, np. „Model”, „Lista części”, „Zaznaczone 1”.
- W oknach odniesienia (1366 × 650 px i 390 × 844 px) bez przewijania widać to, co wymienia tabela w sekcji 3.4.
- Nagłówek zawsze pokazuje, w której perspektywie pracuję.
- **Gdy** okno jest niższe niż 521 px (telefon trzymany poziomo), **wtedy** ekran może się przewijać, a nagłówek i pasek akcji pozostają przyklejone do krawędzi okna.
- Stan kroku nie zależy od samego koloru: zrobiony krok ma znak „ptaszka”, bieżący ma wypełniony numer i jest nazwany w wierszu stanu.
- Zmiana kroku przenosi fokus klawiatury na nowy ekran, a bieżący krok jest oznaczony dla czytnika ekranu (`aria-current="step"`).

## 5. Wymagania niefunkcjonalne

| Obszar | Wymaganie |
|---|---|
| Wydajność | Pierwsze wyświetlenie katalogu (LCP) < 2,5 s na 4G; model GLB < 5 MB, gotowy do obrotu < 3 s na 4G |
| Konwersja | STEP do 500 MB przetwarzany asynchronicznie; wynik dla złożenia do 200 komponentów w czasie < 10 min |
| Dostępność | WCAG 2.1 AA; pełna obsługa klawiaturą list i formularzy; lista części jako alternatywa dla modelu |
| Bezpieczeństwo | OIDC, MFA dla pracowników producenta, sekrety w magazynie kluczy, OWASP ASVS poziom 2 |
| Izolacja danych | Każdy rekord i plik ma identyfikator producenta; dostęp sprawdzany po stronie serwera |
| Ochrona własności intelektualnej | Klient dostaje tylko uproszczony GLB; pliki STEP i pełna struktura produktu zostają u producenta |
| RODO | Dane w UE; zapytania zawierają dane kontaktowe klienta, więc producent jest ich odbiorcą; okres przechowywania ustala producent |
| Dostarczanie e-maili | SPF, DKIM i DMARC dla domeny wysyłkowej; ponowienia; log doręczeń przechowywany 90 dni |
| Dostępność usługi | 99,5% miesięcznie dla katalogu i wysyłki zapytań |
| Przeglądarki | 2 ostatnie wersje Chrome, Edge, Safari, Firefox |
| Ergonomia | Ekran etapu mieści się w oknie 1366 × 650 px i 390 × 844 px bez przewijania strony; stałe strefy (nagłówek, pasek kroków, pasek akcji) zajmują nie więcej niż ok. jednej trzeciej wysokości okna; cele dotykowe ≥ 36 × 36 px, główna akcja ≥ 44 px wysokości |

## 6. Model serwisowy i formaty danych

### 6.1 Wybór formatu

Model serwisowy jest zapisywany jako **GLB (binarny glTF 2.0)**, a dane handlowe osobno w JSON. Ten sam format obsługuje model 3D ze STEP i model płaski z PNG, więc viewer, metadane i rozstrzał działają jednakowo.

| Format | Ocena | Powód |
|---|---|---|
| **GLB / glTF 2.0** | wybrany | Otwarty standard Khronos, jeden plik, szybkie ładowanie w przeglądarce i na telefonie, hierarchia węzłów, pole `extras` na metadane, animacje, kompresja siatki i tekstur |
| glTF (JSON + osobne pliki) | format roboczy | Ta sama zawartość co GLB; wygodny do porównywania wersji, gorszy do dystrybucji (wiele plików) |
| STEP AP242 | tylko źródło | Dokładna geometria i własność intelektualna producenta; za ciężki dla przeglądarki |
| USDZ | odrzucony | Dobry w ekosystemie Apple, słabe wsparcie w przeglądarkach |
| 3D PDF (PRC / U3D), JT | odrzucone | Wymagają wtyczek albo płatnych bibliotek, brak natywnego wyświetlania w przeglądarce |
| SVG z obszarami (dla PNG) | odrzucony | Wymagałby drugiego viewera i drugiego schematu metadanych |

Informacje o formatach i rozszerzeniach pochodzą z wiedzy ogólnej. Etap 0 potwierdza je na plikach pilotażowych.

### 6.2 Paczka wersji

Każda opublikowana wersja to niezmienna paczka plików:

| Plik | Zawartość | Kiedy się zmienia |
|---|---|---|
| `manifest.json` | Identyfikator producenta i produktu, numer wersji, daty, sumy kontrolne plików, wersje schematów | Przy każdej publikacji |
| `model.glb` | Geometria, materiały, hierarchia złożenia, metadane węzłów w `extras`, animacja `explode` | Gdy zmienia się geometria lub lista elementów |
| `sbom.json` | Części zamienne, komplety, statusy przeglądu, powiązania z instrukcjami | Gdy zmienia się sBoM |
| `pricelist.json` | Ceny poglądowe indeksów, waluta, data obowiązywania | Gdy zmieniają się ceny |
| `thumbnail.webp` | Miniatura do katalogu | Razem z modelem |
| `docs/…` | Instrukcje wymiany (Markdown, PDF, obrazy) | Gdy zmieniają się instrukcje |

Geometria, sBoM i ceny są rozdzielone, bo zmieniają się w różnym tempie. Zmiana cennika nie wymusza ponownego pobrania modelu.

### 6.3 Metadane węzła w GLB

Każdy węzeł, który odpowiada elementowi produktu, ma w `extras` obiekt `partpark`:

```json
{
  "partpark": {
    "schema": "sbom-node/1.0",
    "nodeId": "imp",
    "itemCode": "HT-50-02",
    "name": "Wirnik Ø160, brąz",
    "serviceable": true,
    "reviewStatus": "approved",
    "explode": [0.62, 0, 0],
    "source": { "kind": "step", "path": "HT-50-160/Hydraulika/Wirnik-1" }
  }
}
```

- `nodeId` jest stały między wersjami; na nim opierają się sBoM, zaznaczenia klienta i zapytania.
- `explode` to przesunięcie węzła w metrach przy rozstrzeleniu 100%.
- Dla modelu z PNG dochodzi `imageRegion: [u0, v0, u1, v1]` (współrzędne obszaru na obrazie, 0–1).
- Metadane całego pliku (producent, produkt, wersja, prawa) trafiają do rozszerzenia `KHR_xmp_json_ld`.
- Geometria korzysta z `EXT_meshopt_compression` albo `KHR_draco_mesh_compression`, tekstury z `KHR_texture_basisu`, a powtarzalne elementy z `EXT_mesh_gpu_instancing`.
- Ceny i komplety nie są zapisywane w GLB.

### 6.4 sbom.json (fragment)

```json
{
  "schema": "sbom/1.0",
  "producerId": "producent-d",
  "product": { "code": "HT-50-160", "name": "Pompa odśrodkowa HT 50-160" },
  "version": 5,
  "publishedAt": "2026-11-22T12:20:00+01:00",
  "parts": [
    {
      "nodeId": "imp",
      "itemCode": "HT-50-02",
      "name": "Wirnik Ø160, brąz",
      "group": "Część hydrauliczna",
      "status": "approved",
      "review": { "proposedBy": "automat", "confidence": 0.91, "approvedBy": "u-1042", "approvedAt": "2026-11-12T09:14:00+01:00" },
      "instructionId": "wymiana-wirnika",
      "kit": [
        { "ref": "node", "nodeId": "mseal", "quantity": 1, "required": true },
        { "ref": "item", "itemCode": "SRV-NW-M12", "quantity": 1, "required": true },
        { "ref": "item", "itemCode": "SRV-WP-6625", "quantity": 1, "required": true },
        { "ref": "item", "itemCode": "SRV-OR-1403", "quantity": 1, "required": true }
      ]
    },
    {
      "nodeId": "base",
      "itemCode": "HT-50-10",
      "name": "Rama fundamentowa",
      "status": "excluded",
      "review": { "proposedBy": "automat", "confidence": 0.93, "reason": "Konstrukcja spawana, nie podlega zużyciu." },
      "kit": []
    }
  ],
  "items": [
    { "itemCode": "SRV-NW-M12", "name": "Nakrętka wirnika M12", "unit": "szt", "origin": "library" },
    { "itemCode": "SRV-USZ-0042", "name": "Uszczelka pokrywy", "unit": "szt", "origin": "manual" }
  ]
}
```

Pozycja kompletu wskazuje albo inny element modelu (`ref: "node"`), albo indeks z biblioteki (`ref: "item"`). Indeksy dopisane ręcznie mają `origin: "manual"`. Do klientów trafiają tylko części o statusie `approved`.

### 6.5 pricelist.json (fragment)

```json
{
  "schema": "pricelist/1.0",
  "producerId": "producent-d",
  "version": 12,
  "validFrom": "2026-11-12",
  "currency": "PLN",
  "priceBasis": "indicative",
  "prices": [
    { "itemCode": "HT-50-02", "netPrice": "690.00" },
    { "itemCode": "HT-50-03", "netPrice": "385.00" },
    { "itemCode": "SRV-NW-M12", "netPrice": "11.00" }
  ]
}
```

Każda wersja `pricelist.json` jest niezmienna. Historia cen indeksu to jego ceny w kolejnych wersjach, a trend to porównanie dwóch ostatnich wersji. Do wpisu historii system dopisuje źródło zmiany i osobę, która opublikowała cennik.

Wzorcowy plik CSV do masowej aktualizacji cen (US-22):

```text
indeks;nazwa;cena_netto;waluta
HT-50-02;Wirnik Ø160, brąz;690,00;PLN
HT-50-03;Uszczelnienie mechaniczne Ø32 SiC/SiC/EPDM;385,00;PLN
SRV-NW-M12;Nakrętka wirnika M12;11,00;PLN
```

Przy imporcie liczą się kolumny `indeks` i `cena_netto`. Nazwa i waluta ułatwiają pracę w arkuszu i są pomijane.

### 6.6 Konwersja STEP → GLB

1. **Odczyt.** Jądro geometryczne Open CASCADE (albo komercyjny pakiet konwersji CAD) czyta STEP ze strukturą złożenia, nazwami i kolorami.
2. **Teselacja.** Bryły zamieniane są na siatki trójkątów z tolerancją dobraną do wielkości produktu.
3. **Uproszczenie.** Redukcja liczby trójkątów, usunięcie drobnych otworów i elementów całkowicie zasłoniętych, wykrycie powtórzeń (np. śruby) i zapis jako instancje.
4. **Hierarchia i identyfikatory.** Każdy komponent dostaje stały `nodeId` wyliczony ze ścieżki w złożeniu, żeby ponowny import nowej rewizji zachował powiązania sBoM.
5. **Rozstrzał.** Wyliczenie wektorów od środka złożenia; dla części współosiowych wzdłuż wspólnej osi.
6. **Zapis.** GLB z kompresją, metadane w `extras`, animacja `explode`, miniatura.
7. **Propozycje automatu.** Wstępny `sbom.json` ze statusami `proposed`.

Uproszczenie jest lekkie: model ma zachować rozpoznawalny kształt każdej części, a nie nadawać się do produkcji.

### 6.7 Konwersja PNG → GLB

1. Obraz jest skalowany i zapisywany jako tekstura.
2. Każdy obszar części (zaznaczony przez człowieka, a w N5 zaproponowany przez segmentację obrazu) staje się płaską siatką z wycinkiem tekstury i własnym węzłem.
3. Cały rysunek pozostaje w tle jako półprzezroczysta warstwa odniesienia.
4. Mniejsze obszary leżą nad większymi, żeby dało się je kliknąć.
5. Wektor rozstrzelenia odsuwa obszar od środka rysunku i lekko go unosi.

### 6.8 Statusy przeglądu

| Status | Znaczenie | Widoczny dla klienta |
|---|---|---|
| `proposed` | Propozycja automatu albo nowy obszar bez decyzji | nie |
| `approved` | Część zamienna zatwierdzona przez człowieka | tak, po publikacji |
| `excluded` | Element wyłączony: nie jest częścią zamienną | nie (widoczny na modelu, niewybieralny) |

Publikacja nie wymaga decyzji dla wszystkich propozycji, ale wymaga co najmniej jednej zatwierdzonej części, a każda zatwierdzona część musi mieć indeks.

## 7. Zapytanie ofertowe

### 7.1 Przepływ

1. Klient zaznacza części; system dobiera komplety i pokazuje ceny poglądowe.
2. Klient podaje dane firmy, adres dostawy, pilność i uwagi, po czym wysyła zapytanie.
3. System dzieli listę po producentach i dla każdego tworzy zapytanie z numerem `RFQ-RRRRMMDD-NNNN-K`.
4. System generuje XML i PDF, zapisuje je i wysyła e-mailem na adres BOK producenta (reguły z US-24), z kopią do klienta.
5. BOK weryfikuje dobór, potwierdza dostępność i ceny, po czym przesyła klientowi ostateczną ofertę własnym kanałem.
6. Zamówienie i płatność odbywają się poza PartPark.

### 7.2 Zastrzeżenie cenowe

Treść robocza, do zatwierdzenia przez prawnika:

> Ceny są poglądowe i nie stanowią oferty handlowej. Wymagają potwierdzenia przez biuro obsługi klienta, które prześle ostateczną ofertę.

Zastrzeżenie pojawia się w sekcji zapytania, w potwierdzeniu, w pliku PDF, w polu `Disclaimer` pliku XML i w treści e-maila.

### 7.3 Plik XML

Przestrzeń nazw `urn:partpark:rfq:1.0`, kodowanie UTF-8, schemat XSD publikowany razem z dokumentacją. Przykład skrócony do trzech pozycji:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<RequestForQuotation xmlns="urn:partpark:rfq:1.0" version="1.0">
  <Header>
    <RfqNumber>RFQ-20261122-4821-2</RfqNumber>
    <IssueDateTime>2026-11-22T12:22:20+01:00</IssueDateTime>
    <Language>pl</Language>
    <Currency>PLN</Currency>
    <PriceBasis>indicative</PriceBasis>
    <Disclaimer>Ceny poglądowe. Nie stanowią oferty handlowej. Ostateczną ofertę przesyła biuro obsługi klienta.</Disclaimer>
  </Header>
  <Supplier>
    <Name>Producent D</Name>
    <CustomerServiceEmail>bok@producent-d.example</CustomerServiceEmail>
  </Supplier>
  <Buyer>
    <Company>Firma utrzymaniowa (dane demo)</Company>
    <TaxId>1234567890</TaxId>
    <Contact><Name>Serwisant (rola)</Name><Email>serwisant@firma-utrzymaniowa.example</Email><Phone>000 000 000</Phone></Contact>
    <DeliveryAddress>Miejsce instalacji produktu (demo)</DeliveryAddress>
  </Buyer>
  <Request>
    <Urgency>urgent</Urgency>
    <InstallationQuoteRequested>false</InstallationQuoteRequested>
    <ProductSerialNumber>HT-2023-00418</ProductSerialNumber>
    <Notes>Wyciek na uszczelnieniu, pompa wyłączona.</Notes>
  </Request>
  <Lines>
    <Line number="1" type="part">
      <ItemCode>HT-50-02</ItemCode>
      <Name>Wirnik Ø160, brąz</Name>
      <Quantity unit="szt">1</Quantity>
      <IndicativeUnitNetPrice>690.00</IndicativeUnitNetPrice>
      <IndicativeNetAmount>690.00</IndicativeNetAmount>
      <Product code="HT-50-160" name="Pompa odśrodkowa HT 50-160" sbomVersion="5" nodeId="imp"/>
    </Line>
    <Line number="2" type="kit" parentLine="1" required="true">
      <ItemCode>HT-50-03</ItemCode>
      <Name>Uszczelnienie mechaniczne Ø32 SiC/SiC/EPDM</Name>
      <Quantity unit="szt">1</Quantity>
      <IndicativeUnitNetPrice>385.00</IndicativeUnitNetPrice>
      <IndicativeNetAmount>385.00</IndicativeNetAmount>
      <Product code="HT-50-160" name="Pompa odśrodkowa HT 50-160" sbomVersion="5" nodeId="mseal"/>
    </Line>
    <Line number="3" type="kit" parentLine="1" required="true">
      <ItemCode>SRV-NW-M12</ItemCode>
      <Name>Nakrętka wirnika M12</Name>
      <Quantity unit="szt">1</Quantity>
      <IndicativeUnitNetPrice>11.00</IndicativeUnitNetPrice>
      <IndicativeNetAmount>11.00</IndicativeNetAmount>
      <Product code="HT-50-160" name="Pompa odśrodkowa HT 50-160" sbomVersion="5"/>
    </Line>
  </Lines>
  <Totals>
    <LineCount>3</LineCount>
    <IndicativeNetTotal>1086.00</IndicativeNetTotal>
  </Totals>
</RequestForQuotation>
```

| Element | Znaczenie |
|---|---|
| `PriceBasis` | Zawsze `indicative`: ceny nie są wiążące |
| `Line/@type` | `part` to część wskazana przez klienta, `kit` to element zależny z kompletu |
| `Line/@parentLine` | Numer pozycji części, do której należy element kompletu |
| `Line/@required` | Czy element kompletu jest wymagany przez sBoM |
| `Product/@sbomVersion` | Wersja sBoM, z której powstała pozycja |
| `Product/@nodeId` | Element modelu serwisowego; brak atrybutu oznacza pozycję z biblioteki indeksów |
| `Urgency` | `standard` albo `urgent` (produkt wyłączony z użytku) |

Kwoty mają kropkę dziesiętną i dwa miejsca po przecinku. Własny schemat da się później odwzorować na UBL RequestForQuotation albo openTRANS RFQ (N15).

### 7.4 Plik PDF

Format A4, jedna kolumna, czcionka z polskimi znakami osadzona w pliku. Zawartość:

- tytuł „Zapytanie ofertowe”, numer, data, pilność;
- zamawiający (firma, NIP, osoba, e-mail, telefon, adres dostawy, numer seryjny) i adresat (producent, BOK, adres e-mail);
- tabela: Lp., indeks, nazwa, ilość, cena poglądowa netto, wartość poglądowa; pozycje kompletu wcięte, z odwołaniem do pozycji części; przy części nazwa produktu i wersja sBoM;
- szacunkowa wartość netto;
- uwagi klienta;
- zastrzeżenie cenowe.

PDF i XML niosą te same dane. PDF jest dla człowieka, XML do importu w systemach producenta.

### 7.5 Wiadomość e-mail

| Pole | Wartość |
|---|---|
| Do | Adres BOK producenta wynikający z reguł kierowania |
| DW | Adres e-mail klienta z formularza |
| Odpowiedz do | Adres e-mail klienta, żeby BOK odpowiadał mu bezpośrednio |
| Temat | `[PartPark] Zapytanie ofertowe RFQ-… · <firma klienta> · <pilność>` |
| Treść | Krótkie podsumowanie: klient, liczba pozycji, suma szacunkowa, zastrzeżenie cenowe |
| Załączniki | `RFQ-….xml`, `RFQ-….pdf` |

## 8. Architektura

### 8.1 Komponenty

| Komponent | Odpowiedzialność |
|---|---|
| Aplikacja klienta (web, PWA) | Katalog, viewer, lista części, zapytanie, instrukcje |
| sBoM Studio (web) | Repozytorium, import, przegląd, edytor kompletów, cennik, publikacja |
| API platformy | Katalog, wersje, zapytania, konta, uprawnienia; zawsze w kontekście producenta |
| Usługa konwersji | Kolejka zadań i kontenery robocze: STEP → GLB, PNG → GLB, miniatury |
| Automat propozycji | Reguły i model klasyfikujący elementy oraz proponujący komplety; wynik zawsze trafia do przeglądu |
| Magazyn plików + CDN | Paczki wersji (niezmienne), pliki źródłowe producenta (prywatne) |
| Baza danych | Producenci, produkty, wersje, sBoM, cenniki, zapytania, dziennik decyzji |
| Usługa zapytań | Generowanie XML i PDF, wysyłka e-mail, ponowienia, log doręczeń |

### 8.2 Wielu producentów

- Każdy producent to osobny dzierżawca (tenant) z własnymi użytkownikami, biblioteką indeksów, cennikiem i adresami BOK.
- Identyfikator producenta jest częścią klucza każdego rekordu i ścieżki każdego pliku. Uprawnienia sprawdza serwer.
- Klient może mieć dostęp do katalogów wielu producentów; lista części łączy je, a zapytania są rozdzielane.
- Indeksy są unikalne w ramach producenta, nie globalnie.

### 8.3 Udostępnianie aktualizacji sBoM i cen

| Mechanizm | Opis |
|---|---|
| Wersje niezmienne | Publikacja tworzy nową paczkę; stare wersje zostają do wglądu i wycofania |
| Wskaźnik „aktualna” | Katalog podaje dla produktu numer aktualnej wersji modelu, sBoM i cennika |
| Pobieranie różnicowe | Aplikacja porównuje sumy kontrolne z `manifest.json` i pobiera tylko zmienione pliki |
| Pamięć podręczna | Pliki wersji mają niezmienne adresy, więc CDN i przeglądarka przechowują je bez ograniczeń |
| Powiadomienie | Znacznik „nowa wersja sBoM” w katalogu; opcjonalnie e-mail do klientów, którzy pytali o dany produkt |
| Spójność listy | Po aktualizacji lista klienta przelicza się na nową wersję; usunięte części są zgłaszane klientowi |
| Punkty API | `GET /catalog`, `GET /products/{id}`, `GET /products/{id}/versions/{v}/manifest`, `POST /rfq` |

### 8.4 Integracja z systemami producenta

W MVP producent pracuje bez integracji: pliki wgrywa w Studio, cennik importuje z CSV, a zapytania odbiera e-mailem. Moduł N6 dodaje standard API JSON z mapowaniem pól do dowolnego ERP: import indeksów i cennika oraz przekazanie zapytania do ERP lub CRM. Opis jest w [zalacznik-erp-api.md](./zalacznik-erp-api.md).

## 9. Kierunek budowy

### 9.1 Stos

| Warstwa | Technologia |
|---|---|
| Front-end | React + TypeScript + Vite, three.js przez react-three-fiber, TanStack Query |
| Pakowanie | PWA (MVP); Capacitor dla iOS i Android (N1) |
| Back-end | ASP.NET Core (.NET LTS), REST + OpenAPI, generowany klient TypeScript |
| Konwersja CAD | Kontener roboczy z Open CASCADE (Python lub C++) albo komercyjny pakiet konwersji; kolejka zadań |
| Optymalizacja modeli | glTF-Transform, meshoptimizer, kompresja tekstur KTX2 |
| Automat propozycji | Reguły na nazwach i strukturze + model językowy do uzasadnień; wyniki z poziomem pewności |
| Baza | Azure SQL albo PostgreSQL, wiersze z identyfikatorem producenta |
| Pliki | Magazyn obiektów + CDN, adresy podpisane dla plików prywatnych |
| Zapytania | Generator XML z walidacją XSD, generator PDF po stronie serwera, usługa e-mail transakcyjnych |
| Tożsamość | OIDC: logowanie klientów i pracowników producenta, role w ramach producenta |

Prototyp jest jednym plikiem HTML z three.js, jsPDF i JSZip. Symuluje konwersję STEP i wysyłkę e-mail; import PNG, przegląd w Studio, publikacja, XML i PDF działają naprawdę w przeglądarce. Logowanie zastępuje przełącznik perspektywy: „Klient” pokazuje tylko ścieżkę klienta, a „Producent · sBoM Studio” tylko moduł Studio. Ekran cennika (S-14) działa w przeglądarce: wzór CSV, import z podglądem zmian, publikacja cennika, historia i trend. Historia cen sprzed otwarcia prototypu jest fikcyjna, a zmiany znikają po odświeżeniu strony. Dane są syntetyczne: producenci nazywają się „Producent A–D”, a formularz zapytania ma wpisane dane demonstracyjne (rola zamiast osoby, adresy w domenie `.example`), żeby nikt nie wpisywał do prototypu prawdziwych danych. Plik samodzielny otwiera się z dysku i nie łączy się z internetem.

### 9.2 Kolejność prac

1. **Etap 0 — weryfikacja techniczna (4 tyg.).** Trzy ryzyka: konwersja prawdziwych plików STEP 2–3 producentów do GLB poniżej limitów, trafność propozycji automatu na tych plikach, doręczalność e-maili z XML i PDF do skrzynek BOK.
2. **Sprinty 1–2.** Szkielet, konta i wielodostępność (M21), katalog (M1), viewer z zaznaczaniem i rozstrzałem (M2–M4) na modelach z etapu 0.
3. **Sprinty 3–4.** sBoM Studio: repozytorium, import STEP i PNG, przegląd, edytor kompletów, rozstrzał (M12–M18).
4. **Sprinty 5–6.** Komplety i lista części u klienta (M5–M6), cennik poglądowy i publikacja (M7, M19–M20), zapytanie ofertowe XML + PDF + e-mail (M9–M10).
5. **Sprint 7.** Konto klienta (M8), instrukcje (M11), PWA (M22), testy wydajności i dostępności.
6. **Pilotaż (4 tyg.).** 2–3 producentów z różnych branż, po 5–10 produktów, pomiar miar sukcesu z sekcji 1.2.

### 9.3 Definicja ukończenia (DoD) dla historii

- Spełnione wszystkie kryteria akceptacji; testy jednostkowe i e2e (Playwright) dla ścieżki głównej.
- Zgodność z [design.md](../DESIGN.md) w obu motywach i od 360 px szerokości.
- Brak błędów dostępności w automatycznym audycie (axe) dla nowego ekranu.
- Punkty API opisane w OpenAPI; schematy `sbom`, `pricelist`, `manifest` i XSD zapytania wersjonowane w repozytorium.
- Test izolacji: użytkownik producenta A nie odczyta danych producenta B.

## 10. Otwarte pytania

- [ ] Kto zatwierdza treść zastrzeżenia cenowego (prawnik) i czy ma być jednakowa dla wszystkich producentów.
- [ ] Czy katalog producenta jest domyślnie publiczny, czy tylko dla zaproszonych klientów.
- [ ] Część zamienna bez ceny: blokada publikacji czy oznaczenie „cena na zapytanie”.
- [ ] Jądro konwersji STEP: Open CASCADE czy pakiet komercyjny (jakość uproszczenia, koszt licencji).
- [ ] Skąd automat bierze historię sprzedaży części i czy producenci zgodzą się ją udostępnić.
- [ ] Czy BOK ma zwracać status oferty do PartPark (N7), czy MVP kończy się na doręczeniu e-maila.
- [ ] Model biznesowy platformy: opłata od producenta, od produktu czy od zapytania.
- [ ] Lista producentów i produktów do pilotażu.
- [ ] Czy klient ma widzieć trend ceny, czy tylko właściciel produktu. Dziś trend jest wyłącznie w sBoM Studio.
- [ ] Czy import CSV ma pozwalać na przyszłą datę obowiązywania cennika. Dziś cennik obowiązuje od chwili publikacji.
- [ ] Czy moduł integracji z ERP (N6) wraca do MVP dla pierwszego producenta.

## Załączniki

- [brief.md](./brief.md) — brief prototypu w pięciu częściach.
- [design.md](../DESIGN.md) — system projektowy: tokeny, typografia, komponenty, zasady viewera i sBoM Studio.
- [zalacznik-erp-api.md](./zalacznik-erp-api.md) — moduł opcjonalny: standard API JSON i mapowanie pól do ERP.
