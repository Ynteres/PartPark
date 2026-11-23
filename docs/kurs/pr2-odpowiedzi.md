# PR2 · Prototyp HTML — klikalna ścieżka i trzy nazwane poprawki

Plik do udostępnienia: `partpark-prototyp.html` (jeden plik, dane syntetyczne w środku, działa bez internetu).

**Jak powstał ten dokument.** Przejście ścieżki i sprawdzenia po poprawkach wykonała przeglądarka testowa: raz jako komputer (1360 × 900, mysz), raz jako telefon (390 × 844, dotyk). To emulacja telefonu, nie prawdziwe urządzenie. Karta P3 każe testować prototyp na komputerze, a telefon sprawdzić dopiero w M5, bo plik HTML otwarty z dysku na telefonie może nie zadziałać. Zanim wkleisz pole 3, powtórz sprawdzenia na komputerze, a wariant dotykowy w emulacji przeglądarki (w Edge: F12, potem Ctrl+Shift+M). Jeśli coś wyjdzie inaczej, popraw opis.

Formuła poleceń „co jest · co ma być · gdzie” pochodzi z treści zadania. Kartę P3 dostałem po wykonaniu poprawek; porównanie jest w tabeli poniżej.

## Zgodność z kartą P3

| Wytyczna z karty P3 | Stan | Co to znaczy dla tego zadania |
|---|---|---|
| Poprawka ma cztery części: co jest, co ma być, gdzie, jak sprawdzę | częściowo | Polecenia mają trzy pierwsze części. Czwarta jest pod każdym poleceniem jako wykonane sprawdzenie. Treści poleceń nie zmieniałem, bo ma być dosłowna |
| Poprawka dotyczy jednego miejsca w prototypie | odstępstwo | Każda z trzech poprawek łączy dwie albo trzy zmiany na jednym ekranie. Poprawki po peer teście warto dzielić na pojedyncze miejsca |
| Poprawka opisuje zachowanie, nie wygląd | tak, z jednym wyjątkiem | W poprawce 2 jest też położenie przycisku (lewy dolny róg viewera) |
| Jedna poprawka na raz, sprawdzona przed następną, zapisana słowo w słowo | tak | Kolejność i sprawdzenia są w polu 3 |
| Wzór to zdjęcie szkicu albo zrzut ekranu, z którego bierze się jedną rzecz | odstępstwo | Wzory były opisami słownymi, bez obrazu. Jeśli masz szkic albo zrzut ekranu, dopisz go w polu 2 |
| Jeden plik HTML, bez bibliotek z internetu i bez serwera | tak, po poprawce | Biblioteki są w pliku. Usunąłem odwołanie do czcionek z internetu: plik otwarty z dysku nie wysyła żadnego zapytania do sieci |
| Dane w samym pliku, bez pamięci przeglądarki i usług zewnętrznych | tak | Nic nie jest zapisywane. Po odświeżeniu prototyp wraca do stanu początkowego |
| Dane syntetyczne: bez imion, nazwisk, adresów, telefonów i nazw firm, role zamiast osób | tak, po poprawce | Producenci nazywają się „Producent A–D”, formularz zapytania ma dane demonstracyjne, a z przykładów w dokumentach zniknęły nazwisko, NIP, telefon i adres |
| Od 15 do 30 rekordów | więcej | 5 produktów, 46 części zamiennych i 33 indeksy biblioteki. Peer test dotyczy jednego produktu |
| Prototyp nie wychodzi ponad brief | do decyzji | Strona główna zniknęła przy zmianie układu, a kroki prototypu odpowiadają ekranom z briefu (K1–K4 i S1–S4). Zostaje ekran „Instrukcje”, którego nie ma w briefie. Albo dopisz go do briefu, albo zgłoś jako poprawkę typu „ponad brief” |
| Prototyp testuje się na komputerze, telefon dopiero w M5 | tak, po poprawce | Pole 4 mówi o komputerze. Sprawdzenia „telefonu” to emulacja w przeglądarce na komputerze. Założenie o technologii z briefu mówi o telefonie testera: w peer teście sprawdzisz je tylko w emulacji, a na prawdziwym telefonie w M5 |
| Test w pięć minut: zadanie jednym zdaniem, tester mówi na głos, autor milczy, jedno pytanie, formularz testera | tak, po poprawce | Pole 4 jest przepisane według tego przebiegu |
| Uwagi o zachowaniu stają się poprawkami, uwagi o guście czekają na M2 | po teście | Do zrobienia po peer teście |

