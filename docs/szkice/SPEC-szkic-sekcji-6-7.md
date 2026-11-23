# SPEC.md — szkic sekcji 6 i 7 (2026-11-22)

To treść sekcji 6 i 7 z wersji 1.0 pliku SPEC.md. W wersji 1.1 obie sekcje mają same nagłówki, bo uzupełnia je właściciel PartPark. Szkic zostaje jako materiał pomocniczy. Odwołania do US7, US10–US16 dotyczą numeracji z wersji 1.0.

## 6. Kierunek budowy

- Czy dane mają być wspólne — dla kilku osób albo kilku urządzeń? **tak** — właściciel produktu publikuje sBoM i cennik, które widzi ok. 500 klientów (US9, US10); klient widzi swoje zapytania na telefonie i na komputerze, a administrator widzi ich doręczenie w logu (US5, US12).
- Czy aplikacja wywołuje płatne API Twoim własnym kluczem? **tak** — API Claude kluczem producenta wpisanym w A3 (US7, US13) oraz wysyłkę poczty danymi producenta z A2 (US5, US12). Oba wywołania idą wyłącznie z funkcji po stronie serwera. SMS jako drugi składnik byłby trzecim płatnym API, dlatego jest w Nice-to-have.
- Kierunek: **aplikacja z bazą**. Supabase jest całym zapleczem (baza, logowanie z MFA, pliki, funkcje serwerowe), a aplikacja działa w przeglądarce. Osobnego serwera aplikacyjnego nie ma. Stos jest w tabeli pod listą.
- Co świadomie pomijam: osobny serwer aplikacyjny i własne API (zastępuje je Supabase); serwer konwersji CAD; aplikacje natywne; osobną bazę dla każdego producenta; panel operatora platformy (producenta i pierwszego administratora operator zakłada w panelu Supabase); panel BOK.
- Co przenoszę do „Poza zakresem”: przeglądanie bez konta (było w specyfikacji 2.4 jako rola gościa); płatności i zamówienie wiążące; ceny indywidualne; zapis zamówień w ERP; dokładną geometrię z AI. Do Nice-to-have przenoszę instrukcje wymiany i edytor mapowania pól ERP.
- Warunek zmiany kierunku:
  - pliki STEP producenta nie konwertują się w przeglądarce (rozmiar albo czas) → dochodzi kontener konwersji poza Supabase;
  - Edge Function nie może połączyć się z serwerem pocztowym producenta → wysyłka wyłącznie przez API dostawcy poczty;
  - zadanie Claude nie mieści się w limicie czasu funkcji → dochodzi osobny proces roboczy;
  - producent wymaga danych na własnej infrastrukturze albo logowania kontem firmowym → wariant Supabase na własnym serwerze albo plan z SSO;
  - liczba klientów rośnie ponad ok. 5000 albo producentów ponad kilkudziesięciu → przegląd planu, indeksów i polityk RLS.

### Stos technologiczny

