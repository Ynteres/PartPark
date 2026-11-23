# PartPark — wyniki testów

| | |
|---|---|
| Stan na | 2026-11-22 |
| Powiązane | [SPEC.md](../SPEC.md) · [brief.md](./brief.md), część 5 · [pr2-odpowiedzi.md](./kurs/pr2-odpowiedzi.md), pole 4 |

Plik zbiera uwagi osób, które widziały albo testowały PartPark, i pokazuje, co z każdej uwagi wynikło. Każda zmiana w SPEC.md, która pochodzi z testu, ma tam dopisek z imionami osób testujących.

## 1. Zestawienie

| Nr | Kiedy | Forma | Wersja | Osoby testujące | Uwagi | Stan |
|---|---|---|---|---|---|---|
| T1 | [DO USTALENIA: data spotkania — podaje właściciel PartPark] | Pokaz na żywo podczas cyklicznego spotkania | Pierwsza wersja prototypu | Ewa, Cezary | 1 o zachowaniu, 0 o wyglądzie | Wprowadzona: w prototypie bez wysyłki e-mail, w MVP jako must-have |

## 2. T1 · Pokaz pierwszej wersji prototypu

**Co pokazano.** Pierwszą wersję prototypu. Ścieżka klienta kończyła się w niej zamówieniem części, a zapytania ofertowego nie było. Ten opis jest odtworzony z dokumentów projektu: specyfikacja 1.2 mówiła o zamówieniu i płatności.

**Kto.** Ewa i Cezary. Uwaga jest zapisana wspólnie, bez podziału na osoby.

**Komentarz.** „Super aplikacja się zapowiada, brakuje elementu wysyłania zapytania ofertowego.” Zapis z pamięci właściciela PartPark, potwierdzony 2026-11-22.

Zapis w układzie formularza testera z karty P3:

| Pole formularza | Zapis |
|---|---|
| Co zadziałało | Ogólna ocena: „super aplikacja się zapowiada”. Bez wskazania konkretnego ekranu |
| Gdzie utknąłem | Brak zapisu |
| Co bym zmienił | „Brakuje elementu wysyłania zapytania ofertowego” |

**Rodzaj uwagi.** Zachowanie, typ „brakujący krok”. Uwaga o zachowaniu staje się zmianą; uwag o wyglądzie nie było.

**Co z niej wynikło.**

| Gdzie | Zmiana | Stan |
|---|---|---|
| Prototyp, wersja 11 | Krok 3 „Zapytanie” z przyciskiem „Wyślij zapytanie ofertowe” i krok 4 „Potwierdzenie” z podglądem i pobraniem plików PDF i XML | Jest. Prototyp nie wysyła e-maila: pliki można tylko pobrać |
| SPEC.md, zakres | M5 Zapytanie ofertowe, M6 Wysyłka e-mailem do BOK producenta, M7 Potwierdzenie | Must-have, dopisek „dotyczy: Ewa, Cezary” |
| SPEC.md, ekrany | K3 Zapytanie, K4 Potwierdzenie | Dopisek „dotyczy: Ewa, Cezary” |
| SPEC.md, user stories | US5 Zapytanie ofertowe, US6 Wysyłka e-mailem i potwierdzenie | Dopisek „dotyczy: Ewa, Cezary” |

**Ograniczenia tego wyniku.**

- To był pokaz prowadzony przez autora, a nie test, w którym osoba sama przechodzi ścieżkę i mówi na głos.
- Komentarz jest jeden i wspólny. Nie ma zapisu, w którym miejscu ktoś się zatrzymał.
- [DO USTALENIA: czy Ewa i Cezary widzieli już wersję z zapytaniem ofertowym i co o niej powiedzieli — podaje właściciel PartPark]

## 3. Czego testy jeszcze nie sprawdziły

- **Założenie o użyteczności** (brief, część 5): klient bez podpowiedzi znajdzie i zaznaczy wskazaną część, zauważy komplet i zrozumie, że wysyła zapytanie, a ceny są poglądowe. Pokaz T1 tego nie sprawdza, bo nikt nie przechodził ścieżki sam.
- **Założenie o technologii** (brief, część 5): model wczytuje się i daje się obsłużyć dotykiem na telefonie osoby testującej. Dotąd są tylko sprawdzenia w emulacji telefonu.
- **Peer test w formule pięciu minut** (pr2-odpowiedzi.md, pole 4): zadanie z wirnikiem pompy, trzy osoby, zapis słowo w słowo. [DO USTALENIA: czy test się odbył i jakie są notatki — podaje właściciel PartPark]