Liczby znaków przy polach są policzone dla tekstu bez znaczników pogrubienia.

## Dziennik przejścia ścieżki (krok 3)

Przejście odbyło się przed rozdzieleniem ścieżek, gdy prototyp miał jedną stronę z przełącznikiem trybu nad modelem.

| Nr | Gdzie | Co się stało | Urządzenie | Decyzja |
|---|---|---|---|---|
| 1 | Start strony | Lista zapytania miała już 2 zaznaczone części i 12 indeksów, zanim cokolwiek kliknąłem | komputer, telefon | Poprawka 1 |
| 2 | Model, pompa | W widoku domyślnym kursor trafiał tylko w korpus i silnik. Wirnik, uszczelnienie i łożysko są w środku. Rozsunięcie włączała ikona 40 × 40 px bez napisu | komputer, telefon | Poprawka 2 |
| 3 | Model, karuzela | Łożysko jest pod tarczą i po rozsunięciu nadal było zasłonięte (wyszło przy sprawdzaniu poprawki 2) | komputer, telefon | Uzupełnienie poprawki 2 |
| 4 | Model, dotyk | Dotknięcie z ruchem palca 11 px nie zaznaczyło części (licznik bez zmian) | telefon | Poprawka 3 |
| 5 | Model, po zaznaczeniu | Szuflada z kompletem zaczynała się na 606. pikselu ekranu o wysokości 844 px, a komunikat z nazwą części znikał po 4,6 s | telefon | Poprawka 3 |
| 6 | Model, przewijanie | Przesuwanie palcem po modelu nie przewija strony (zmiana 0 px). Viewer zajmuje 520 px z 844 px | telefon | Zapisane, bez poprawki. Przycisk „Do zapytania” z poprawki 3 skraca drogę |
| 7 | Katalog | Karty są w jednej kolumnie. Pompa jest piątą kartą, ok. 1 500 px przewijania | telefon | Zapisane, bez poprawki |

Po trzeciej poprawce, przy uzgadnianiu dokumentacji, pasek zaznaczenia dostał atrybut dla czytników ekranu (`role="status"`), bo zastąpił komunikat, który go miał. Tej zmiany nie sprawdzałem czytnikiem ekranu.

### Po trzech poprawkach: rozdzielenie dwóch ścieżek

To zmiana zakresu, a nie czwarta poprawka z przejścia ścieżki, dlatego nie ma jej w polu 3. Polecenie brzmiało: rozgraniczyć dwie ścieżki, jedną dla perspektywy klienta, drugą dla modułu sBoM Studio, który jest dostępny dla właściciela produktu po stronie producenta, odpowiedzialnego za poprawną definicję sBoM i cennik.

Co się zmieniło w prototypie: na górze strony jest przełącznik perspektywy „Klient” / „Producent · sBoM Studio”, który zastępuje logowanie. Każda perspektywa ma własną nawigację i własne ekrany. Przełącznik trybu nad modelem i przycisk „Zobacz sBoM Studio” na stronie głównej klienta zniknęły.

Co sprawdziłem na komputerze i w emulacji telefonu: w perspektywie klienta nie widać żadnego ekranu Studio, a w perspektywie producenta nie ma katalogu, zapytania, instrukcji ani licznika zapytania. Ścieżka producenta przechodzi od importu przykładowego STEP przez zatwierdzenie części do publikacji, a „Zobacz jako klient” otwiera opublikowany produkt w perspektywie klienta. Zmiana perspektywy nie kasuje zaznaczeń klienta. Trzy poprawki z pola 3 działają jak wcześniej.