| Warstwa | Wybór | Uzasadnienie |
|---|---|---|
| Aplikacja w przeglądarce | React + TypeScript + Vite, jedna aplikacja z trzema obszarami: klient, sBoM Studio, administrator; instalowalna jako PWA | Jeden kod dla telefonu i komputera; obszary ładują się osobno, więc klient nie pobiera kodu Studio |
| Model 3D | three.js i format GLB (glTF 2.0); kod viewera przeniesiony z prototypu | Zachowuje sprawdzone zachowanie: zaznaczanie, rozsunięcie, tolerancję dotyku |
| Baza danych | Supabase Postgres; każdy wiersz ma identyfikator producenta, a dostęp pilnują polityki wierszy (RLS) | Izolacja producentów w bazie, a nie w kodzie aplikacji (US15) |
| Logowanie | Supabase Auth: e-mail i hasło, MFA kodem TOTP; polityki RLS wymagają sesji z drugim składnikiem; rola i producent zapisane w tokenie | MFA jest wymuszone w bazie, więc nie da się go obejść z pominięciem ekranu (US1) |
| Pliki | Supabase Storage: modele GLB jako niezmienne wersje, prywatne pliki źródłowe (STEP, rysunki), pliki XML i PDF zapytań | Niezmienne adresy wersji dobrze się buforują; pliki źródłowe zostają u producenta (US6) |
| Logika po stronie serwera | Supabase Edge Functions (TypeScript): wysyłka zapytań, wywołania Claude, punkt API dla ERP, testy połączeń; funkcje SQL do publikacji wersji i cennika | Sekrety nie opuszczają serwera; publikacja jest jedną transakcją (US9, US10) |
| Zadania w tle | Kolejka i harmonogram w Postgres (Supabase Queues, pg_cron) | Ponawianie poczty i zadania Claude trwają dłużej niż jedno żądanie (US5, US7) |
| Sekrety | Supabase Vault: klucz Claude i dane serwera pocztowego osobno dla każdego producenta; klucze ERP przechowywane jako skrót | Administrator zapisuje sekret raz i nikt go już nie odczyta (US12–US14) |
| Poczta | Jeden moduł wysyłki z trzema wariantami wybieranymi w A2: serwer SMTP producenta, Microsoft 365 przez Graph API, domyślny serwer platformy | Microsoft wycofuje w Exchange Online logowanie hasłem do SMTP ([Microsoft Learn](https://learn.microsoft.com/exchange/clients-and-mobile-in-exchange-online/deprecation-of-basic-authentication-exchange-online)), więc dla Microsoft 365 potrzebny jest wariant z OAuth |
| Claude AI | API Anthropic wywoływane z funkcji serwerowej; odpowiedź w ustalonym schemacie JSON (części, bryły, obszary, propozycje), z którego aplikacja buduje GLB | Claude nie tworzy siatki 3D wprost; schemat da się sprawdzić i odrzucić przed zapisem (US7 K3) |
| Konwersja STEP | Open CASCADE skompilowany do WebAssembly, uruchamiany w przeglądarce właściciela produktu; uproszczenie siatki i zapis GLB | Jedna osoba na producenta konwertuje pliki rzadko, więc serwer konwersji nie jest potrzebny na start |
| XML i PDF | Generowane w funkcji serwerowej, z osadzoną czcionką z polskimi znakami | E-mail musi zawierać pliki wytworzone po stronie serwera, a nie przysłane z przeglądarki |
| Hosting aplikacji | Statyczny hosting z CDN (np. Vercel, Cloudflare Pages albo Netlify) | Aplikacja to pliki statyczne; cała logika jest w Supabase |
| Środowiska i testy | Dwa projekty Supabase (testowy i produkcyjny), migracje w repozytorium; Playwright dla ścieżek i układu; testy polityk RLS | Kryteria z sekcji 5 są pisane tak, żeby dało się je zautomatyzować |

### Skala i dane

100 klientów dziennie to obciążenie rzędu jednego zapytania na sekundę w szczycie (szacunek: 100 sesji po kilkadziesiąt zapytań w ciągu dnia pracy). Transfer modeli to najwyżej ok. 45 GB miesięcznie (100 sesji × 3 modele × 5 MB × 30 dni), a realnie mniej, bo wersje są buforowane. Jeden projekt Supabase w regionie UE obsłuży to z dużym zapasem. Koszt będą kształtować wywołania Claude i ewentualne SMS-y, a nie baza.

Główne tabele: producenci, członkostwa (użytkownik, producent, rola), firmy klientów, dostęp klientów do producentów, produkty, wersje modeli, części, pozycje kompletów, biblioteka indeksów, cenniki, ceny, historia cen, zapytania, pozycje zapytań, ustawienia poczty, log poczty, ustawienia Claude, zadania Claude, ustawienia ERP, importy ERP, dziennik zdarzeń.

### Do sprawdzenia przed budową (etap 0)

Wyszukiwarka internetowa była niedostępna, więc fakty o Supabase i API Claude pochodzą z wiedzy agenta, a nie z aktualnej dokumentacji:

1. Supabase Auth: wymuszenie drugiego składnika w politykach RLS i ponowne proszenie o kod po zadanym czasie.
2. Edge Functions: limit czasu jednego wywołania i dozwolone porty wychodzące. Agent pamięta, że porty SMTP 25 i 587 są zablokowane, co decyduje o wariancie poczty.
3. Claude: trafność szkicu modelu na trzech rysunkach pilotażowych oraz warunki przetwarzania danych przez dostawcę API.
4. Konwersja STEP w przeglądarce na prawdziwych plikach producenta: czas, pamięć, największy plik, licencja biblioteki.
5. PDF z polskimi znakami generowany w Edge Function w limicie czasu.
6. Aktualny cennik i limity planu Supabase: projekt bez usypiania, kopie zapasowe, własny serwer pocztowy dla wiadomości logowania.

## 7. Wygląd

DESIGN.md: PartPark design.md, źródło: własny system projektowy wyprowadzony z prototypu ([DESIGN.md](../../DESIGN.md), zgodny ze specyfikacją 2.4), licencja: dokument własny projektu; kroje Bricolage Grotesque, Figtree i JetBrains Mono z Google Fonts na licencji SIL Open Font License 1.1. Pasuje, bo serwisant z telefonem w ręku ma na każdym ekranie jeden cel i jedną główną akcję, a kolor zawsze znaczy to samo: pomarańczowy „do wymiany”, bursztynowy „komplet”, zielony „zatwierdzone”.

Ekrany logowania i modułu administratora nie mają jeszcze wzoru w design.md. Powstają z tych samych komponentów: karta, formularz, tabela, pasek kroków, pasek akcji.
