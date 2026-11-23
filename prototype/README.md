# Prototyp PartPark

Klikalny prototyp obu ścieżek: klienta i modułu sBoM Studio. To jeden plik HTML z danymi fikcyjnymi w środku. Nie ma serwera, logowania ani wysyłki e-maili: zapytanie kończy się podglądem i pobraniem plików PDF i XML.

Zakres prototypu opisuje [docs/brief.md](../docs/brief.md), a wygląd [DESIGN.md](../DESIGN.md).

## Pliki

| Plik | Co zawiera |
|---|---|
| `partpark-prototyp.html` | Wynik budowania. Plik samodzielny: biblioteki są w środku, nie pobiera niczego z sieci, otwiera się dwuklikiem. Jest zapisany w repozytorium, żeby dało się go otworzyć bez instalacji |
| `src/page.html` | Znaczniki i style strony. Wiersz `/*__APP__*/` to miejsce, w które budowanie wstawia kod z `app.js` |
| `src/app.js` | Cały kod prototypu: dane fikcyjne, model 3D, ścieżka klienta, sBoM Studio, cennik, pliki PDF i XML |
| `src/fonts/` | Podzbiór kroju DejaVu Sans do pliku PDF (polskie znaki) i jego licencja |
| `scripts/build.js` | Budowanie obu wersji prototypu |
| `tests/` | Testy w przeglądarce |
| `THIRD-PARTY-NOTICES.md` | Licencje bibliotek i kroju |
| `dist/partpark.html` | Powstaje przy budowaniu, nie jest zapisany w repozytorium. To fragment strony z bibliotekami ładowanymi z CDN, przeznaczony do publikacji jako strona w Claude |

## Budowanie

```bash
npm install
npm run build
```

Budowanie:

1. wstawia do `app.js` oba pliki kroju zakodowane w base64 (znaczniki `/*__FONT_R__*/` i `/*__FONT_B__*/`);
2. wstawia `app.js` do `page.html` i zapisuje `dist/partpark.html`;
3. zamienia cztery odwołania do CDN na kod bibliotek z `node_modules` (three.js, OrbitControls, jsPDF, JSZip), usuwa odwołania do Google Fonts, dodaje szkielet dokumentu i zapisuje `partpark-prototyp.html`.

Skrypt zatrzymuje się z komunikatem, jeśli nie znajdzie któregoś znacznika albo odwołania. Wersje bibliotek są przypięte w `package.json`: three.js 0.128.0, jsPDF 2.5.1, JSZip 3.10.1.

Po zmianie w `src/` zbuduj prototyp i zapisz w jednym commicie źródła razem z `partpark-prototyp.html`.

## Testy

Testy otwierają zbudowany prototyp w przeglądarce Chromium (Playwright) i sprawdzają go w pięciu oknach: komputer 1366 × 650 i 1680 × 900, tablet 820 × 1100, telefon 390 × 844 i 360 × 640 z dotykiem. To emulacja telefonu, nie prawdziwe urządzenie.

```bash
npx playwright install chromium   # raz
npm test                          # budowanie i wszystkie testy
npm run test:form                 # tylko jeden zestaw
```

| Zestaw | Plik | Co sprawdza | Czas |
|---|---|---|---|
| Formularz | `tests/form.test.js` | Sześć pól wymaganych w oknie, przełącznik pilności, blok „Dodatkowe informacje”, komunikat o brakujących polach, wysłanie | ok. 2,5 min |
| Ścieżki | `tests/flows.test.js` | sBoM Studio od importu do publikacji, cennik i import CSV, pobieranie plików, motyw ciemny, plik samodzielny otwarty z dysku bez żadnego zapytania do sieci | ok. 1,5 min |
| Układ | `tests/layout.test.js` | Na każdym ekranie obu ścieżek: strona się nie przewija, pasek kroków i pasek akcji są w oknie, pasek kroków pokazuje właściwy krok | ok. 6 min |

Każdy zestaw kończy się wierszem `ALL OK` albo `FAILED` z liczbą błędów i kodem wyjścia różnym od zera. Czasy zmierzono w przeglądarce z programowym WebGL, na komputerze z kartą graficzną mogą być krótsze.

Jak to działa:

- `tests/lib.js` uruchamia przeglądarkę z programowym WebGL i podstawia biblioteki z `node_modules` w miejsce adresów CDN, więc testy nie potrzebują internetu.
- Zestawy „Formularz” i „Układ” sprawdzają `dist/partpark.html`. Zestaw „Ścieżki” sprawdza także `partpark-prototyp.html`.
- Zrzuty ekranu i pobrane pliki trafiają do katalogu tymczasowego systemu, do podkatalogu `partpark-tests`. W repozytorium nic nie przybywa.
- Do każdego zestawu można podać własną ścieżkę pliku, np. `node prototype/tests/form.test.js inny-plik.html`.

## Ograniczenia prototypu

- Dane znikają po odświeżeniu strony. Prototyp niczego nie zapisuje w przeglądarce.
- Import pliku STEP pokazuje przebieg na modelu przykładowym. Prawdziwej konwersji nie ma.
- Zapytanie nie wychodzi e-mailem.
- Przełącznik perspektywy w nagłówku zastępuje logowanie.