### Ekran cennika w sBoM Studio

Kolejna zmiana zakresu, też poza polem 3. Polecenie: cenę poglądową ustawia się w edytorze części, a osobny ekran cennika pozwala masowo zaktualizować ceny z pliku CSV, pobrać wzorcowy plik CSV, zapisuje historię cen i pokazuje trend ceny infografiką w trzech stanach: wzrost, stała, spadek. Właściciel produktu widzi całe repozytorium producenta i sam zatwierdza publikację.

Co sprawdziłem na komputerze i w emulacji telefonu:

- wzór CSV pobiera się z 63 indeksami i aktualnymi cenami (średnik, przecinek dziesiętny);
- przykładowy CSV daje podgląd: 9 cen w górę, 5 w dół, 5 bez zmian i 2 wiersze do sprawdzenia (nieznany indeks, błędna cena);
- po publikacji cennik ma wersję 13, kafle trendu pokazują 9 / 49 / 5, a historia indeksu ma nowy wpis ze źródłem;
- plik z przecinkiem jako separatorem i kropką dziesiętną też się wczytuje, plik bez wymaganych kolumn daje komunikat, a plik bez zmian nie pozwala publikować;
- zmiana ceny w edytorze części i publikacja sBoM tworzą kolejną wersję cennika i wpis w historii;
- klient widzi nową cenę i nową datę cen, a ekranu cennika nie widzi.

Historia cen sprzed otwarcia prototypu jest fikcyjna, a zmiany znikają po odświeżeniu strony.

### Po lekturze karty P3: dane syntetyczne i plik z dysku

Cztery zmiany po porównaniu z kartą P3. Nie należą do trzech poprawek z pola 3.

1. **Formularz zapytania (typ: brak danych).** Polecenie w formule karty P3: „Na ekranie „Zapytanie ofertowe”, po kliknięciu „Wyślij zapytanie ofertowe” bez wpisywania danych, widzę błąd i muszę wpisać NIP, osobę, telefon, e-mail i adres. Ma być: formularz startuje z danymi demonstracyjnymi firmy utrzymaniowej (rola zamiast osoby, adres e-mail w domenie .example), więc zapytanie da się wysłać od razu, a tester nie wpisuje prawdziwych danych. Zmień tylko to miejsce. Sprawdzę to tak: otwieram plik, wybieram pompę, zaznaczam wirnik, klikam „Do zapytania” i „Wyślij zapytanie ofertowe” i mam zobaczyć okno potwierdzenia z podglądem PDF.” Sprawdzone: okno potwierdzenia otwiera się bez wpisywania czegokolwiek, a plik XML ma dane demonstracyjne.
2. **Nazwy producentów.** Wymyślone nazwy firm zastąpiły role „Producent A”, „Producent B”, „Producent C” i „Producent D”. Adresy biur obsługi klienta mają domenę `.example`.
3. **Plik z dysku.** Plik samodzielny nie pobiera już czcionek z internetu. Otwarty z dysku przy wyłączonej sieci nie wysłał żadnego zapytania i przeszedł ścieżkę klienta aż do pobrania ZIP.
4. **Przykłady w dokumentach.** W przykładzie XML w specyfikacji i w załączniku ERP były nazwisko, numer NIP wyglądający na prawdziwy, telefon, adres i nazwa instytucji. Zastąpiłem je rolami i danymi demonstracyjnymi.

### Ergonomia: jeden ekran na etap, pasek kroków i pasek akcji

Kolejna zmiana poza polem 3. To przebudowa układu całego prototypu, a nie poprawka jednego miejsca w formule karty P3. Polecenie: ułożyć interfejs tak, żeby na smartfonie aplikacja w miarę możliwości działała w ramach ekranu, bez przewijania, i tak samo na komputerze, a osoba obsługująca zawsze wiedziała, w którym elemencie i na którym etapie procesu jest.

