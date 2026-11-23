# Brief: PartPark, części zamienne z modelu serwisowego dla dowolnego produktu

## 1. Problem

Serwisant firmy utrzymaniowej zgłosił mailem do producenta urządzenia „łożysko do wymiany” i dołączył zdjęcie. Biuro obsługi klienta producenta wysłało samo łożysko. Na miejscu okazało się, że do wymiany potrzebne są też nowe uszczelnienie, śruby zabezpieczające i smar. Urządzenie stało wyłączone z użytku jeszcze dwa tygodnie, a serwisant musiał przyjechać drugi raz. Producent nie miał gotowej listy elementów potrzebnych do tej wymiany, więc biuro obsługi klienta ustalało ją ręcznie z konstruktorem.

## 2. Użytkownik

**Klient:** serwisant albo pracownik utrzymania ruchu, który stoi przy uszkodzonym produkcie z telefonem w ręku. Wie, który element jest zepsuty, bo go widzi. Nie zna jego nazwy ani indeksu i nie wie, jakie elementy zależne są potrzebne do poprawnej wymiany.

**Właściciel produktu po stronie producenta:** osoba, która odpowiada za poprawną definicję sBoM i cennik poglądowy. Widzi wszystkie produkty swojego producenta i sam zatwierdza publikację. Ma plik STEP albo rysunek PNG produktu i wie, które części się zużywają. Raz przygotowuje model serwisowy, komplety i ceny w module sBoM Studio, żeby nikt nie ustalał ich ręcznie przy każdym zgłoszeniu.

Biuro obsługi klienta producenta odbiera zapytanie i przesyła ostateczną ofertę. Jego praca zostaje poza prototypem.

## 3. Wartość

Klient wskazuje uszkodzoną część palcem na modelu produktu i nie musi znać indeksu. Elementy zależne dobierają się same, więc przed wysłaniem widzi cały komplet i orientacyjny koszt, a naprawa kończy się w jednym wyjeździe.

Właściciel produktu przygotowuje model serwisowy raz. Każda zatwierdzona zmiana sBoM i cen poglądowych trafia do wszystkich klientów producenta po jednej publikacji, a biuro obsługi klienta dostaje zapytanie z indeksami gotowe do wyceny.

Rozwiązanie nie jest związane z jedną branżą. Działa dla każdego produktu, który ma etap serwisu części zamiennych.

## 4. Zakres

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

## 5. Co testujemy

**Założenie o użyteczności:** klient bez podpowiedzi znajdzie i zaznaczy wskazaną część na modelu, zauważy dobrany komplet i zrozumie, że wysyła zapytanie, a ceny są poglądowe. Nie potwierdzi się, jeśli co najmniej dwóch z trzech testerów nie zaznaczy części w ciągu dwóch minut albo po wysłaniu powie, że kupił części w pokazanej cenie.

**Założenie o technologii:** jeden plik HTML z biblioteką 3D, bez serwera, wyświetli model z rozstrzałem i pozwoli zaznaczać części dotykiem na telefonie tak samo jak myszą, a część zatwierdzona i opublikowana w sBoM Studio od razu pojawi się u klienta i w pliku XML zapytania. Nie potwierdzi się, jeśli na telefonie któregoś testera model się nie wczyta, jeśli w więcej niż jednej z pięciu prób dotknięcie obróci model zamiast zaznaczyć część, albo jeśli opublikowanej części zabraknie w pliku XML.

## 6. Wymagania do MVP dodane po prototypie (2026-11-22)

Prototyp pokazał obie ścieżki na danych fikcyjnych. Aplikacja MVP ma dodatkowo spełnić wymagania, które właściciel PartPark podał po przejściu prototypu:

- **Skala:** ok. 500 klientów łącznie, ok. 100 pracuje online w ciągu dnia. Właściciel produktu (Product Owner), który przygotowuje sBoM i aktualizuje cennik, jest przeważnie jeden na producenta i ma wiele produktów.
- **Autoryzacja:** logowanie jest wymagane, z drugim składnikiem (MFA).
- **Serwer pocztowy:** aplikacja jest zintegrowana z serwerem pocztowym. Zapytanie ofertowe trafia e-mailem do biura obsługi klienta producenta.
- **Claude AI:** aplikacja ma konfigurowalne połączenie z API Claude AI, używane do generowania modeli 3D w sBoM Studio.
- **ERP:** integracja z ERP producenta w zakresie indeksów i cen jest opcjonalna.
- **Moduł administratora:** wszystkie te elementy techniczne konfiguruje się w osobnym module administratora. Administratora nominuje przedsiębiorstwo, które produkuje dany produkt.
- **Zaplecze:** Supabase.

Logowanie, wysyłanie e-maili i integracja z ERP są na liście „Poza prototypem” w części 4: w prototypie ich nie ma, w MVP są.

**Ustalenia właściciela PartPark (2026-11-22):**

- Drugim składnikiem logowania jest aplikacja uwierzytelniająca.
- Konta klientów, właścicieli produktu i administratorów producenta zakłada administrator PartPark.
- Klient widzi produkty tylko wskazanych producentów. Może wysłać do administratora wniosek o nadanie kolejnych uprawnień.
- Gdy serwer pocztowy odrzuci wiadomość, klient dostaje informację, że ma skontaktować się z biurem obsługi klienta i wysłać zapytanie ofertowe na ustalony adres e-mail.
- Formularz zapytania bierze domyślne dane firmy klienta.
- Claude AI generuje modele 3D z rysunków DWG, zdjęć PNG i plików STEP.
- Moduł administratora ma ustawienia dotyczące MFA.
- Dane są przechowywane w Unii Europejskiej.
- Rodzaj serwera pocztowego podaje administrator producenta, największy plik STEP podaje producent, a treść zastrzeżenia cenowego ustala prawnik.
