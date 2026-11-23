# SPEC.md — PartPark

| | |
|---|---|
| Wersja | 1.4 (szkic MVP z wynikami testów), 2026-11-22 |
| Źródła | [brief.md](./docs/brief.md), części 1–6 · [wyniki-testow.md](./docs/wyniki-testow.md) · [prototyp, wersja 11](https://claude.ai/artifact/WcigZ593MGMhwZZYKV7qMv) |

Oznaczenie `[DO USTALENIA: …]` to pytanie otwarte z osobą, która je rozstrzyga.

**Uwaga osób testujących.** Pierwszą wersję prototypu pokazano na żywo podczas cyklicznego spotkania. Ewa i Cezary skomentowali: „super aplikacja się zapowiada, brakuje elementu wysyłania zapytania ofertowego”. Pierwsza wersja nie miała zapytania ofertowego. Zmiany, które wynikają z tej uwagi, mają dopisek „dotyczy: Ewa, Cezary”. Pełny zapis jest w [wyniki-testow.md](./docs/wyniki-testow.md).

[DO USTALENIA: czy są inne notatki z testów oraz wyniki peer testu z zadaniem o wirniku pompy — dostarcza właściciel PartPark]

## 1. Aplikacja w jednym zdaniu

PartPark to aplikacja dla serwisantów i pracowników utrzymania ruchu, którzy widzą uszkodzoną część produktu, ale nie znają jej indeksu ani elementów zależnych potrzebnych do wymiany: wskazują część na modelu 3D produktu, widzą dobrany komplet z cenami poglądowymi i wysyłają producentowi zapytanie ofertowe.

## 2. Kontekst użytkownika i ograniczenia

- Gdzie, na czym i w jakiej sytuacji ktoś używa aplikacji: klient stoi przy uszkodzonym produkcie z telefonem w ręku albo pracuje przy komputerze. Otwiera aplikację w przeglądarce i loguje się hasłem oraz kodem z aplikacji uwierzytelniającej (MFA). Każdy krok to jeden ekran, który mieści się w oknie bez przewijania strony.
- Kto jeszcze z niej korzysta:
  - **Właściciel produktu (Product Owner)** po stronie producenta: przygotowuje sBoM i aktualizuje cennik w module sBoM Studio. Przeważnie jeden na producenta, z wieloma produktami.
  - **Administrator producenta:** osoba nominowana do tej roli przez przedsiębiorstwo, które produkuje dany produkt. W osobnym module administratora konfiguruje elementy techniczne: serwer pocztowy, ustawienia MFA, połączenie z API Claude AI i integrację z ERP.
  - **Administrator PartPark:** zakłada konta klientów, właścicieli produktu i administratorów producenta (po nominacji) oraz wskazuje, których producentów widzi klient.
  - **Biuro obsługi klienta (BOK) producenta:** odbiera zapytanie e-mailem i przesyła ostateczną ofertę. Pracuje poza aplikacją.
- Ograniczenia (czas, dane, dostęp, liczba użytkowników):
  - Liczba użytkowników: ok. 500 klientów łącznie, ok. 100 pracuje online w ciągu dnia.
  - Dostęp: logowanie hasłem i kodem z aplikacji uwierzytelniającej (MFA). Konta zakłada administrator PartPark. Klient widzi produkty tylko wskazanych producentów, a o kolejne uprawnienia może wysłać wniosek do administratora. Klient nie widzi ekranów sBoM Studio ani modułu administratora. Właściciel produktu widzi wszystkie produkty swojego producenta.
  - Dane: klient widzi wyłącznie wersję sBoM i ceny opublikowane w sBoM Studio. Ceny są poglądowe, a ostateczną ofertę przesyła BOK. Formularz zapytania bierze domyślne dane firmy klienta. Dane są przechowywane w Unii Europejskiej.
  - Poczta: każdy producent ma własny serwer pocztowy, a jego rodzaj i dane połączenia podaje administrator producenta. Gdy serwer odrzuci wiadomość, klient dostaje informację, że ma skontaktować się z BOK i wysłać zapytanie na ustalony adres e-mail.
  - Claude AI generuje modele 3D z rysunków DWG, zdjęć PNG i plików STEP.
  - Zaplecze: Supabase (brief, część 6).
  - Integracja z ERP jest opcjonalna: aplikacja działa bez niej.
  - Czas: [DO USTALENIA: termin oddania MVP — rozstrzyga właściciel PartPark]
- [DO USTALENIA: (a) ilu producentów będzie w aplikacji w dniu startu MVP; (b) ile produktów w katalogu będzie miał największy z nich: kilkanaście, kilkadziesiąt czy kilkaset. Od (b) zależy, czy katalog bez wyszukiwarki wystarczy w głównej ścieżce — rozstrzyga właściciel PartPark]
- [DO USTALENIA: do którego administratora trafia wniosek klienta o uprawnienia (administrator PartPark czy administrator producenta) i jaką drogą: formularz w aplikacji czy e-mail — rozstrzyga właściciel PartPark]
- [DO USTALENIA: gdzie administrator PartPark zakłada konta i wskazuje producentów: na ekranie w aplikacji czy w panelu Supabase — rozstrzyga właściciel PartPark]
- [DO USTALENIA: kto wpisuje domyślne dane firmy klienta (administrator PartPark przy zakładaniu konta czy klient) i które pola formularza obejmują — rozstrzyga właściciel PartPark]
- [DO USTALENIA: jakie ustawienia MFA ma moduł administratora, np. reset aplikacji uwierzytelniającej użytkownika — rozstrzyga właściciel PartPark]
- [DO USTALENIA: jak rysunki DWG i pliki STEP trafiają do Claude AI. Według wiedzy agenta API Claude przyjmuje obrazy, pliki PDF i tekst, a formatu DWG nie czyta, więc rysunek trzeba najpierw zamienić na obraz albo PDF; duży plik STEP może nie zmieścić się w jednym zapytaniu — rozstrzyga właściciel PartPark w sekcji 6]
- [DO USTALENIA: jakie rodzaje serwerów pocztowych mają producenci i jakich danych wymaga połączenie — podaje administrator producenta]
- [DO USTALENIA: największy plik STEP, który ma dać się zaimportować — podaje producent]
- [DO USTALENIA: treść zastrzeżenia cenowego — rozstrzyga prawnik]

## 3. Zakres

Must-have to funkcje, bez których klient nie przejdzie głównej ścieżki z sekcji 4. Wiersze M8–M12 są na liście, bo bez opublikowanego modelu katalog jest pusty, bez adresu BOK i serwera pocztowego zapytanie nie ma dokąd wyjść, a bez konta i wskazanego producenta klient nie zobaczy żadnego produktu.

| Must-have | Nice-to-have | Poza zakresem (powód) |
|---|---|---|
| M1 Logowanie e-mailem i hasłem z kodem z aplikacji uwierzytelniającej (MFA) | N1 Import PNG / JPG z ręcznym zaznaczaniem obszarów części (S1) | Płatności online i zamówienie wiążące — brief zostawia je poza prototypem; ofertę i zamówienie obsługuje BOK |
| M2 Katalog produktów wskazanych producentów i wybór produktu (K1) | N2 Propozycje automatu z pewnością i uzasadnieniem (S2) | Praca biura obsługi klienta i ostateczna oferta — BOK pracuje poza aplikacją |
| M3 Model serwisowy: obrót, przybliżenie, rozsunięcie, zaznaczanie dowolnej liczby części (K2) | N3 „Zobacz jako klient” po publikacji (S3) | Ceny indywidualne — ceny w aplikacji są poglądowe |
| M4 Komplet: elementy zależne dobierane i podświetlane same, z cenami poglądowymi (K2, K3) | N4 Cennik poglądowy: import CSV z podglądem zmian, wzór CSV, historia cen, trend (S4) | Aplikacje w sklepach mobilnych — aplikacja działa w przeglądarce |
| M5 Zapytanie ofertowe: pozycje pogrupowane po producentach, formularz z domyślnymi danymi firmy klienta, „Wyślij zapytanie ofertowe” (K3) (dotyczy: Ewa, Cezary) | N5 Generowanie modeli 3D przez Claude AI z rysunków DWG, zdjęć PNG i plików STEP oraz konfiguracja API Claude w module administratora | Instrukcje wymiany, ekran z prototypu — nie ma go w briefie |
| M6 Wysyłka zapytania e-mailem do BOK producenta przez serwer pocztowy, z plikami XML i PDF; gdy serwer odrzuci wiadomość, informacja dla klienta o kontakcie z BOK (dotyczy: Ewa, Cezary) | N6 Opcjonalna integracja z ERP w zakresie indeksów i cen oraz jej konfiguracja w module administratora | Wyszukiwarka i filtr branż w katalogu — są w prototypie, nie ma ich w briefie; przy dużym katalogu mogą być potrzebne w głównej ścieżce, patrz pytanie o liczbę produktów w sekcji 2 |
| M7 Potwierdzenie: podgląd i pobranie plików PDF i XML (K4) (dotyczy: Ewa, Cezary) | N7 Wniosek klienta do administratora o nadanie uprawnień do produktów kolejnego producenta | Widok „Zbiorczo po indeksach”, „Kopiuj listę indeksów”, autoobrót i wyszarzanie niezaznaczonych części — są w prototypie, nie ma ich w briefie |
| M8 sBoM Studio: repozytorium modeli i import modelu z pliku STEP (S1) | N8 Ustawienia MFA w module administratora | Lista „Moje zapytania” z historią i statusem — nie ma jej w briefie |
| M9 sBoM Studio: zatwierdzanie części, indeks, cena poglądowa, komplet, indeksy dopisywane ręcznie (S2) | — | Ponawianie wysyłki, log doręczeń i wiadomość testowa w ustawieniach poczty — nie ma ich w briefie |
| M10 sBoM Studio: publikacja wersji sBoM z cenami (S3) | — | Zaproszenia i odbieranie dostępu przez administratora producenta — konta zakłada administrator PartPark |
| M11 Moduł administratora: adres BOK i serwer pocztowy | — | Dziennik zdarzeń — nie ma go w briefie |
| M12 Konta i uprawnienia: administrator PartPark zakłada konta i wskazuje klientowi producentów | — | Limit miesięczny, licznik zużycia i test połączenia API Claude; propozycje części i kompletów od Claude dla modelu ze STEP — nie ma ich w briefie |
| — | — | Drugi składnik przez SMS i logowanie kontem firmowym (SSO) — drugim składnikiem jest aplikacja uwierzytelniająca |
| — | — | Edytor mapowania pól ERP, pobieranie z ERP według harmonogramu, przekazanie zapytania do ERP — brief mówi tylko o indeksach i cenach |
| — | — | Skan tabliczki znamionowej, praca bez zasięgu, dostępność i termin dostawy, status oferty od BOK, zdjęcie uszkodzenia — nie ma ich w briefie |
| — | — | Wycofanie do poprzedniej wersji, import z PDM / PLM, przyszła data cennika, trend ceny widoczny dla klienta — nie ma ich w briefie |
| — | — | Wersja angielska i inne waluty, rozliczenia za platformę — nie ma ich w briefie |

## 4. Ekrany w kolejności głównej ścieżki

Główna ścieżka: klient loguje się, wybiera produkt, zaznacza uszkodzone części na modelu, sprawdza dobrany komplet i wysyła zapytanie ofertowe do producenta.

1. Logowanie — klient podaje e-mail, hasło i kod z aplikacji uwierzytelniającej.
2. K1 Produkt — klika kartę produktu w katalogu.
3. K2 Części — obraca model, klika „Rozsuń części”, zaznacza części, otwiera „Komplet”, klika „Dalej: zapytanie”.
4. K3 Zapytanie — sprawdza pozycje, sumę szacunkową i domyślne dane firmy, klika „Wyślij zapytanie ofertowe” (dotyczy: Ewa, Cezary).
5. K4 Potwierdzenie — widzi numer zapytania i adres BOK, ogląda PDF i XML, pobiera pliki (dotyczy: Ewa, Cezary).

Ekrany, które przygotowują dane dla głównej ścieżki (must-have):

1. S1 Repozytorium — właściciel produktu otwiera model albo klika „Importuj STEP”.
2. S2 Przegląd — zatwierdza części, ustawia indeks, cenę poglądową i komplet.
3. S3 Publikacja — klika „Opublikuj sBoM vN”.
4. Moduł administratora, sekcja „Poczta” — administrator producenta wpisuje adres BOK i dane serwera pocztowego.
5. Konta i uprawnienia — administrator PartPark zakłada konta i wskazuje klientowi producentów (miejsce: patrz pytanie w sekcji 2).

Ekrany funkcji nice-to-have, budowane po głównej ścieżce: S4 Cennik, wniosek klienta o uprawnienia oraz sekcje „Claude AI”, „Integracja z ERP” i ustawienia MFA w module administratora.

Z prototypu zachowuję:

- kolejność kroków K1–K4 i S1–S3 oraz ramkę aplikacji: nagłówek, pasek kroków, jeden ekran kroku, pasek akcji na dole;
- nazwy przycisków: „Dalej: części”, „Dalej: zapytanie”, „Wyślij zapytanie ofertowe”, „Nowe zapytanie”, „Rozsuń części” / „Złóż model”, „Cofnij”, „Komplet”, „Do zapytania”, „Podgląd PDF”, „XML”, „Pobierz ZIP (XML + PDF)”, „Importuj STEP”, „Dalej: przegląd”, „Zatwierdź jako część zamienną”, „Dalej: publikacja”, „Opublikuj sBoM vN”;
- zakładki ekranu na wąskim oknie („Model”, „Lista części”, „Zaznaczone”; „Pozycje”, „Dane do zapytania”) i układ formularza zapytania;
- znaczenie kolorów: pomarańczowy „do wymiany”, bursztynowy „komplet”, zielony „zatwierdzone”;
- układ plików PDF i XML zapytania.

Zmieniam względem prototypu (źródło zmian: brief, część 6, z ustaleniami właściciela z 22.11; zmiana wynikająca z uwagi osób testujących ma dopisek):

- przełącznik perspektywy w nagłówku zastępuje logowanie z MFA; rola konta decyduje, które ekrany widać;
- zapytanie wychodzi e-mailem przez serwer pocztowy, a nie kończy się na podglądzie plików (dotyczy: Ewa, Cezary);
- dane fikcyjne zapisane w pliku zastępują modele i ceny opublikowane przez producentów;
- katalog pokazuje produkty tylko tych producentów, których wskazano klientowi;
- formularz zapytania ma wpisane domyślne dane firmy klienta zamiast danych demonstracyjnych;
- gdy serwer pocztowy odrzuci wiadomość, klient widzi informację o kontakcie z BOK i adresie e-mail;
- dochodzą dwa ekrany: logowanie oraz sekcja „Poczta” w module administratora;
- ekran „Instrukcje” i dodatki wymienione w kolumnie „Poza zakresem” nie wchodzą do MVP.

## 5. User stories must-have

### US1 · Logowanie z aplikacją uwierzytelniającą (M1)

Jako klient chcę logować się hasłem i kodem z aplikacji uwierzytelniającej, żeby nikt z samym hasłem nie wszedł na moje konto.

- K1 Loguję się pierwszy raz: wpisuję e-mail i hasło → widzę kod QR do zeskanowania w aplikacji uwierzytelniającej i pole na kod.  
  Sprawdzam: loguję się nowym kontem testowym, skanuję kod QR i wpisuję 6 cyfr; zaliczone, gdy po kodzie widzę katalog.
- K2 Loguję się kolejny raz: wpisuję e-mail i hasło, potem kod z aplikacji → widzę katalog produktów i wiersz „Krok 1 z 4 · Produkt”.  
  Sprawdzam: wylogowuję się i loguję ponownie; zaliczone, gdy po haśle widzę pole na kod bez kodu QR, a po kodzie karty produktów.
- K3 Podaję błędny kod → zostaję na ekranie kodu i widzę komunikat o błędnym kodzie.  
  Sprawdzam: wpisuję 000000; zaliczone, gdy widzę komunikat i nadal nie widzę katalogu.
- K4 Otwieram adres katalogu bez zalogowania → widzę ekran logowania.  
  Sprawdzam: w oknie prywatnym wklejam adres katalogu; zaliczone, gdy widzę pola e-mail i hasło.

To samo logowanie obowiązuje właściciela produktu, administratora producenta i administratora PartPark.

### US2 · Wybór produktu (M2)

Jako klient chcę wybrać produkt z katalogu, żeby otworzyć jego model serwisowy.

- K1 Otwieram katalog → widzę karty produktów wskazanych mi producentów, z nazwą, producentem, kodem oraz wersją i datą sBoM.  
  Sprawdzam: na danych z prototypu loguję się kontem klienta z uprawnieniami do Producenta A i Producenta D; zaliczone, gdy widzę 3 karty (karuzela, huśtawka, pompa), a na karcie pompy kod HT-50-160.
- K2 Klikam kartę produktu → widzę model tego produktu i wiersz „Krok 2 z 4 · Części”.  
  Sprawdzam: klikam kartę pompy na telefonie; zaliczone, gdy widzę model pompy i jej nazwę nad modelem.
- K3 Właściciel produktu zaimportował model, ale go nie opublikował → nie widzę karty tego produktu.  
  Sprawdzam: importuję model jako właściciel produktu, potem loguję się jako klient; zaliczone, gdy liczba kart się nie zmieniła.

### US3 · Zaznaczenie części na modelu (M3)

Jako klient chcę wskazać uszkodzoną część na modelu, żeby nie szukać jej indeksu.

- K1 Klikam „Rozsuń części” → części odsuwają się od siebie, a przycisk zmienia napis na „Złóż model”.  
  Sprawdzam: otwieram pompę i klikam przycisk; zaliczone, gdy widzę wirnik, który wcześniej był schowany w korpusie.
- K2 Klikam albo dotykam część → zmienia kolor na pomarańczowy, na dole modelu widzę pasek z jej nazwą, indeksem i ceną „ok.”, a licznik w nagłówku rośnie.  
  Sprawdzam: dotykam korpusu pompy; zaliczone, gdy pasek pokazuje „Korpus spiralny DN65/DN50”, a licznik nie pokazuje już 0.
- K3 Klikam drugą część → obie są pomarańczowe, a zakładka „Zaznaczone” pokazuje liczbę 2.  
  Sprawdzam: po K2 klikam silnik pompy; zaliczone, gdy na liście „Zaznaczone” są dwie części.
- K4 Nie zaznaczam nic → przycisk „Dalej: zapytanie” jest wyszarzony i podaje powód.  
  Sprawdzam: otwieram krok 2 bez zaznaczeń; zaliczone, gdy przycisk ma dymek „Najpierw zaznacz co najmniej jedną część”.

### US4 · Komplet i ceny poglądowe (M4)

Jako klient chcę zobaczyć elementy zależne dobrane do wskazanej części, żeby niczego nie zabrakło przy wymianie.

- K1 Zaznaczam część z kompletem → elementy zależne, które są elementami modelu, podświetlają się na bursztynowo, a pasek pokazuje „+ N poz. kompletu”.  
  Sprawdzam: zaznaczam wirnik pompy; zaliczone, gdy pasek pokazuje „+ 4 poz. kompletu”, a uszczelnienie mechaniczne na modelu jest bursztynowe.
- K2 Klikam „Komplet” → widzę listę pozycji kompletu z ilościami i wiersz „Część z kompletem: ok. …”.  
  Sprawdzam: po K1 klikam „Komplet”; zaliczone, gdy lista ma 4 pozycje, a wiersz pokazuje „ok. 1099,40 zł”.
- K3 Patrzę na dowolną kwotę w krokach 2–4 → ma dopisek „ok.” albo nazwę „szacunkowo netto”.  
  Sprawdzam: przechodzę kroki 2–4 z zaznaczonym wirnikiem; zaliczone, gdy żadna kwota nie stoi bez dopisku.

### US5 · Zapytanie ofertowe (M5)

Jako klient chcę zobaczyć wszystkie pozycje przed wysłaniem i podać dane firmy, żeby producent dostał komplet informacji do wyceny.

Historia odpowiada na uwagę o braku zapytania ofertowego (dotyczy: Ewa, Cezary).

- K1 Klikam „Dalej: zapytanie” → widzę pozycje pogrupowane po producentach z indeksem, ilością i wartością poglądową, sumę „Szacunkowo netto” i zastrzeżenie, że ceny nie są ofertą.  
  Sprawdzam: zaznaczam wirnik pompy i przechodzę do kroku 3; zaliczone, gdy widzę 5 pozycji i sumę 1099,40 zł.
- K2 Mam części dwóch producentów → widzę dwie grupy, każdą z nazwą producenta i adresem jego BOK.  
  Sprawdzam: zaznaczam część karuzeli (Producent A) i część pompy (Producent D); zaliczone, gdy tabela ma dwa wiersze producentów z dwoma różnymi adresami.
- K3 Otwieram formularz → pola danych firmy są wypełnione domyślnymi danymi mojej firmy.  
  Sprawdzam: przechodzę do kroku 3 kontem klienta testowego; zaliczone, gdy pola „Firma” i „NIP” pokazują dane firmy przypisanej do tego konta.
- K4 Zostawiam puste pole wymagane i klikam „Wyślij zapytanie ofertowe” → zostaję na kroku 3 i widzę komunikat „Uzupełnij pola: …”.  
  Sprawdzam: kasuję NIP i klikam przycisk; zaliczone, gdy widzę komunikat, a pasek kroków nadal pokazuje krok 3.

### US6 · Wysyłka e-mailem i potwierdzenie (M6, M7)

Jako klient chcę wysłać zapytanie do producenta i dostać potwierdzenie, żeby wiedzieć, że biuro obsługi klienta ma komplet indeksów do wyceny.

Historia odpowiada na uwagę o braku wysyłania zapytania ofertowego (dotyczy: Ewa, Cezary).

- K1 Klikam „Wyślij zapytanie ofertowe” → widzę ekran „Potwierdzenie” z numerem zapytania i adresem BOK, na który wyszła wiadomość.  
  Sprawdzam: wysyłam zapytanie o wirnik pompy przy testowej skrzynce BOK; zaliczone, gdy ekran pokazuje numer i adres, a w skrzynce jest wiadomość z plikami XML i PDF.
- K2 Na potwierdzeniu przełączam „Podgląd PDF” i „XML” → widzę treść pliku z tymi samymi pozycjami i sumą co w kroku 3.  
  Sprawdzam: po K1 otwieram oba podglądy; zaliczone, gdy każdy ma 5 pozycji i sumę 1099,40 zł (w XML zapisaną jako 1099.40).
- K3 Klikam „Pobierz ZIP (XML + PDF)” → przeglądarka pokazuje pobrany plik z numerem zapytania w nazwie.  
  Sprawdzam: klikam przycisk; zaliczone, gdy na liście pobranych plików jest plik ZIP, a w nim XML i PDF.
- K4 Serwer pocztowy odrzuca wiadomość → widzę informację, że zapytanie nie zostało wysłane, że mam skontaktować się z biurem obsługi klienta i wysłać zapytanie ofertowe na podany adres e-mail BOK.  
  Sprawdzam: administrator producenta wpisuje błędne dane serwera, a ja wysyłam zapytanie; zaliczone, gdy widzę tę informację razem z adresem e-mail BOK producenta.

[DO USTALENIA: czy w tej sytuacji klient może pobrać pliki PDF i XML, żeby dołączyć je do własnej wiadomości — rozstrzyga właściciel PartPark]

### US7 · Repozytorium i import modelu ze STEP (M8)

Jako właściciel produktu chcę dodać model serwisowy z pliku STEP, żeby klient miał na czym wskazać część.

- K1 Otwieram sBoM Studio → widzę tabelę modeli mojego producenta z wersją i stanem: szkic, zmiany robocze, opublikowany.  
  Sprawdzam: loguję się jako właściciel produktu Producenta D; zaliczone, gdy w tabeli są tylko produkty Producenta D.
- K2 Klikam „Importuj STEP” i wybieram plik → widzę kolejne kroki importu, a po zakończeniu model z listą elementów nazwanych jak komponenty w pliku.  
  Sprawdzam: importuję pilotażowy plik STEP; zaliczone, gdy model da się obracać, a lista elementów nie jest pusta.
- K3 Wybieram plik, którego nie da się odczytać → widzę powód, a tabela modeli się nie zmienia.  
  Sprawdzam: wybieram plik tekstowy z rozszerzeniem .step; zaliczone, gdy widzę komunikat z powodem, a liczba wierszy w tabeli jest ta sama.

### US8 · Zatwierdzanie i opis części (M9)

Jako właściciel produktu chcę wskazać, które elementy są częściami zamiennymi, i nadać im indeks, cenę i komplet, żeby klient po wskazaniu części dostał wszystko, co potrzebne do wymiany.

- K1 Klikam element i wybieram „Zatwierdź jako część zamienną” → element zmienia kolor na zielony i ma oznaczenie „część zamienna”.  
  Sprawdzam: zatwierdzam wał pompy; zaliczone, gdy wał jest zielony na modelu i na liście.
- K2 Zatwierdzam element bez indeksu → widzę komunikat „Najpierw wpisz indeks serwisowy tej części”, a element nie zmienia koloru.  
  Sprawdzam: kasuję indeks i klikam „Zatwierdź jako część zamienną”; zaliczone, gdy widzę komunikat.
- K3 Wpisuję indeks i cenę poglądową oraz dodaję do kompletu element modelu albo indeks dopisany ręcznie → wiersz części pokazuje indeks, cenę i liczbę pozycji kompletu.  
  Sprawdzam: dodaję do wału pompy indeks dopisany ręcznie; zaliczone, gdy wiersz wału pokazuje „kit 4” zamiast „kit 3”.

### US9 · Publikacja wersji (M10)

Jako właściciel produktu chcę opublikować sBoM z cenami, żeby klienci zobaczyli produkt w katalogu.

- K1 Klikam „Dalej: publikacja” → widzę, ile części trafi do klientów, i przycisk „Opublikuj sBoM vN”.  
  Sprawdzam: po US8 otwieram publikację; zaliczone, gdy licznik „Części zamienne” jest o 1 większy niż przed zatwierdzeniem wału.
- K2 Klikam „Opublikuj sBoM vN” → widzę „Opublikowano sBoM vN.”, a klient widzi w katalogu kartę produktu z tą wersją.  
  Sprawdzam: publikuję, potem loguję się jako klient; zaliczone, gdy karta pompy pokazuje nowy numer wersji, a wał da się zaznaczyć.
- K3 Zatwierdzona część nie ma indeksu → widzę „Publikacja jest zablokowana.” z nazwą części, a przycisk publikacji jest wyszarzony.  
  Sprawdzam: kasuję indeks zatwierdzonej części i otwieram publikację; zaliczone, gdy widzę komunikat i nazwę części.

### US10 · Adres BOK i serwer pocztowy (M11)

Jako administrator producenta chcę ustawić adres biura obsługi klienta i serwer pocztowy, żeby zapytania klientów trafiały do naszej skrzynki.

- K1 Otwieram moduł administratora → widzę sekcję „Poczta” z polem adresu BOK i polami danych serwera pocztowego.  
  Sprawdzam: loguję się jako administrator producenta; zaliczone, gdy widzę sekcję i jej pola.
- K2 Wpisuję adres BOK i dane serwera, zapisuję → widzę potwierdzenie zapisu, a hasło serwera nie jest już pokazywane.  
  Sprawdzam: zapisuję i odświeżam stronę; zaliczone, gdy adres BOK jest w polu, a pole hasła jest puste albo zamaskowane.
- K3 Klient wysyła zapytanie o produkt mojego producenta → na jego ekranie „Potwierdzenie” widać adres BOK, który wpisałem.  
  Sprawdzam: zmieniam adres BOK i wysyłam zapytanie kontem klienta; zaliczone, gdy potwierdzenie pokazuje nowy adres.
- K4 Konto bez roli administratora otwiera adres modułu → widzi komunikat o braku dostępu.  
  Sprawdzam: wklejam adres modułu, zalogowany jako klient; zaliczone, gdy nie widzę żadnego pola ustawień.

[DO USTALENIA: jakie pola ma połączenie z serwerem pocztowym — zależy od serwera producenta, rozstrzyga administrator producenta]

### US11 · Konta i uprawnienia do producentów (M12)

Jako administrator PartPark chcę zakładać konta i wskazywać klientowi producentów, żeby każdy widział tylko to, do czego ma uprawnienia.

- K1 Zakładam konto klienta i wskazuję mu Producenta A → klient po zalogowaniu widzi w katalogu tylko produkty Producenta A.  
  Sprawdzam: na danych z prototypu loguję się tym kontem; zaliczone, gdy widzę 2 karty (karuzela, huśtawka) i nie widzę pompy Producenta D.
- K2 Zakładam konto właściciela produktu dla Producenta D → po zalogowaniu widzi sBoM Studio z modelami Producenta D i nie widzi katalogu klienta.  
  Sprawdzam: loguję się tym kontem; zaliczone, gdy pierwszym ekranem jest tabela modeli z pompą.
- K3 Zakładam konto administratora producenta po nominacji → po zalogowaniu widzi moduł administratora swojego producenta.  
  Sprawdzam: loguję się tym kontem; zaliczone, gdy widzę sekcję „Poczta” z adresem BOK tego producenta.

[DO USTALENIA: gdzie administrator PartPark wykonuje te czynności: na ekranie w aplikacji czy w panelu Supabase — rozstrzyga właściciel PartPark]

## 6. Kierunek budowy

## 7. Wygląd