Co się zmieniło w prototypie:

- Strona się nie przewija. Każdy etap jest osobnym ekranem w ramce: nagłówek z przełącznikiem perspektywy, pasek kroków, ekran etapu, pasek akcji.
- Pasek kroków pokazuje cztery kroki ścieżki z numerem, nazwą i stanem na żywo, np. „zaznaczone: 1 · indeksy: 5”. Zrobiony krok ma zielony „ptaszek”, bieżący jest pomarańczowy. Na telefonie zostają numery i wiersz „Krok 2 z 4 · Części”.
- Pasek akcji na dole ma powrót do poprzedniego kroku, stan (liczba części, kwota szacunkowa) i jedną główną akcję: „Dalej: części”, „Dalej: zapytanie”, „Wyślij zapytanie ofertowe”.
- Na wąskim oknie ekran z dwoma panelami pokazuje jeden panel naraz. Przełączają je zakładki: „Model”, „Lista części”, „Zaznaczone” oraz „Pozycje”, „Dane do zapytania”.
- Potwierdzenie zapytania i publikacja sBoM są osobnymi ekranami (krok 4 klienta, krok 3 producenta). Okno potwierdzenia nad stroną i strona główna z hasłem zniknęły: prototyp otwiera się na katalogu.
- Na telefonie katalog jest listą wierszy z miniaturą, a tabele są listami kart.
- Formularz zapytania: pilność jest przełącznikiem w nagłówku formularza, a numer seryjny, wycena wymiany i uwagi są w zwiniętym bloku „Dodatkowe informacje”.

Co sprawdziłem w przeglądarce testowej, w oknach 1366 × 650 i 1680 × 900 (komputer), 820 × 1100 (tablet) oraz 390 × 844 i 360 × 640 (telefon z dotykiem):

- na każdym ekranie obu ścieżek strona nie przewija się w pionie ani w poziomie, a pasek kroków i pasek akcji są w oknie;
- pięć produktów katalogu mieści się bez przewijania we wszystkich pięciu oknach;
- pasek kroków pokazuje właściwy krok i stan po każdej akcji, także po zmianie perspektywy i powrocie;
- sześć pól wymaganych formularza mieści się w oknach 1366 × 650 i 390 × 844; w oknie 360 × 640 formularz przewija się w swojej ramce;
- trzy poprawki z pola 3 działają w nowym układzie;
- obie ścieżki przechodzą do końca, razem z pobraniem ZIP, wzoru CSV i importem cennika, a plik samodzielny otwarty z dysku nie wysyła zapytań do sieci.

Obserwacje 6 i 7 z dziennika przejścia już nie obowiązują: strona się nie przewija, model zajmuje cały ekran zakładki, a pompa jest widoczna w katalogu od razu.

Co zostaje i czego nie sprawdziłem:

- to nadal emulacja, nie prawdziwy telefon; nie wiem, jak ramka zachowa się przy wysuniętej klawiaturze ekranowej;
- listy dłuższe niż okno (lista części, pozycje zapytania, cennik) przewijają się w swojej ramce;
- przy telefonie trzymanym poziomo (okno niższe niż 521 px) ekran znowu się przewija, a nagłówek i pasek akcji są przyklejone do krawędzi;
- czytnikiem ekranu tego układu nie sprawdzałem.

## Pole 1 · Link do prototypu

Tu wklej własny link. Nie mam dostępu do Twojego Dysku Google ani OneDrive, więc ten krok zostaje po Twojej stronie.

1. Prześlij plik `partpark-prototyp.html` na Dysk Google albo OneDrive.
2. Ustaw udostępnianie „każdy, kto ma link” z prawem do wyświetlania.
3. Skopiuj link i wklej go w pierwszym polu.

Dysk Google i OneDrive zwykle nie uruchamiają pliku HTML w podglądzie. Recenzent pobiera plik na komputer i otwiera go dwuklikiem w przeglądarce. Plik nie potrzebuje internetu.

