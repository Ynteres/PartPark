# PR1 · Brief — odpowiedzi do czterech pól

Pola 1–3 to dosłowne fragmenty [brief.md](../brief.md). Zdarzenie w części „Problem” jest przykładem; zamień je na prawdziwe zdarzenie z własnego brain dumpu. Listę zastąpień w polu 4 porównaj z własną transkrypcją.

## Pole 1 · Problem, użytkownik i wartość (1879 z 5000 znaków)

**Problem**

Serwisant firmy utrzymaniowej zgłosił mailem do producenta urządzenia „łożysko do wymiany” i dołączył zdjęcie. Biuro obsługi klienta producenta wysłało samo łożysko. Na miejscu okazało się, że do wymiany potrzebne są też nowe uszczelnienie, śruby zabezpieczające i smar. Urządzenie stało wyłączone z użytku jeszcze dwa tygodnie, a serwisant musiał przyjechać drugi raz. Producent nie miał gotowej listy elementów potrzebnych do tej wymiany, więc biuro obsługi klienta ustalało ją ręcznie z konstruktorem.

**Użytkownik**

**Klient:** serwisant albo pracownik utrzymania ruchu, który stoi przy uszkodzonym produkcie z telefonem w ręku. Wie, który element jest zepsuty, bo go widzi. Nie zna jego nazwy ani indeksu i nie wie, jakie elementy zależne są potrzebne do poprawnej wymiany.

**Właściciel produktu po stronie producenta:** osoba, która odpowiada za poprawną definicję sBoM i cennik poglądowy. Widzi wszystkie produkty swojego producenta i sam zatwierdza publikację. Ma plik STEP albo rysunek PNG produktu i wie, które części się zużywają. Raz przygotowuje model serwisowy, komplety i ceny w module sBoM Studio, żeby nikt nie ustalał ich ręcznie przy każdym zgłoszeniu.

Biuro obsługi klienta producenta odbiera zapytanie i przesyła ostateczną ofertę. Jego praca zostaje poza prototypem.

**Wartość**

Klient wskazuje uszkodzoną część palcem na modelu produktu i nie musi znać indeksu. Elementy zależne dobierają się same, więc przed wysłaniem widzi cały komplet i orientacyjny koszt, a naprawa kończy się w jednym wyjeździe.

Właściciel produktu przygotowuje model serwisowy raz. Każda zatwierdzona zmiana sBoM i cen poglądowych trafia do wszystkich klientów producenta po jednej publikacji, a biuro obsługi klienta dostaje zapytanie z indeksami gotowe do wyceny.

Rozwiązanie nie jest związane z jedną branżą. Działa dla każdego produktu, który ma etap serwisu części zamiennych.

## Pole 2 · Zakres prototypu (2458 z 5000 znaków)

Prototyp pokazuje dwie osobne ścieżki, każdą na telefonie i na komputerze. Przełącznik perspektywy w nagłówku zastępuje logowanie. Każda perspektywa ma własny pasek czterech kroków: klient nie widzi ekranów sBoM Studio, a w sBoM Studio nie ma katalogu ani zapytania. Każdy krok to jeden ekran, który mieści się w oknie bez przewijania strony, a pasek kroków pokazuje, na którym etapie jest użytkownik.

**Ścieżka klienta** (od pierwszego do ostatniego ekranu)

- **Ekran K1 · Wybór produktu:** katalog kilku fikcyjnych produktów różnych producentów i branż (karuzela, huśtawka, wózek paletowy, krzesło obrotowe, pompa).
- **Ekran K2 · Model serwisowy:** model można obracać w każdą stronę, przybliżać i rozstrzelić. Kliknięcie zaznacza część innym kolorem, a elementy zależne podświetlają się same. Można zaznaczyć dowolną liczbę części.
- **Ekran K3 · Zapytanie ofertowe:** pozycje z indeksami, ilościami i cenami poglądowymi, pogrupowane po producentach, formularz danych i przycisk „Wyślij zapytanie ofertowe”.
- **Ekran K4 · Potwierdzenie:** podgląd pliku PDF i XML zapytania dla każdego producenta, z możliwością pobrania.

**Ścieżka producenta: moduł sBoM Studio** (dla właściciela produktu)

