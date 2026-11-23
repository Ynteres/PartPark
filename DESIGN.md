# PartPark — design.md

System projektowy aplikacji PartPark w wersji zgodnej ze specyfikacją 2.4 (ramka aplikacji: każdy etap to jeden ekran, który mieści się w oknie na komputerze i na telefonie; pasek kroków i pasek akcji są zawsze widoczne; ekran cennika z trendem cen; dwie rozdzielone perspektywy: klient i moduł sBoM Studio). Źródło: prototyp ([link](https://claude.ai/artifact/WcigZ593MGMhwZZYKV7qMv)). Dotyczy wszystkich ekranów z [specyfikacji](./docs/specyfikacja.md).

## 1. Zasady

1. **Model jest stołem roboczym.** Viewer to główna powierzchnia pracy klienta i producenta. Interfejs wokół niego jest spokojny, a mocne kolory niosą znaczenie.
2. **Pomarańczowy znaczy „do wymiany”.** Akcent jest zarezerwowany dla zaznaczonych części, głównych akcji i licznika zapytania. Modele nie używają czerwieni ani pomarańczu.
3. **Bursztyn znaczy „komplet” albo „czeka na decyzję”.** U klienta to elementy zależne z sBoM, w sBoM Studio propozycje automatu do przeglądu.
4. **Zielony znaczy „zatwierdzone przez człowieka”.** W sBoM Studio tak oznaczone są części zamienne, które trafią do klientów.
5. **Cena nigdy nie stoi sama.** Każda kwota ma dopisek „ok.” albo „poglądowa”, a sumy nazywają się „szacunkowo netto”.
6. **Liczby są narzędziem.** Indeksy w kroju mono, kwoty i ilości z `tabular-nums`, wyrównane do prawej.
7. **Dwie perspektywy, dwie ścieżki.** Klient idzie przez cztery kroki: produkt → części → zapytanie → potwierdzenie. Właściciel produktu po stronie producenta pracuje w module sBoM Studio, też w czterech krokach: repozytorium → przegląd → publikacja → cennik. Perspektywy nie mieszają się na jednym ekranie: klient nie widzi Studio, a w Studio nie ma katalogu, zapytania ani licznika zapytania.
8. **Neutralność branżowa.** Teksty i ikony nie odwołują się do jednej branży. Mówimy „produkt”, „część”, „komplet”, „producent”.
9. **Jeden etap, jeden ekran, jedno okno.** Ekran etapu mieści się w oknie przeglądarki na komputerze i na telefonie, a strona się nie przewija. Przewija się tylko lista, która z natury bywa dłuższa niż okno (katalog, lista części, pozycje zapytania, cennik), i robi to we własnej ramce.
10. **Zawsze wiadomo, gdzie jestem i co dalej.** Trzy stałe elementy odpowiadają na trzy pytania: nagłówek (w czyjej roli pracuję), pasek kroków (na którym etapie jestem i co już jest zrobione), pasek akcji (co mam teraz na liczniku i jaki jest następny krok). Żaden z nich nie znika, gdy przewijam listę.

## 2. Tokeny kolorów

Każdy kolor jest tokenem. Komponenty nie używają wartości literalnych.

| Token | Jasny | Ciemny | Zastosowanie |
|---|---|---|---|
| `--bg` | `#ECEFEA` | `#0F1613` | Tło strony (chłodna szarość z nutą zieleni) |
| `--surface` | `#FFFFFF` | `#17211C` | Karty, szuflada, formularze |
| `--surface-2` | `#E1E6DF` | `#1F2B25` | Hover, tło segmentów i zakładek ekranu, bloki kodu |
| `--ink` | `#16211C` | `#E6EDE8` | Tekst główny, przycisk zapytania, przełącznik perspektywy |
| `--muted` | `#56655D` | `#93A39A` | Tekst drugorzędny, etykiety |
| `--line` | `#C9D2CA` | `#2B3A33` | Obramowania, linie tabel |
| `--accent` | `#FF4A1C` | `#FF6A3D` | Zaznaczenie, CTA, licznik zapytania |
| `--accent-ink` | `#FFFFFF` | `#1A0C06` | Tekst na akcencie |
| `--accent-soft` | `#FFE3D9` | `#3A1E14` | Tło zaznaczonego wiersza, ostrzeżenia w instrukcjach |
| `--leaf` | `#2C7A57` | `#5CC197` | Linki, potwierdzenia, status „część zamienna” |
| `--leaf-soft` | `#D7EBDF` | `#173328` | Tło pigułki statusu i bloków bezpieczeństwa |
| `--kit` | `#B87A00` | `#F2B93B` | Komplet sBoM, status „do przeglądu”, zastrzeżenie cenowe |
| `--kit-soft` | `#FBEFCF` | `#352A10` | Tło przycisku kompletu, propozycji automatu i zastrzeżenia |
| `--danger` | `#B3261E` | `#FF8A80` | Błędy, „Usuń”, „Wyłącz” |
| `--stage-a` / `--stage-b` | `#F7F9F5` / `#DCE3DA` | `#1B2621` / `#111915` | Gradient tła viewera |
| `--paper`, `--paper-ink`, `--paper-line`, `--paper-muted` | `#FFFFFF`, `#16211C`, `#C9D2CA`, `#56655D` | takie same | Podgląd pliku PDF: zawsze jasna kartka, także w ciemnym motywie |

Motyw: domyślnie według `prefers-color-scheme`, z nadpisaniem przez `data-theme="light|dark"` na elemencie głównym.

### 2.1 Kolory w scenie modelu

| Rola | Wartość | Uwagi |
|---|---|---|
| Zaznaczona część (klient) | `#FF4A1C` + emisja 0,3 | Emisja 0,55 przy hover nad zaznaczoną |
| Element zależny z kompletu (klient) | `#E8A317` + emisja 0,22 | Podświetla się sam po zaznaczeniu części nadrzędnej |
| Część pod kursorem (klient) | mieszanie 60% z `#FFD24A` + emisja 0,25 | Tylko elementy wybieralne |
| Izolacja (niezaznaczone) | krycie 0,14, bez zapisu głębi | Elementy niewybieralne |
| Część zamienna (Studio) | `#2E9B6B` | Status `approved` |
| Do przeglądu (Studio) | `#E8A317` | Status `proposed` |
| Wyłączona (Studio) | kolor własny zmieszany w 70% z `#A3ABA7` | Status `excluded` |
| Element edytowany (Studio) | emisja 0,45 w kolorze statusu | |
| Model płaski z PNG | kolor statusu nakładany jako tinta 38–60% na teksturę | Rysunek w tle ma krycie 0,6 i cienką ramkę |
| Podłoże | `#7FA68A`, krycie 0,42 + siatka biegunowa 0,18 | Skalowane do wielkości modelu; ukryte dla modelu płaskiego |

Kolory materiałów pochodzą z pliku GLB. Kolory zaznaczenia, kompletu i statusów zawsze nadpisują materiał. Znaczenie kolorów w scenie opisuje legenda w lewym dolnym rogu viewera, inna dla klienta i inna dla Studio.

### 2.2 Trend ceny

Trend ma trzy stany i występuje tylko w cenniku sBoM Studio. Każdy stan ma własny kształt ikony, słowo i kolor, więc kolor nie jest jedynym nośnikiem informacji.

| Stan | Ikona | Kolor tekstu i ikony | Tło znacznika |
|---|---|---|---|
| wzrost | linia łamana w górę ze strzałką | `--danger` | `--danger` 12% na `--surface` |
| stała | pozioma linia ze strzałką | `--muted` | `--surface-2` |
| spadek | linia łamana w dół ze strzałką | `--leaf` | `--leaf-soft` |

Czerwony przy wzroście i zielony przy spadku to konwencja cenników zakupowych. Nie oznaczają błędu ani zatwierdzenia.

## 3. Typografia

| Rola | Krój | Fallback | Użycie |
|---|---|---|---|
| Display | Bricolage Grotesque 600/800 | Avenir Next, Segoe UI, system-ui | Nagłówki, nazwa marki, sumy |
| Tekst | Figtree 400–700 | Segoe UI, system-ui | Treść, przyciski, formularze |
| Dane | JetBrains Mono 400/600 | ui-monospace, Menlo, Consolas | Indeksy, kody produktów, XML, metadane |

| Poziom | Rozmiar | Grubość | Uwagi |
|---|---|---|---|
| Nazwa kroku (pasek kroków) | 0,9rem | 700 | Pod nią podpis ze stanem: 0,74rem, `--muted` |
| Numer kroku | 0,9rem w kółku 30 px | 800, krój display | Zrobiony krok ma „ptaszek” zamiast numeru |
| Wiersz stanu (telefon) | 0,8rem | 400, początek 700 | „Krok 2 z 4 · Części · zaznaczone: 1” |
| H3 (karta, tytuł ekranu) | 1,15–1,25rem | 700 | Ekrany nie mają dużych nagłówków: nazwę etapu niesie pasek kroków |
| Tekst | 15px, line-height 1,55 | 400 | Maks. ~65 znaków w akapicie |
| Mały | 0,8–0,86rem | 400–600 | Opisy pod nazwą |
| Etykieta (eyebrow) | 0,74rem, wersaliki, odstęp 0,12em | 700 | `--muted` |
| Pigułka statusu | 0,68rem, wersaliki, odstęp 0,04em | 700 | |
| Mono | 0,82em; bloki kodu 0,74rem | 400 | |

Plik PDF zapytania używa osadzonego kroju z polskimi znakami (w prototypie DejaVu Sans, podzbiór łaciński).

## 4. Odstępy, promienie, cienie

- Skala odstępów: 4, 6, 8, 10, 12, 14, 16, 18, 22, 28, 34, 44 px. Grupy rodzeństwa układane `gap`, bez marginesów pojedynczych elementów.
- Margines boczny strony: `max(16px, env(safe-area-inset-*))`. Maks. szerokość treści: 1560 px.
- Promienie: `--r` 14 px (karty, viewer), 8–12 px (pola, wiersze, edytor), 999 px (przyciski, chipy, pigułki).
- Cień tylko przy hover karty produktu, na kartce podglądu PDF, pasku zaznaczenia i toaście. Pozostałe elementy rozdziela obramowanie 1 px `--line`.
- Nagłówek, pasek kroków i pasek akcji sięgają krawędzi okna, a ich treść trzyma margines boczny. Dolny odstęp paska akcji i górny nagłówka uwzględniają `safe-area-inset`.
- Odstęp między kartami na ekranie: 12 px; odstęp sceny od pasków: 12 px.

## 5. Ramka, siatka i punkty przełamania

### 5.1 Ramka aplikacji

Aplikacja jest siatką o wysokości okna (`100dvh`) z czterema wierszami. Strona nie ma własnego przewijania.

| Wiersz | Wysokość | Zawartość |
|---|---|---|
| Nagłówek | 52 px | Marka, przełącznik perspektywy, znacznik „wersja demo”, przycisk zapytania |
| Pasek kroków | 56 px; telefon: ok. 71 px (numery + wiersz stanu) | Cztery kroki bieżącej perspektywy, u klienta przycisk „Instrukcje” |
| Scena | cała reszta (`minmax(0, 1fr)`) | Jeden ekran naraz; karty i listy rozciągają się do wysokości sceny |
| Pasek akcji | 64 px; telefon: ok. 84 px (stan nad przyciskami) | Wstecz, stan, główna akcja ekranu |

Co mieści się w oknie, a co przewija się we własnej ramce:

| Ekran | Zawsze w oknie | Przewija się w ramce |
|---|---|---|
| K1 Produkt | Wyszukiwarka, filtry branż | Karty produktów, gdy jest ich więcej niż mieści okno (pięć produktów demo mieści się bez przewijania); filtry branż w poziomie |
| K2 Części | Model z narzędziami i paskiem zaznaczenia | Lista części, pozycje rozwiniętego kompletu |
| K3 Zapytanie | Przełącznik widoku, suma szacunkowa, zastrzeżenie cenowe; segment pilności i sześć pól wymaganych formularza | Tabela pozycji; formularz po rozwinięciu „Dodatkowych informacji” i na telefonie 360 × 640 |
| K4 Potwierdzenie | Tytuł, przełączniki, przyciski pobierania | Podgląd PDF / XML |
| Instrukcje | Tytuł, „Rozwiń wszystkie” | Lista instrukcji |
| S1 Repozytorium | Nagłówek karty, karta importu | Tabela repozytorium |
| S2 Przegląd | Model, nagłówek i stopka szuflady | Lista elementów z edytorem |
| S3 Publikacja | Kafle, blokada, decyzja | Lista zmian cen, gdy jest długa |
| S4 Cennik | Nagłówek, infografika trendu, filtr | Tabela cennika (nagłówek kolumn przyklejony), podgląd importu |

Układ sprawdzono na oknach: 1366 × 650 i 1680 × 900 (komputer), 820 × 1100 (tablet), 390 × 844 i 360 × 640 (telefon). Stałe elementy ramki zostawiają scenie ok. trzech czwartych wysokości okna: 478 z 650 px na laptopie, 637 z 844 px na telefonie, 433 z 640 px na małym telefonie.

### 5.2 Punkty przełamania

| Szerokość | Układ |
|---|---|
| ≥ 1021 px | Dwa panele obok siebie: model + szuflada 410 px; pozycje zapytania 1,5fr + formularz 1fr; repozytorium 1,6fr + nowy model 1fr. Pasek kroków z nazwą i podpisem każdego kroku |
| ≤ 1020 px | Jeden panel naraz. Panele przełączają zakładki ekranu pod paskiem kroków (6.1); tytuły kart powtarzające nazwę zakładki są ukryte |
| ≤ 860 px | Pasek kroków: same numery połączone linią, pod nimi wiersz stanu „Krok 2 z 4 · Części · …”; przycisk „Instrukcje” jako ikona z licznikiem |
| ≤ 820 px | Przycisk zapytania w nagłówku pokazuje sam licznik indeksów |
| ≤ 760 px albo ekran dotykowy | Viewer bez pada obrotu; pasek zaznaczenia na całą szerokość viewera (odstęp 8 px); po rozwinięciu kompletu legenda, przycisk rozsunięcia i zoom chowają się |
| ≤ 700 px | Tabele repozytorium, cennika i podglądu importu jako wiersze-karty bez nagłówka kolumn; potwierdzenie zapytania przewija się w całości w ramce karty |
| ≤ 640 px | Katalog jako lista wierszy z miniaturą 96 px; tabela pozycji zapytania jako wiersze-karty; bez podpowiedzi gestów w viewerze |
| ≤ 560 px | Nagłówek bez napisu marki i znacznika „wersja demo”; pasek akcji w dwóch wierszach: stan nad przyciskami, „wstecz” jako sama strzałka, główna akcja na resztę szerokości |
| ≤ 520 px | Formularz w jednej kolumnie; podgląd PDF: dane stron jedna pod drugą; kafle trendu cen w układzie pionowym (ikona nad liczbą), bez dopisku „indeksów” |
| ≤ 420 px | Przełącznik perspektywy: „Producent” bez dopisku „· sBoM Studio” |
| 360 px | Minimalna obsługiwana szerokość, bez przewijania w poziomie |

| Wysokość | Układ |
|---|---|
| Viewer niższy niż 440 px | Tryb zwarty viewera (6.5): bez legendy i wiersza z kodem produktu, narzędzia 36 px, pasek zaznaczenia w jednym wierszu |
| Okno ≤ 720 px | Na ekranie zapytania tabela pozycji, suma i zastrzeżenie przewijają się razem w ramce karty |
| Okno ≤ 520 px (telefon trzymany poziomo) | Ramka przestaje być sztywna: strona się przewija, viewer ma 340 px, a nagłówek i pasek akcji są przyklejone do krawędzi okna |

Kolumny siatek mają `minmax(0, 1fr)`, żeby szeroka tabela nie rozpychała ramki. Tabele, które nie zmieniają się w wiersze-karty, przewijają się w poziomie we własnym kontenerze.

## 6. Komponenty

### 6.1 Ramka: nagłówek, pasek kroków, pasek akcji, zakładki ekranu

**Nagłówek** (tło `--bg`, dolna linia `--line`). Od lewej: marka (heksagonalna nakrętka w kolorze akcentu + „Part**Park**”; kliknięcie wraca do pierwszego kroku bieżącej perspektywy), ciemny segment perspektywy „Klient” / „Producent · sBoM Studio”, po prawej znacznik „wersja demo” i w perspektywie klienta przycisk zapytania: „ok. kwota” + licznik indeksów na akcencie. Zmiana perspektywy nie kasuje zaznaczeń klienta ani wersji roboczej, a każda perspektywa pamięta krok, na którym ją zostawiono. W produkcie przełącznik zastępuje logowanie z rolami; w prototypie pozwala przejść obie ścieżki bez kont.

**Pasek kroków** (tło `--surface`, dolna linia `--line`). Odpowiada na pytanie „gdzie jestem i co już zrobiłem”.

| Stan kroku | Kółko z numerem | Tekst |
|---|---|---|
| Zrobiony | Wypełnione `--leaf`, „ptaszek” zamiast numeru | `--ink` |
| Bieżący | Wypełnione `--accent`; krok ma tło `--accent-soft` (na telefonie poświata 4 px wokół kółka) | `--ink` |
| Przed tobą | Obrys 2 px `--line`, numer w `--muted` | `--muted` |
| Niedostępny | Jak „przed tobą”, nazwa z kryciem 0,55, kursor „niedozwolone” | Tylko „Potwierdzenie” przed wysłaniem zapytania |

Kroki łączy linia 2 px: zielona za zrobionym krokiem, szara dalej. Każdy krok ma nazwę i podpis ze stanem na żywo:

| Perspektywa | Kroki | Podpisy |
|---|---|---|
| Klient | 1 Produkt · 2 Części · 3 Zapytanie · 4 Potwierdzenie | nazwa produktu · „zaznaczone: 1 · indeksy: 5” albo „nic nie zaznaczono” · „ok. 1099,40 zł” albo „brak pozycji” · numer zapytania albo „po wysłaniu” |
| Producent · sBoM Studio | 1 Repozytorium · 2 Przegląd · 3 Publikacja · 4 Cennik | nazwa produktu · „do przeglądu: 2” albo „wszystko przejrzane” · „sBoM v4 u klientów”, „zmiany robocze: 1” albo „szkic” · „cennik v12” |

- Krok jest „zrobiony” tylko wtedy, gdy spełnia swój warunek i zrobione są wszystkie kroki przed nim. Pasek nie pokazuje „ptaszka” za luką.
- Kroki są przyciskami: można wrócić i przejść do przodu. Wyjątek: „Potwierdzenie” otwiera się dopiero po wysłaniu zapytania.
- Zmiana zaznaczenia po wysłaniu zapytania unieważnia potwierdzenie: krok 4 wraca do stanu „po wysłaniu”.
- Poniżej 861 px nazwy kroków chowają się. Zostają numery z linią, a pod nimi wiersz stanu: „**Krok 2 z 4 · Części** · zaznaczone: 1 · indeksy: 5”.
- „Instrukcje” (tylko klient) to przycisk pomocniczy po prawej stronie paska, poza numeracją, z licznikiem zaznaczonych części. Otwarty ma tło `--ink`, a wiersz stanu pokazuje „Instrukcje wymiany · nazwa produktu”. „Wróć” w pasku akcji wraca do kroku, z którego otwarto instrukcje.

**Pasek akcji** (tło `--surface`, górna linia `--line`). Odpowiada na pytanie „co mam na liczniku i co dalej”. Od lewej: przycisk „wstecz” z nazwą poprzedniego kroku (Secondary), stan w dwóch wierszach (pogrubiony i `--muted`, oba obcinane wielokropkiem), jedna główna akcja ekranu (Primary). Główna akcja jest zawsze w prawym dolnym rogu okna, a na telefonie zajmuje szerokość pod kciukiem.

| Ekran | Wstecz | Stan | Główna akcja |
|---|---|---|---|
| K1 Produkt | — | „Wybierz produkt z katalogu” · otwarty: nazwa | „Dalej: części →” |
| K2 Części | ← Produkt | „Zaznaczone: N · indeksy: N” · szacunkowo netto ok. kwota · ceny poglądowe. Pusty: „Zaznacz uszkodzoną część” | „Dalej: zapytanie →” (nieaktywna bez zaznaczenia) |
| K3 Zapytanie | ← Części | „Szacunkowo netto ok. kwota” · indeksy, zapytania, „ceny poglądowe, to nie oferta” | „Wyślij zapytanie ofertowe” (nieaktywna bez pozycji) |
| K4 Potwierdzenie | ← Zapytanie | „Zapytanie RFQ-…” · ostateczną ofertę prześle biuro obsługi klienta | „Nowe zapytanie” (Secondary) |
| Instrukcje | ← Wróć | „Instrukcje wymiany” · dla zaznaczonych części: N | — |
| S1 Repozytorium | — | „Otwarty model: nazwa” | „Dalej: przegląd →” |
| S2 Przegląd | ← Repozytorium | nazwa produktu · do przeglądu: N · zmiany robocze: N | „Dalej: publikacja →” |
| S3 Publikacja | ← Przegląd | nazwa produktu · co blokuje publikację albo co zobaczą klienci | „Opublikuj sBoM vN”; po publikacji „Zobacz jako klient” |
| S4 Cennik | ← Publikacja | „Cennik vN · obowiązuje od DATA” | — |
| S4 Cennik, podgląd importu | ← Anuluj import | „Podgląd importu: plik” · wzrost N · spadek N · bez zmian N · jeszcze nic nie zapisano | „Opublikuj cennik vN” |

Nieaktywna główna akcja ma dymek z powodem, np. „Najpierw zaznacz co najmniej jedną część”.

**Zakładki ekranu** (tylko ≤ 1020 px): segment jasny na całą szerokość, pod paskiem kroków. Pokazują jeden panel ekranu naraz, żeby ekran mieścił się w oknie telefonu.

| Ekran | Zakładki |
|---|---|
| K2 Części | Model · Lista części · Zaznaczone N |
| K3 Zapytanie | Pozycje · Dane do zapytania |
| S1 Repozytorium | Repozytorium · Nowy model |
| S2 Przegląd | Model · Elementy N |

Aplikacja sama przełącza zakładkę, gdy wymaga tego akcja: błąd w formularzu otwiera „Dane do zapytania”, a wybór produktu, „Otwórz” w repozytorium i „Pokaż na modelu” otwierają „Model”.

### 6.2 Przyciski

| Wariant | Wygląd | Użycie |
|---|---|---|
| Primary | Tło `--accent`, tekst `--accent-ink`, pigułka, 11×18 px | Jedna główna akcja ekranu, zawsze w pasku akcji: „Dalej: zapytanie →”, „Wyślij zapytanie ofertowe”, „Opublikuj sBoM v5”, „Opublikuj cennik v13”. W treści ekranu tylko decyzja o propozycji automatu („Zatwierdź jako część zamienną”) |
| Secondary | Obrys 1,5 px `--ink`, przezroczysty | Akcje drugorzędne; „wstecz” w pasku akcji |
| Small | 7×12 px, obrys 1 px | W kartach, szufladzie i Studio |
| Link | Tekst `--leaf`, podkreślenie z odstępem 3 px | Akcje w karcie części i edytorze |
| Link danger | Tekst `--danger` | „Usuń”, „Wyłącz z części zamiennych”, „Usuń obszar” |
| Tool (viewer) | 40×40 px, promień 11 px, tło `--surface` 92% z rozmyciem; aktywny = `--ink` | Toolbar viewera, z dymkiem po lewej |
| Tool z napisem (viewer) | Pigułka, wysokość 40 px, obrys 1,5 px `--ink`, ikona 18 px + napis 0,86rem 700; aktywny = tło `--ink`, tekst `--bg` | „Rozsuń części” / „Złóż model”. Akcja, której klient potrzebuje, żeby trafić w część, nie może być samą ikoną |

Stany: hover (jaśniej / `--surface`), fokus = obrys 3 px `--accent` z odstępem 2 px, wyłączony = krycie 0,45.

### 6.3 Chip filtra i przełączniki segmentowe

- **Chip:** pigułka z obrysem `--line`; aktywny (`aria-pressed="true"`) = tło `--ink`, tekst `--bg`. W Studio chip ma licznik elementów.
- **Segment jasny:** tło `--surface-2`, aktywna opcja na `--surface` z lekkim cieniem. Zakładki ekranu, widok pozycji zapytania, format załącznika, zakładki producentów w potwierdzeniu.
- **Segment perspektywy (ciemny):** tło `--ink`, aktywna opcja na `--accent`. Tylko przełącznik „Klient / Producent · sBoM Studio” w nagłówku.
- **Segment wyboru w formularzu:** ten sam wygląd co segment jasny, ale zbudowany z pól radiowych (pilność zapytania); fokus klawiatury = obrys 3 px akcentu.
- Rząd chipów, który nie mieści się w szerokości (branże w katalogu, filtr elementów w Studio), przewija się w poziomie w jednym wierszu i nie zawija się, żeby nie zabierać wysokości.

### 6.4 Karta produktu

Miniatura 3:2 renderowana z modelu (dla PNG: sam obraz) na gradiencie sceny. Pod nią nazwa, producent i branża, kod (mono) oraz wersja i data sBoM, a na dole „Otwórz model →” w `--leaf`. Aktywna karta: obrys `--accent` + poświata 3 px `--accent-soft`. Plakietki w prawym górnym rogu: liczba zaznaczeń (akcent) i „nowa wersja sBoM” (`--leaf`) po publikacji. Kliknięcie karty otwiera produkt i przechodzi do kroku 2.

Poniżej 641 px karta jest wierszem: miniatura 96 px po lewej, obok nazwa, producent i branża, kod oraz wersja i data sBoM. Wiersz nie ma napisu „Otwórz model →”, bo cały jest przyciskiem. Dzięki temu pięć produktów mieści się na ekranie telefonu bez przewijania.

### 6.5 Viewer

- Tło: gradient radialny `--stage-a` → `--stage-b`, obramowanie `--line`, promień `--r`.
- Rozmiar: viewer wypełnia całą wysokość sceny. Na komputerze stoi obok szuflady, na telefonie zajmuje cały ekran zakładki „Model”.
- Lewy górny róg: nazwa produktu, kod z wersją sBoM i datą cen (w Studio: „wersja robocza”).
- Prawy górny róg: toolbar w kolumnie: autoobrót, izolacja, reset, odznacz. W Studio izolacja i odznaczanie są ukryte.
- Lewy dolny róg, od góry: przycisk „Rozsuń części” (po włączeniu „Złóż model” i suwak 20–160% obok), legenda kolorów zależna od perspektywy, podpowiedź gestów (ukryta poniżej 640 px). Na ekranach dotykowych legenda nie pokazuje pozycji „pod kursorem”.
- Prawy dolny róg: pad obrotu 3×3 i kolumna zoomu. Na ekranach dotykowych i przy szerokości ≤ 760 px pad jest ukryty, zostaje zoom.
- Dół, na środku: pasek zaznaczenia (tylko perspektywa klienta). Gdy pasek jest widoczny, oba dolne rogi podnoszą się o jego wysokość.
- Dymek przy kursorze: tło `--ink`, tekst `--bg`. Klient: nazwa, indeks, „ok. cena”, stan zaznaczenia, liczba pozycji kompletu. Studio: nazwa, indeks, status i pewność propozycji.
- Kursor: `pointer` nad elementem wybieralnym, `grab` poza nim, `crosshair` przy narzędziu zaznaczania obszaru.
- Kadrowanie: w wąskim, wysokim viewerze (telefon) kamera odsuwa się proporcjonalnie, żeby model mieścił się na szerokość.
- Rozstrzał: części odsuwają się według wektorów z modelu; po zmianie kamera kadruje cały model. Wektory dobiera się tak, żeby każdą część zamienną było widać przynajmniej z jednego kierunku (np. karuzela rozsuwa się w pionie, żeby odsłonić łożysko pod tarczą).
- Odsłanianie części wybranej z listy: aplikacja sprawdza, czy część widać z bieżącego kierunku, potem z kierunków wzorcowych. Jeśli tak, kamera obraca się i przybliża. Jeśli nie, model sam się rozsuwa i dopiero wtedy kamera przybliża część.
- Gest zaznaczenia: mysz = puszczenie przycisku do 6 px od miejsca naciśnięcia; dotyk = do 14 px, bez limitu czasu. Dalszy ruch to obrót modelu. Część wskazuje punkt pierwszego dotknięcia, a nie punkt puszczenia, więc drobny ruch palca nie przenosi zaznaczenia na sąsiednią część.
- Tryb zwarty (viewer niższy niż 440 px, np. telefon 360 × 640): bez legendy i wiersza z kodem produktu, nazwa produktu w jednym wierszu, przyciski narzędzi i zoomu 36 px, pasek zaznaczenia w jednym wierszu z tekstem obcinanym wielokropkiem, lista kompletu do 92 px. Model zostaje widoczny między nakładkami.
- Model płaski z PNG: rysunek jako półprzezroczysta kartka z ramką, obszary części jako wycinki z cienkim obrysem; kamera patrzy prawie na wprost.
- Fokus klawiatury na całym viewerze z widocznym obrysem; skróty opisane w `aria-label`.
- Stan „brak WebGL”: komunikat w miejscu sceny i odesłanie do listy części.

**Pasek zaznaczenia** (dół viewera, szerokość do 500 px, tło `--surface` 95% z rozmyciem, obrys `--line`, promień 14 px, cień):

- **Podpowiedź** (nic nie zaznaczono na tym modelu): obrys przerywany, bez cienia, ikona w akcencie i tekst `--muted` 600: „Kliknij lub dotknij części, aby dodać ją do zapytania”.
- **Ostatnio zaznaczona część:** kwadrat 10 px w akcencie, nazwa (pogrubiona), pod nią indeks (mono), „ok. cena” i „+ N poz. kompletu” w `--kit`; po prawej przyciski Small „Cofnij” i „Komplet”. Poniżej 760 px przyciski schodzą do drugiego wiersza, wyrównane do prawej.
- **Rozwinięty komplet:** lista pozycji (nazwa, ilość; odznaczone przekreślone w `--muted`), maks. 132 px wysokości z własnym przewijaniem; stopka: „Część z kompletem: ok. kwota” i przycisk „Do zapytania →”.
- Pasek ma `aria-live="polite"`, nie znika sam i zastępuje komunikat o dodaniu części.

### 6.6 Szuflada klienta

Zakładki „Lista części” i „Zaznaczone” z licznikiem (szary przy 0, akcent przy > 0). Lista przewija się w ramce szuflady. Poniżej 1021 px zakładki szuflady znikają, a ich rolę przejmują zakładki ekranu. Szuflada nie ma stopki: sumę szacunkową i przejście do zapytania niesie pasek akcji.

**Wiersz części:** pole wyboru 20 px (zaznaczone = akcent z „ptaszkiem”), nazwa, indeks i „ok. cena” pod spodem, znacznik `+N kit` w kolorach kompletu. Zaznaczony wiersz: obrys i tło akcentu. Wiersz elementu zależnego od zaznaczonej części: obrys `--kit`, tło `--kit-soft` i dopisek „w komplecie zaznaczonej części”.

### 6.7 Karta zaznaczonej części

Nazwa, indeks, produkt, „ok. cena”; licznik ilości (pigułka −/+); przycisk kompletu z przerywanym obrysem `--kit` („Komplet sBoM · 4/4 poz. · ok. 409,40 zł”); lista pozycji kompletu z polem wyboru, nazwą, indeksem i etykietami: „wymagane” (`--kit`), „zalecane” (`--muted`), „element modelu” (`--leaf`), „zaznaczona osobno” (`--muted`, pole wyłączone). Część bez kompletu ma zdanie „Ta część nie wymaga elementów dodatkowych”. Akcje-linki u dołu.

### 6.8 Tabela zapytania

Nagłówki w wersalikach 0,7rem, `--muted`. Wiersz producenta: krój display, dolna linia 2 px `--ink`, obok adres BOK. Wiersz produktu: nazwa, kod i wersja sBoM w `--muted`. Wiersz części: tło `--accent-soft`, lewy pasek 3 px `--accent`, znacznik „część”. Wiersz kompletu: lewy pasek 3 px `--kit`, wcięcie 18 px, znacznik „kit”. Kolumna kwot nazywa się „Wartość poglądowa”.

Podsumowanie: maks. 360 px, wyrównane do prawej; przy kilku producentach suma każdego z nich, potem „Szacunkowo netto” w kroju display 1,35rem nad linią 2 px i wiersz „N indeksów · N zapytań · bez VAT i dostawy”.

**Zastrzeżenie cenowe:** blok pod sumą z lewym paskiem 3 px `--kit` na `--kit-soft`, ikona informacji, pierwsze zdanie pogrubione. Poniżej 641 px zostaje samo pierwsze zdanie.

Suma i zastrzeżenie stoją pod tabelą i nie przewijają się razem z nią: przy długiej liście klient cały czas widzi kwotę szacunkową i to, że nie jest ofertą. Wyjątek: okno niższe niż 721 px, gdzie przewijają się razem.

**Telefon (≤ 640 px):** tabela staje się listą wierszy-kart bez nagłówka kolumn. Pierwszy wiersz karty: znacznik „część” albo „kit”, nazwa, kwota. Drugi: indeks i „× ilość”.

### 6.9 Formularz zapytania

Formularz jest ułożony tak, żeby sześć pól wymaganych mieściło się w oknie bez przewijania: na laptopie 1366 × 650 i na telefonie 390 × 844.

- **Wiersz nagłówka:** tytuł „Dane do zapytania” (ukryty, gdy tę nazwę nosi zakładka ekranu) i segment pilności „Standard” / „Pilne (produkt wyłączony)”. Segment zastąpił dwie karty radiowe, które zajmowały osobny wiersz.
- **Zdanie o danych:** „**Dane demonstracyjne.** Nie podawaj prawdziwych danych osób ani firm.”, jeden wiersz, 0,8rem, `--muted`; na wąskim ekranie skrócone do „Dane demo. Nie podawaj prawdziwych danych.”
- **Pola wymagane:** Firma, Osoba kontaktowa, NIP, Telefon (dwie kolumny), E-mail i Adres dostawy (cała szerokość). Na telefonie Firma i Osoba kontaktowa zajmują całą szerokość, a NIP i Telefon dzielą jeden wiersz.
- **Pole:** etykieta nad polem (0,8rem, 600, `--muted`), tło `--bg`, promień 10 px, fokus = obrys 2 px akcentu. Na komputerze przy oknie niższym niż 701 px pola mają mniejszy odstęp wewnętrzny (8 px).
- **Dodatkowe informacje (opcjonalnie):** blok zwinięty z numerem seryjnym, prośbą o wycenę wymiany przez serwis i uwagami. Po rozwinięciu formularz przewija się w ramce karty tak, żeby blok był widoczny.
- **Błędy:** obrys `--danger` po interakcji (`:user-invalid`) i komunikat nad polami mówiący, które pola uzupełnić; na wąskim ekranie aplikacja sama otwiera zakładkę „Dane do zapytania”.
- Formularz nie ma własnego przycisku wysyłki: główna akcja „Wyślij zapytanie ofertowe” jest w pasku akcji, widoczna z obu zakładek.
- Na telefonie 360 × 640 pola wymagane nie mieszczą się w oknie i formularz przewija się w ramce karty.

### 6.10 Instrukcja (akordeon)

Nagłówek: kwadrat 40 px w `--leaf-soft` z końcówką indeksu, tytuł, produkt · czas · liczba osób, strzałka. Treść: numerowane kroki (kółko 26 px) i kolumna 300 px z polami: narzędzia, momenty, pozycje z kompletu. Ostrzeżenie: lewy pasek akcentu na `--accent-soft`. Nad listą blok „Przed każdą wymianą” w `--leaf-soft` z ikoną tarczy. Instrukcje są ekranem pomocniczym poza numeracją kroków; lista przewija się w ramce ekranu.

### 6.11 Komunikaty i potwierdzenie zapytania

- **Toast:** u góry sceny, tuż pod paskiem kroków, żeby nie zasłaniał paska akcji ani paska zaznaczenia. Tło `--ink`, szerokość dopasowana do treści (maks. 560 px, na telefonie do 12 px od krawędzi), opcjonalna akcja w pigułce akcentu („Pokaż model”, „Zobacz jako klient”, „Otwórz”), `role="status"`. Znika po 4,6 s albo przy zmianie kroku. Zaznaczenie części nie wywołuje toastu, bo pokazuje je pasek zaznaczenia. Toast informuje o tym, co aplikacja zrobiła sama: „Część była zasłonięta. Widok został obrócony.”, „Ta część jest wewnątrz. Model został rozsunięty.”
- **Potwierdzenie zapytania (ekran K4, krok 4):** karta na całą scenę, bez okna modalnego. Zielone kółko z „ptaszkiem”, tytuł z numerem albo liczbą zapytań, zdanie o tym, co dzieje się dalej. Wiersz przełączników: zakładki producentów (gdy zapytań jest kilka), „Podgląd PDF / XML”, po prawej „Pobierz ZIP (XML + PDF)” (Primary mały), „Pobierz PDF”, „Kopiuj XML”. Pod nim wiersz „Do / kopia / załączniki”. Podgląd przewija się w ramce karty. W pasku akcji: „← Zapytanie” i „Nowe zapytanie”.
- **Podgląd PDF:** jasna kartka na tokenach `--paper-*` z cieniem, układ jak w pliku: tytuł i numer, zamawiający i adresat w dwóch kolumnach, tabela pozycji, suma, zastrzeżenie.
- **Podgląd XML:** blok kodu mono 0,74rem na `--surface-2`, przewijany.
- **Stan pusty:** ikona konturowa 46 px, krótki tytuł, jedno zdanie, co zrobić, i ewentualnie przycisk.

### 6.12 sBoM Studio

sBoM Studio to osobny moduł dla właściciela produktu po stronie producenta. Jest widoczny tylko w perspektywie „Producent · sBoM Studio” i ma cztery ekrany, po jednym na krok paska kroków: Repozytorium, Przegląd, Publikacja, Cennik.

**S1 Repozytorium** (dwa panele: „Repozytorium” i „Nowy model”):

- **Repozytorium:** karta z tytułem „Repozytorium modeli serwisowych” i jednym zdaniem o roli właściciela produktu. Tabela z przyklejonym nagłówkiem: produkt (nazwa, producent, kod), źródło, wersja z datą, liczba części, liczba propozycji do przeglądu, stan jako pigułka („opublikowany” zielona, „zmiany robocze” bursztynowa, „szkic” szara), przycisk „Otwórz”. Poniżej 701 px wiersz-karta: nazwa z kodem i skrótem danych pod spodem, po prawej stan i „Otwórz”.
- **Nowy model:** karta importu z dwoma przyciskami (STEP, PNG / JPG), linkami do plików przykładowych i numerowanym logiem kroków konwersji, zakończonym przyciskiem Primary „Otwórz w sBoM Studio”. Pod nią dwie karty rozwijane, domyślnie zwinięte: „Jak powstaje model serwisowy” (Import, Konwersja, Propozycje automatu, Przegląd człowieka, Publikacja) i „Format zapisu modelu serwisowego” (pliki paczki wersji z jednym zdaniem o każdym). Treści pomocnicze nie zabierają miejsca, dopóki nikt ich nie otworzy.

**S2 Przegląd** (ten sam viewer co u klienta, z szufladą Studio zamiast listy części; bez paska zaznaczenia, izolacji i odznaczania):

- **Nagłówek szuflady:** nazwa produktu, producent, źródło, opublikowana wersja albo „szkic”; chipy filtra z licznikami w jednym wierszu (Wszystkie, Do przeglądu, Części, Wyłączone); dla modelu z PNG przycisk „+ Zaznacz obszar części”, który w trakcie pracy staje się Primary z tekstem „Przeciągnij prostokąt na rysunku…”.
- **Wiersz elementu:** kropka statusu 10 px, nazwa, pod nią indeks (mono), cena i liczba pozycji kompletu, po prawej pigułka statusu. Otwarty wiersz ma obrys `--ink`.
- **Edytor elementu** (rozwija się pod wierszem):
  - propozycja automatu: blok na `--kit-soft` z pewnością w procentach, uzasadnieniem i akcjami „Zatwierdź jako część zamienną” (Primary) i „Odrzuć”;
  - część zatwierdzona: pigułka „zatwierdzona przez człowieka” i link „Wyłącz z części zamiennych”;
  - pola: nazwa, indeks serwisowy, cena poglądowa netto;
  - komplet: wiersze z nazwą, indeksem, ilością na część, wyborem „wymagane / zalecane” i usuwaniem; element modelu ma etykietę w `--leaf`;
  - dodawanie: lista wyboru z dwiema grupami („Elementy tego modelu”, „Biblioteka indeksów serwisowych”) i rozwijany formularz „Dodaj indeks ręcznie”;
  - rozwijany podgląd metadanych węzła GLB w bloku kodu.
- **Stopka szuflady:** „do przeglądu: N · zmiany robocze: N” i jedno zdanie o tym, co blokuje publikację albo co zobaczą klienci. Stopka nie ma przycisku publikacji: do kroku 3 prowadzi „Dalej: publikacja →” w pasku akcji.

Zmiana pola w edytorze nie przebudowuje listy: aktualizuje wiersz, stopkę, pasek kroków i pasek akcji w miejscu, żeby następne kliknięcie nie trafiło w wymieniony element.

**S3 Publikacja** (jedna karta, osobny ekran decyzji):

- **Nagłówek:** etykieta „Publikacja wersji sBoM”, nazwa produktu, producent, kod i to, co dziś widzą klienci („u klientów: sBoM v4 z DATA” albo „szkic, jeszcze nieopublikowany”).
- **Trzy kafle** w jednym rzędzie, z liczbą w kroju display 1,5rem: „Części zamienne” (trafią do klientów; obrys i nazwa w `--leaf`), „Do przeglądu” (nie trafią do klientów; nazwa w `--kit`), „Wyłączone” (widoczne, niewybieralne).
- **Blokada:** blok z lewym paskiem 3 px `--danger`: „Publikacja jest zablokowana.”, lista zatwierdzonych części bez indeksu i link „Wróć do przeglądu”.
- **Zmiany cen w tej publikacji:** lista: indeks (mono), nazwa, cena przed → cena po, znacznik trendu; nowy indeks ma znacznik „nowy indeks”. Bez zmian: „Bez zmian cen.”
- **Zdanie o odpowiedzialności:** „Publikację zatwierdza właściciel produktu. Klienci zobaczą wersję od razu, a zmiany cen trafią do historii cennika.”
- **Główna akcja** jest w pasku akcji: „Opublikuj sBoM vN”, nieaktywna z dymkiem o powodzie, gdy nie ma czego publikować albo publikacja jest zablokowana.
- **Po publikacji:** zielony blok na `--leaf-soft` z „ptaszkiem”: „Opublikowano sBoM vN.”, na dole karty przyciski „Wróć do repozytorium” i „Przejdź do cennika”, a główna akcja zmienia się na „Zobacz jako klient” (przełącza perspektywę i otwiera ten produkt).

**S4 Cennik** (jedna karta na całą scenę):

- **Nagłówek karty:** „Cennik vN · obowiązuje od DATA”, pod spodem liczba indeksów, waluta i wersja, do której odnosi się trend. Po prawej „Importuj CSV”, „Pobierz wzór CSV” (Small) i link „Użyj przykładowego CSV”. Opis formatu pliku jest zwinięty pod napisem „Format pliku CSV i zasady”.
- **Infografika trendu:** trzy kafle w jednym rzędzie: wzrost, stała, spadek. Kafel ma ikonę stanu na kolorowym tle, liczbę indeksów w kroju display, nazwę stanu w kolorze stanu i udział w procentach. Pod kaflami pasek udziałów 8 px w trzech kolorach. Kafel jest przyciskiem filtra (`aria-pressed`): wybrany ma obrys `--ink`, drugie kliknięcie zdejmuje filtr.
- **Filtr:** wyszukiwarka „Indeks, nazwa lub produkt”, licznik „Pokazano N z M” i link „Pokaż wszystkie”.
- **Tabela** (przewija się w ramce karty, nagłówek kolumn przyklejony): indeks (mono, bez łamania), nazwa z produktem albo „Biblioteka indeksów” pod spodem, cena poglądowa netto (pogrubiona, do prawej), znacznik trendu, poprzednia cena (`--muted`), link „Historia”. Poniżej 701 px wiersz-karta: nazwa i cena w pierwszym wierszu, indeks, znacznik trendu i „Historia” w drugim; poprzednią cenę pokazuje historia.
- **Znacznik trendu:** pigułka z ikoną, słowem „wzrost”, „stała” albo „spadek” i zmianą w procentach ze znakiem. Indeks dodany w bieżącej wersji ma szary znacznik „nowy indeks”.
- **Historia indeksu** (wiersz rozwijany na `--surface-2`): wykres schodkowy 190 × 46 px w `--ink` i lista wpisów od najnowszego: wersja cennika, data, cena, źródło, znacznik trendu względem poprzedniego wpisu.
- **Podgląd importu** to osobny tryb ekranu: zastępuje infografikę, filtr i tabelę, żeby mieścił się w oknie i żeby było jasne, że trwa niezapisana operacja. Blok na `--kit-soft` z obrysem `--kit`: nazwa pliku i zdanie „Nic nie zostało jeszcze zapisane.”, trzy znaczniki z liczbami (wzrost, bez zmian, spadek), pigułka „N do sprawdzenia”, tabela zmian (indeks, nazwa, było, będzie, zmiana), lista wierszy do sprawdzenia z numerem wiersza i powodem. Decyzja jest w pasku akcji: „← Anuluj import” i „Opublikuj cennik vN”. Przy błędzie pliku blok pokazuje powód, a pasek akcji ma tylko „← Zamknij”.
- Po publikacji komunikat podaje wersję cennika oraz liczbę wzrostów i spadków i ma akcję „Zobacz jako klient”.

### 6.13 Panel integracji ERP (moduł opcjonalny N6)

Dotyczy modułu z [zalacznik-erp-api.md](./docs/zalacznik-erp-api.md).

- **Edytor mapowania:** trzy kolumny na szerokości ≥ 1021 px: model kanoniczny PartPark (drzewo pól, krój mono), reguły (karta reguły: źródło, transformacja, słownik, wartość domyślna), pola ERP (drzewo ze schematu, pola wymagane z gwiazdką). Poniżej 1021 px kolumny stają się zakładkami.
- **Stan reguły:** zmapowane = pasek 3 px `--leaf`; wymagane bez reguły = pasek `--danger` i licznik w nagłówku; ostrzeżenie = pasek `--kit`.
- **Podgląd:** dwa bloki kodu obok siebie (przed i po mapowaniu), krój mono, podświetlenie wiersza wybranego pola w obu blokach.
- **Monitor:** tabela z kolumnami czas, zdarzenie, połączenie, wersja mapowania, status (pigułka), próby; wiersz rozwija trzy bloki: kanoniczny, po mapowaniu, odpowiedź ERP.

## 7. Ruch

- Przejścia kamery: 550 ms, wygaszanie sześcienne. Rozstrzał: interpolacja 12% na klatkę, potem kadrowanie kamery.
- Hover karty: przesunięcie −2 px, 150 ms (nie na telefonie). Toast: wjazd z góry sceny, 300 ms z lekkim odbiciem.
- Zmiana kroku: natychmiastowa podmiana ekranu, bez animacji przejścia. Ruch na ekranie zostaje zarezerwowany dla modelu.
- Log importu: kolejne kroki pojawiają się co ok. 0,4 s.
- `prefers-reduced-motion`: bez animacji kamery, rozstrzału, logu i przewijania; zmiany natychmiastowe.

## 8. Dostępność

- Kontrast tekstu ≥ 4,5:1 w obu motywach; akcent na `--surface` używany dla tekstu tylko w rozmiarze ≥ 18,66 px pogrubionym.
- Każdy przycisk-ikona ma `aria-label`; przełączniki mają `aria-pressed`, zakładki `role="tab"` i `aria-selected`, wiersze Studio `aria-expanded`.
- Pasek kroków to `nav` z listą numerowaną. Bieżący krok ma `aria-current="step"`, a etykieta kroku mówi całość: „Etap 2 z 4: Części. zaznaczone: 1 · indeksy: 5”; zrobiony krok ma dopisek „Gotowe”. Stan kroku niosą razem kolor, „ptaszek” albo numer i podpis.
- Po zmianie kroku fokus przechodzi na nowy ekran, a ekran ma własną etykietę dostępności.
- Model ma równoważną ścieżkę bez myszy: lista części u klienta, lista elementów w Studio i skróty klawiaturowe viewera.
- Kolor nigdy nie jest jedynym nośnikiem informacji: zaznaczenie = kolor + pole wyboru + lista; komplet = kolor + etykieta; status w Studio = kolor + pigułka z tekstem + legenda; trend ceny = kolor + kształt ikony + słowo.
- Cele dotykowe ≥ 36×36 px (pad, zoom, narzędzia w trybie zwartym), ≥ 40×40 px (toolbar, „Rozsuń części”); przyciski paska akcji mają ok. 46 px wysokości.
- Główna akcja ekranu jest na telefonie w zasięgu kciuka (pasek akcji na dole), a przełącznik perspektywy, który zmienia kontekst pracy, jest od niej odsunięty (nagłówek na górze).
- Dotyk: żadna funkcja nie zależy od dymka przy kursorze. Nazwę, indeks i cenę zaznaczonej części pokazuje pasek zaznaczenia, a akcje potrzebne do wskazania części mają napis.
- Pola edytora i formularza mają stałe `id` i etykiety.

## 9. Treść i język

- Polski, bezpośrednio, w drugiej osobie: „Zaznacz część”, „Do zapytania”.
- Przyciski mówią, co się stanie: „Wyślij zapytanie ofertowe”, „Zatwierdź jako część zamienną”, „Opublikuj sBoM v5”, „Pobierz ZIP (XML + PDF)”.
- Nie używamy słów „zamów”, „kup”, „koszyk”, „do zapłaty”. Klient wysyła zapytanie, a ofertę przesyła biuro obsługi klienta.
- Ceny: zawsze „ok. 412,00 zł”, „cena poglądowa”, „szacunkowo netto”. Zastrzeżenie cenowe ma jedną, stałą treść.
- Błędy mówią, co poprawić, bez przeprosin: „Uzupełnij pola: firma, NIP (10 cyfr)…”, „Najpierw wpisz indeks serwisowy tej części”.
- Propozycje automatu zawsze mają pewność i uzasadnienie jednym zdaniem. Nie piszemy „AI zdecydowało”; decyzję podejmuje człowiek.
- Trend ceny nazywamy zawsze tak samo: „wzrost”, „stała”, „spadek”. Zmiana w procentach ma znak i jedno miejsce po przecinku: „+6,0%”, „−5,0%”.
- Terminy domenowe zostają: sBoM, indeks, komplet (kit), zapytanie ofertowe, biuro obsługi klienta, model serwisowy, rozstrzał, moment dokręcenia.
- Kwoty: format `pl-PL`, „1 234,50 zł”; w XML kropka dziesiętna i dwa miejsca.
- Dane demonstracyjne są oznaczone jako fikcyjne, a adresy e-mail mają domenę `.example`. Producenci w prototypie to role („Producent A”), nie wymyślone nazwy firm. Formularz zapytania startuje z danymi demonstracyjnymi (rola zamiast osoby) i ma nad polami zdanie: „Dane demonstracyjne. Nie podawaj prawdziwych danych osób ani firm.”

## 10. Ikony

Konturowe, kreska 1,8–2 px, zaokrąglone końce, 16–20 px w siatce 20×20, kolor `currentColor`. Bez emoji.