## Pole 2 · Wzór i ścieżka (2949 z 3000 znaków)

**Wzory, które dostał agent** (opisy słowne, bez zdjęcia szkicu)

1. Opis słowny ekranu z modelem 3D (własny). Biorę z niego główny element: model produktu, który można obracać w każdą stronę i przybliżać, a wskazana część zmienia kolor.
2. Lista produktów w internetowym katalogu producenta urządzeń. Biorę kolejność kroków: najpierw wybór produktu z listy, dopiero potem model i części.
3. Przykład kompletu serwisowego opisany słowami: łożysko, a do niego smar, uszczelnienie i śruba zabezpieczająca. Biorę jeden element: listę elementów zależnych, które dobierają się same do wskazanej części.

**Dwie ścieżki.** Prototyp ma dwie perspektywy, przełączane w nagłówku (zastępuje to logowanie). Każda ma cztery kroki, a każdy krok to jeden ekran, który mieści się w oknie bez przewijania strony. Pasek kroków pokazuje, gdzie jestem, a pasek akcji prowadzi dalej.

**Ścieżka klienta, od pierwszego do ostatniego ekranu** (ta idzie do peer testu)

- K1 · Wybór produktu. Klikam kartę produktu w katalogu, np. pompę. Otwiera się krok 2 z modelem tego produktu.
- K2 · Model serwisowy. Na dole viewera jest podpowiedź pierwszego kroku. Klikam lub dotykam części: zmienia kolor na pomarańczowy, elementy zależne podświetlają się na bursztynowo, a w miejscu podpowiedzi pojawia się pasek z nazwą części, ceną poglądową i liczbą pozycji kompletu. „Rozsuń części” odsłania części wewnętrzne. „Komplet” rozwija w pasku listę elementów zależnych. Klikam „Dalej: zapytanie”.
- K3 · Zapytanie ofertowe. Widzę pozycje pogrupowane po producentach, z cenami poglądowymi i zastrzeżeniem, że to nie oferta. Formularz ma dane demonstracyjne, więc od razu klikam „Wyślij zapytanie ofertowe”.
- K4 · Potwierdzenie. Otwiera się ekran z podglądem PDF i XML dla każdego producenta. „Pobierz ZIP (XML + PDF)” zapisuje oba pliki.

**Ścieżka producenta: moduł sBoM Studio** (dla właściciela produktu, który odpowiada za poprawną definicję sBoM i cennik poglądowy)

- S1 · Repozytorium i import. Przełączam perspektywę na „Producent”. Widzę listę modeli serwisowych z wersją i stanem. Klikam „Użyj przykładowego STEP”. Pojawia się log pięciu kroków konwersji i przycisk „Otwórz w sBoM Studio”.
- S2 · Przegląd modelu i sBoM. Klikam element na modelu albo na liście. Otwiera się edytor z propozycją automatu, indeksem, ceną poglądową i kompletem. Klikam „Zatwierdź jako część zamienną”. Element zmienia kolor na zielony. Klikam „Dalej: publikacja”.
- S3 · Publikacja. Ekran pokazuje, ile części trafi do klientów i które ceny się zmieniają. Klikam „Opublikuj sBoM”. Ekran potwierdza wersję, a „Zobacz jako klient” otwiera ten produkt w perspektywie klienta.
- S4 · Cennik poglądowy. Klikam „Użyj przykładowego CSV”. Podgląd pokazuje, ile cen rośnie, spada i zostaje bez zmian. Klikam „Opublikuj cennik”. Kafle trendu (wzrost, stała, spadek) i historia indeksu pokazują nową wersję cennika.

Ścieżki łączy tylko publikacja: klient widzi wyłącznie wersję sBoM i ceny opublikowane w sBoM Studio.

## Pole 3 · Trzy poprawki (4567 z 5000 znaków)