- **Ekran S1 · Repozytorium i import:** lista modeli serwisowych z wersją i stanem. Import pliku STEP (przebieg pokazany na modelu przykładowym) albo PNG (obszary części zaznaczane ręcznie na obrazie).
- **Ekran S2 · Przegląd modelu i sBoM:** elementy z propozycjami automatu (pewność i uzasadnienie). Właściciel produktu zatwierdza lub odrzuca każdą propozycję, ustawia indeks, cenę poglądową i komplet elementów zależnych oraz dopisuje indeksy ręcznie.
- **Ekran S3 · Publikacja:** nowa wersja sBoM z cenami poglądowymi trafia do katalogu klientów. „Zobacz jako klient” pokazuje wynik w perspektywie klienta.
- **Ekran S4 · Cennik poglądowy:** masowa aktualizacja cen z pliku CSV z podglądem zmian przed publikacją, wzorcowy plik CSV do pobrania, historia cen każdego indeksu i trend ceny w trzech stanach: wzrost, stała, spadek.

Ścieżki łączy tylko publikacja: klient widzi wyłącznie wersję sBoM i ceny opublikowane w sBoM Studio.

**Poza prototypem:** prawdziwa konwersja plików STEP, automatyczne rozpoznawanie części na własnych obrazach, wysyłanie e-maili, logowanie, konta producentów i uprawnienia, praca biura obsługi klienta i ostateczna oferta, płatności, integracja z ERP, ceny indywidualne, aplikacje w sklepach mobilnych. Wszystkie dane (producenci, produkty, indeksy, ceny) są fikcyjne.

## Pole 3 · Co testujemy (830 z 5000 znaków)

**Założenie o użyteczności:** klient bez podpowiedzi znajdzie i zaznaczy wskazaną część na modelu, zauważy dobrany komplet i zrozumie, że wysyła zapytanie, a ceny są poglądowe. Nie potwierdzi się, jeśli co najmniej dwóch z trzech testerów nie zaznaczy części w ciągu dwóch minut albo po wysłaniu powie, że kupił części w pokazanej cenie.

**Założenie o technologii:** jeden plik HTML z biblioteką 3D, bez serwera, wyświetli model z rozstrzałem i pozwoli zaznaczać części dotykiem na telefonie tak samo jak myszą, a część zatwierdzona i opublikowana w sBoM Studio od razu pojawi się u klienta i w pliku XML zapytania. Nie potwierdzi się, jeśli na telefonie któregoś testera model się nie wczyta, jeśli w więcej niż jednej z pięciu prób dotknięcie obróci model zamiast zaznaczyć część, albo jeśli opublikowanej części zabraknie w pliku XML.

## Pole 4 · Lista zastąpień (1512 z 3000 znaków)

- Nazwa mojej firmy → „producent urządzeń” (bez branży i wielkości, które pozwalałyby ją rozpoznać).
- Moje imię, nazwisko i stanowisko → „właściciel produktu po stronie producenta”.
- Adres strony i katalogu firmy → „katalog producenta”.
- Nazwy klientów (firmy, instytucje) → opis roli i branży, np. „firma utrzymaniowa”, „dział utrzymania ruchu”.
- Imiona i nazwiska serwisantów oraz pracowników klientów → „serwisant firmy utrzymaniowej”.
- Imiona i nazwiska pracowników biura obsługi klienta i konstruktorów → „pracownik biura obsługi klienta”, „konstruktor”.
- Adresy i lokalizacje, w których stoją produkty → usunięte albo „miejsce instalacji produktu”.
- Telefony i adresy e-mail, w tym skrzynka biura obsługi klienta → usunięte; w prototypie fikcyjne adresy w domenie .example.
- Prawdziwe indeksy części i nazwy handlowe produktów → fikcyjne kody (np. KR-0110, HT-50-02, SRV-…) i opisy typu („karuzela tarczowa”, „pompa odśrodkowa”).
- Rzeczywiste ceny części, rabaty i marże → „ceny poglądowe”, w prototypie kwoty fikcyjne.
- Numery seryjne produktów, numery zamówień i zapytań → fikcyjne numery przykładowe.
- Nazwy producentów z innych branż podane jako przykłady → fikcyjni producenci (np. „producent wózków paletowych”).
- Wewnętrzne procedury obsługi zgłoszeń i nazwy wewnętrznych systemów firmy → „system CAD”, „system ERP”, „biuro obsługi klienta”.
- Pliki konstrukcyjne (STEP, rysunki) → nie zostały wysłane; w opisie „plik STEP produktu”, a w prototypie modele uproszczone, zbudowane od zera.