Polecenia mają trzy części z treści zadania: co jest, co ma być, gdzie. Czwartą część z karty P3, jak sprawdzę, podaję pod każdym poleceniem jako wykonane sprawdzenie.

**Poprawka 1 · typ: dane startowe · polecenie**

„Co jest: po otwarciu prototypu lista zapytania ma już dwie zaznaczone części (łożysko karuzeli i wirnik pompy) i 12 indeksów, a otwarta jest zakładka „Zaznaczone”. Tester nie wie, co zaznaczył sam. Co ma być: po otwarciu lista jest pusta (licznik 0, „ok. 0,00 zł”), otwarta jest zakładka „Lista części”, a na dole viewera widać podpowiedź „Kliknij lub dotknij części, aby dodać ją do zapytania”. Podpowiedź znika po pierwszym zaznaczeniu na danym modelu i wraca, gdy nic nie jest zaznaczone. Gdzie: start strony oraz ekran 4 „Model serwisowy” (viewer, szuflada części, licznik w pasku górnym). Nie zmieniaj pozostałych ekranów.”

Sprawdziłem na komputerze i w emulacji telefonu: po otwarciu licznik 0, „ok. 0,00 zł”, zakładka „Lista części”, sekcja zapytania pusta. Podpowiedź jest na dole viewera, znika po zaznaczeniu tarczy karuzeli, wraca po przejściu na krzesło, a w sBoM Studio jej nie ma.

**Poprawka 2 · typ: brakujący krok · polecenie**

„Co jest: w pompie wirnik, uszczelnienie i łożysko są schowane w korpusie, a w widoku domyślnym kursor trafia tylko w korpus i silnik. Rozsunięcie modelu włącza ikona bez podpisu, a na telefonie nie ma dymka z jej nazwą. Wybranie wirnika z listy zaznacza go, ale na modelu nic nie widać. Co ma być: przycisk rozsunięcia ma widoczny napis „Rozsuń części” (po włączeniu „Złóż model”) i leży w lewym dolnym rogu viewera razem z suwakiem. Gdy wybiorę z listy część, której nie widać: jeśli jest tylko zasłonięta, kamera obraca się tak, żeby ją pokazać; jeśli jest w środku, model sam się rozsuwa, kamera przybliża tę część i pojawia się komunikat „Ta część jest wewnątrz. Model został rozsunięty.” Gdzie: ekran 4 „Model serwisowy”: narzędzia viewera i lista części w szufladzie, na komputerze i na telefonie.”

Uzupełnienie po sprawdzeniu: „W karuzeli po rozsunięciu łożysko nadal zasłania tarcza. Rozsuwaj karuzelę w pionie tak, żeby łożysko było widać pod uniesioną tarczą. Nie zmieniaj innych modeli.”

Sprawdziłem na komputerze i w emulacji telefonu: przycisk ma napis, po kliknięciu zmienia się na „Złóż model” i pokazuje suwak. Wirnik pompy wybrany z listy: komunikat, model rozsunięty, wirnik na środku viewera (na komputerze dymek na środku pokazuje „Wirnik Ø160, brąz”, w emulacji telefonu dotknięcie środka odznacza wirnik). Łożysko karuzeli wybrane z listy jest widoczne pod uniesioną tarczą. Silnik pompy, który widać od razu, nie rozsuwa modelu.

**Poprawka 3 · typ: zły skutek kliknięcia · polecenie**

„Co jest: na telefonie dotknięcie części z lekkim ruchem palca (ok. 10 px) obraca model i nic nie zaznacza. Po udanym zaznaczeniu nazwę części widać tylko w komunikacie, który znika po kilku sekundach, a dobrany komplet jest pod modelem, poza ekranem. Krzyżak obrotu zasłania na telefonie dolną część modelu. Co ma być: dotknięcie, które kończy się do 14 px od miejsca startu, liczy się jako zaznaczenie (mysz bez zmian: 6 px). W miejscu podpowiedzi na dole viewera zostaje pasek ostatnio zaznaczonej części: nazwa, indeks, cena poglądowa i „+ N poz. kompletu”, z przyciskami „Cofnij” i „Komplet”. „Komplet” rozwija w pasku listę elementów zależnych z ilościami i przycisk „Do zapytania”. Komunikat „Dodano…” znika, bo zastępuje go pasek. Na ekranach dotykowych krzyżak obrotu jest ukryty. Gdzie: ekran 4 „Model serwisowy”, viewer, na telefonie i na komputerze.”

Sprawdziłem w emulacji telefonu: dotknięcie z ruchem 11 px zaznacza tarczę karuzeli (licznik 0 → 1), ruch 17 px i przeciągnięcie 70 px nie zaznaczają. Pasek mieści się na ekranie i pokazuje „Tarcza platformy… + 4 poz. kompletu”. „Komplet” rozwija 4 pozycje, „Do zapytania” przewija do sekcji zapytania z 7 wierszami, „Cofnij” przywraca licznik 0 i podpowiedź. Krzyżak obrotu jest ukryty. Na komputerze kliknięcie pokazuje ten sam pasek, bez komunikatu. Przy tej poprawce komunikaty na wąskim ekranie dostały pełną szerokość, bo wcześniej łamały się po jednym słowie.

Po trzech poprawkach przeszedłem obie ścieżki jeszcze raz, razem z pobraniem ZIP z plikami XML i PDF.

Po późniejszej zmianie układu (jeden ekran na etap) sprawdziłem trzy poprawki ponownie. Działają jak wyżej, z dwiema różnicami: „Do zapytania” otwiera ekran kroku 3 zamiast przewijać stronę, a licznik zapytania jest w nagłówku.

Uwaga do numeracji: w poleceniach „ekran 4” to numer sprzed rozdzielenia ścieżek. Dziś to ekran K2 „Model serwisowy” na ścieżce klienta.

## Pole 4 · Założenie do peer testu (1604 z 3000 znaków)

**Założenie (z części „co testujemy” briefu):** klient bez podpowiedzi znajdzie i zaznaczy wskazaną część na modelu, zauważy dobrany komplet i zrozumie, że wysyła zapytanie, a ceny są poglądowe.

**Zadanie, czytane raz, jednym zdaniem:** „Jesteś serwisantem, w pompie odśrodkowej uszkodził się wirnik: przygotuj i wyślij do producenta wszystko, czego potrzeba do jego wymiany.”

**Przebieg (test w pięć minut).** Tester otwiera plik na komputerze, w perspektywie klienta, i zaczyna od katalogu produktów. Przez trzy minuty przechodzi prototyp i mówi na głos, co widzi, czego szuka i czego się spodziewa. Ja milczę i zapisuję słowo w słowo miejsca, w których się zatrzymał. Potem tester wypełnia formularz testera, a ja zadaję jedno pytanie o miejsce, w którym się zawahał. Formularz zapytania ma dane demonstracyjne, więc tester nie wpisuje własnych danych. Ścieżki producenta (sBoM Studio) w tym teście nie sprawdzam.

**Po czym poznam, że się nie potwierdziło.** Wystarczy jeden z warunków u co najmniej dwóch z trzech testerów:

- nie zaznaczy wirnika w ciągu dwóch minut od otwarcia modelu pompy;
- na głos albo w formularzu testera powie, że kupił albo zamówił części w pokazanej cenie.

Dodatkowy sygnał, którego nie ma w briefie: tester wyśle zapytanie i ani razu nie wspomni o uszczelnieniu ani o pozostałych pozycjach kompletu.

**Co zapisuję przy każdym testerze:** czas do zaznaczenia wirnika; czy wskazał go na modelu, czy na liście; czy użył „Rozsuń części”; czy otworzył „Komplet”; dosłowne słowa przy każdym zawahaniu. Po teście uwagi o zachowaniu przepiszę na poprawki, a uwagi o wyglądzie odłożę na później.
