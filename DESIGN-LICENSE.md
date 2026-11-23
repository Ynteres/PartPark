# DESIGN-LICENSE.md — PartPark

| | |
|---|---|
| Dotyczy | [DESIGN.md](./DESIGN.md) projektu PartPark |
| Stan na | 2026-11-22 |

Plik podaje źródło DESIGN.md, link do niego i treść licencji. DESIGN.md jest opracowaniem własnym, udostępnianym na licencji CC BY 4.0. Osobno wymienione są elementy zewnętrzne, na które DESIGN.md się powołuje, razem z ich licencjami.

## 1. Źródło DESIGN.md

| | |
|---|---|
| Nazwa źródła | PartPark design.md: własny system projektowy projektu PartPark, wyprowadzony z prototypu PartPark |
| Link | Prototyp: https://claude.ai/artifact/WcigZ593MGMhwZZYKV7qMv (link prywatny; dostęp nadaje właściciel). Dokument: [DESIGN.md](./DESIGN.md) w katalogu głównym repozytorium |
| Autor | Właściciel PartPark |
| Pochodzenie | Opracowanie własne, przygotowane z pomocą Claude (Anthropic). Nie jest kopią ani przeróbką cudzego pliku DESIGN.md, szablonu ani systemu projektowego. Kolory, siatka, komponenty, ikony i znak marki powstały w tym projekcie. Projekt jest elementem szkolenia i nie powstaje na zlecenie pracodawcy |
| Licencja | Creative Commons Uznanie autorstwa 4.0 Międzynarodowe (CC BY 4.0), https://creativecommons.org/licenses/by/4.0/. Decyzja właściciela PartPark z 2026-11-22 |
| Nota licencyjna | PartPark DESIGN.md © 2026 Właściciel PartPark. Licencja: CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ |
| Jak podać autora | „PartPark DESIGN.md”, autor: Właściciel PartPark, licencja CC BY 4.0, z linkiem do licencji i informacją, czy treść została zmieniona |

## 2. Elementy zewnętrzne, na które powołuje się DESIGN.md

| Element | Rola w DESIGN.md | Nazwa źródła | Link | Licencja |
|---|---|---|---|---|
| Bricolage Grotesque | Krój nagłówków, marki i sum | The Bricolage Grotesque Project Authors | https://github.com/ateliertriay/bricolage | SIL Open Font License 1.1 |
| Figtree | Krój tekstu, przycisków i formularzy | The Figtree Project Authors | https://github.com/erikdkennedy/figtree | SIL Open Font License 1.1 |
| JetBrains Mono | Krój indeksów, kodów i XML | The JetBrains Mono Project Authors | https://github.com/JetBrains/JetBrainsMono | SIL Open Font License 1.1 |
| DejaVu Sans | Krój osadzony w pliku PDF zapytania (prototyp) | DejaVu fonts | https://dejavu-fonts.github.io/ | Licencja Bitstream Vera; zmiany DejaVu są w domenie publicznej |

Prototyp ładuje trzy pierwsze kroje z Google Fonts (https://fonts.google.com). Plik samodzielny `partpark-prototyp.html` ich nie pobiera i używa krojów systemowych.

Skąd pochodzi treść licencji w sekcji 3:

- Creative Commons Attribution 4.0 International: pole `licenseText` wpisu `CC-BY-4.0` z pakietu npm `spdx-license-list` w wersji 6.12.0, odczytane 2026-11-22. Długie wiersze są zawinięte do 88 znaków, słowa bez zmian. Tekst oficjalny: https://creativecommons.org/licenses/by/4.0/legalcode
- SIL Open Font License 1.1 i noty o prawach autorskich: pliki `LICENSE` z pakietów npm `@fontsource/bricolage-grotesque`, `@fontsource/figtree` i `@fontsource/jetbrains-mono` w wersji 5.3.0, odczytane 2026-11-22. Treść licencji jest w trzech pakietach identyczna.
- Licencja Bitstream Vera: plik `copyright` pakietu `fonts-dejavu-core` (część dotycząca krojów).

Biblioteki kodu użyte w prototypie (three.js, jsPDF, JSZip) nie są częścią DESIGN.md. Ich licencje należą do dokumentacji budowy.

## 3. Treść licencji

### 3.1 Creative Commons Attribution 4.0 International: PartPark DESIGN.md

Nota licencyjna:

```text
PartPark DESIGN.md © 2026 Właściciel PartPark
Licencja: Creative Commons Attribution 4.0 International (CC BY 4.0)
https://creativecommons.org/licenses/by/4.0/
```

Treść licencji:

```text
Creative Commons Attribution 4.0 International

 Creative Commons Corporation (“Creative Commons”) is not a law firm and does not
 provide legal services or legal advice. Distribution of Creative Commons public
 licenses does not create a lawyer-client or other relationship. Creative Commons makes
 its licenses and related information available on an “as-is” basis. Creative Commons
 gives no warranties regarding its licenses, any material licensed under their terms and
 conditions, or any related information. Creative Commons disclaims all liability for
 damages resulting from their use to the fullest extent possible.

Using Creative Commons Public Licenses

Creative Commons public licenses provide a standard set of terms and conditions that
creators and other rights holders may use to share original works of authorship and
other material subject to copyright and certain other rights specified in the public
license below. The following considerations are for informational purposes only, are not
exhaustive, and do not form part of our licenses.

Considerations for licensors: Our public licenses are intended for use by those
authorized to give the public permission to use material in ways otherwise restricted by
copyright and certain other rights. Our licenses are irrevocable. Licensors should read
and understand the terms and conditions of the license they choose before applying it.
Licensors should also secure all rights necessary before applying our licenses so that
the public can reuse the material as expected. Licensors should clearly mark any
material not subject to the license. This includes other CC-licensed material, or
material used under an exception or limitation to copyright. More considerations for
licensors.

Considerations for the public: By using one of our public licenses, a licensor grants
the public permission to use the licensed material under specified terms and conditions.
If the licensor’s permission is not necessary for any reason–for example, because of any
applicable exception or limitation to copyright–then that use is not regulated by the
license. Our licenses grant only permissions under copyright and certain other rights
that a licensor has authority to grant. Use of the licensed material may still be
restricted for other reasons, including because others have copyright or other rights in
the material. A licensor may make special requests, such as asking that all changes be
marked or described. Although not required by our licenses, you are encouraged to
respect those requests where reasonable. More considerations for the public.

Creative Commons Attribution 4.0 International Public License

By exercising the Licensed Rights (defined below), You accept and agree to be bound by
the terms and conditions of this Creative Commons Attribution 4.0 International Public
License ("Public License"). To the extent this Public License may be interpreted as a
contract, You are granted the Licensed Rights in consideration of Your acceptance of
these terms and conditions, and the Licensor grants You such rights in consideration of
benefits the Licensor receives from making the Licensed Material available under these
terms and conditions.

Section 1 – Definitions.

     a.      Adapted Material means material subject to Copyright and Similar Rights
     that is derived from or based upon the Licensed Material and in which the Licensed
     Material is translated, altered, arranged, transformed, or otherwise modified in a
     manner requiring permission under the Copyright and Similar Rights held by the
     Licensor. For purposes of this Public License, where the Licensed Material is a
     musical work, performance, or sound recording, Adapted Material is always produced
     where the Licensed Material is synched in timed relation with a moving image.

     b.      Adapter's License means the license You apply to Your Copyright and Similar
     Rights in Your contributions to Adapted Material in accordance with the terms and
     conditions of this Public License.

     c.      Copyright and Similar Rights means copyright and/or similar rights closely
     related to copyright including, without limitation, performance, broadcast, sound
     recording, and Sui Generis Database Rights, without regard to how the rights are
     labeled or categorized. For purposes of this Public License, the rights specified
     in Section 2(b)(1)-(2) are not Copyright and Similar Rights.

     d.      Effective Technological Measures means those measures that, in the absence
     of proper authority, may not be circumvented under laws fulfilling obligations
     under Article 11 of the WIPO Copyright Treaty adopted on December 20, 1996, and/or
     similar international agreements.

     e.      Exceptions and Limitations means fair use, fair dealing, and/or any other
     exception or limitation to Copyright and Similar Rights that applies to Your use of
     the Licensed Material.

     f.      Licensed Material means the artistic or literary work, database, or other
     material to which the Licensor applied this Public License.

     g.      Licensed Rights means the rights granted to You subject to the terms and
     conditions of this Public License, which are limited to all Copyright and Similar
     Rights that apply to Your use of the Licensed Material and that the Licensor has
     authority to license.

     h.      Licensor means the individual(s) or entity(ies) granting rights under this
     Public License.

     i.      Share means to provide material to the public by any means or process that
     requires permission under the Licensed Rights, such as reproduction, public
     display, public performance, distribution, dissemination, communication, or
     importation, and to make material available to the public including in ways that
     members of the public may access the material from a place and at a time
     individually chosen by them.

     j.      Sui Generis Database Rights means rights other than copyright resulting
     from Directive 96/9/EC of the European Parliament and of the Council of 11 March
     1996 on the legal protection of databases, as amended and/or succeeded, as well as
     other essentially equivalent rights anywhere in the world.

     k.      You means the individual or entity exercising the Licensed Rights under
     this Public License. Your has a corresponding meaning.

Section 2 – Scope.

     a.	License grant.

          1. Subject to the terms and conditions of this Public License, the Licensor
          hereby grants You a worldwide, royalty-free, non-sublicensable, non-exclusive,
          irrevocable license to exercise the Licensed Rights in the Licensed Material
          to:

               A. reproduce and Share the Licensed Material, in whole or in part; and

               B. produce, reproduce, and Share Adapted Material.

          2. Exceptions and Limitations. For the avoidance of doubt, where Exceptions
          and Limitations apply to Your use, this Public License does not apply, and You
          do not need to comply with its terms and conditions.

          3. Term. The term of this Public License is specified in Section 6(a).

          4. Media and formats; technical modifications allowed. The Licensor authorizes
          You to exercise the Licensed Rights in all media and formats whether now known
          or hereafter created, and to make technical modifications necessary to do so.
          The Licensor waives and/or agrees not to assert any right or authority to
          forbid You from making technical modifications necessary to exercise the
          Licensed Rights, including technical modifications necessary to circumvent
          Effective Technological Measures. For purposes of this Public License, simply
          making modifications authorized by this Section 2(a)(4) never produces Adapted
          Material.

          5. Downstream recipients.

               A. Offer from the Licensor – Licensed Material. Every recipient of the
               Licensed Material automatically receives an offer from the Licensor to
               exercise the Licensed Rights under the terms and conditions of this
               Public License.

               B. No downstream restrictions. You may not offer or impose any additional
               or different terms or conditions on, or apply any Effective Technological
               Measures to, the Licensed Material if doing so restricts exercise of the
               Licensed Rights by any recipient of the Licensed Material.

          6.  No endorsement. Nothing in this Public License constitutes or may be
          construed as permission to assert or imply that You are, or that Your use of
          the Licensed Material is, connected with, or sponsored, endorsed, or granted
          official status by, the Licensor or others designated to receive attribution
          as provided in Section 3(a)(1)(A)(i).

b. Other rights.

          1. Moral rights, such as the right of integrity, are not licensed under this
          Public License, nor are publicity, privacy, and/or other similar personality
          rights; however, to the extent possible, the Licensor waives and/or agrees not
          to assert any such rights held by the Licensor to the limited extent necessary
          to allow You to exercise the Licensed Rights, but not otherwise.

          2. Patent and trademark rights are not licensed under this Public License.

          3. To the extent possible, the Licensor waives any right to collect royalties
          from You for the exercise of the Licensed Rights, whether directly or through
          a collecting society under any voluntary or waivable statutory or compulsory
          licensing scheme. In all other cases the Licensor expressly reserves any right
          to collect such royalties.

Section 3 – License Conditions.

Your exercise of the Licensed Rights is expressly made subject to the following
conditions.

     a.	Attribution.

          1. If You Share the Licensed Material (including in modified form), You must:

               A. retain the following if it is supplied by the Licensor with the
               Licensed Material:

                    i. identification of the creator(s) of the Licensed Material and any
                    others designated to receive attribution, in any reasonable manner
                    requested by the Licensor (including by pseudonym if designated);

                    ii. a copyright notice;

                    iii. a notice that refers to this Public License;

                    iv.	a notice that refers to the disclaimer of warranties;

                    v. a URI or hyperlink to the Licensed Material to the extent
                    reasonably practicable;

               B. indicate if You modified the Licensed Material and retain an
               indication of any previous modifications; and

               C. indicate the Licensed Material is licensed under this Public License,
               and include the text of, or the URI or hyperlink to, this Public License.

          2. You may satisfy the conditions in Section 3(a)(1) in any reasonable manner
          based on the medium, means, and context in which You Share the Licensed
          Material. For example, it may be reasonable to satisfy the conditions by
          providing a URI or hyperlink to a resource that includes the required
          information.

          3. If requested by the Licensor, You must remove any of the information
          required by Section 3(a)(1)(A) to the extent reasonably practicable.

          4. If You Share Adapted Material You produce, the Adapter's License You apply
          must not prevent recipients of the Adapted Material from complying with this
          Public License.

Section 4 – Sui Generis Database Rights.

Where the Licensed Rights include Sui Generis Database Rights that apply to Your use of
the Licensed Material:

     a.      for the avoidance of doubt, Section 2(a)(1) grants You the right to
     extract, reuse, reproduce, and Share all or a substantial portion of the contents
     of the database;

     b.      if You include all or a substantial portion of the database contents in a
     database in which You have Sui Generis Database Rights, then the database in which
     You have Sui Generis Database Rights (but not its individual contents) is Adapted
     Material; and

     c.      You must comply with the conditions in Section 3(a) if You Share all or a
     substantial portion of the contents of the database.
For the avoidance of doubt, this Section 4 supplements and does not replace Your
obligations under this Public License where the Licensed Rights include other Copyright
and Similar Rights.

Section 5 – Disclaimer of Warranties and Limitation of Liability.

     a.      Unless otherwise separately undertaken by the Licensor, to the extent
     possible, the Licensor offers the Licensed Material as-is and as-available, and
     makes no representations or warranties of any kind concerning the Licensed
     Material, whether express, implied, statutory, or other. This includes, without
     limitation, warranties of title, merchantability, fitness for a particular purpose,
     non-infringement, absence of latent or other defects, accuracy, or the presence or
     absence of errors, whether or not known or discoverable. Where disclaimers of
     warranties are not allowed in full or in part, this disclaimer may not apply to
     You.

     b.      To the extent possible, in no event will the Licensor be liable to You on
     any legal theory (including, without limitation, negligence) or otherwise for any
     direct, special, indirect, incidental, consequential, punitive, exemplary, or other
     losses, costs, expenses, or damages arising out of this Public License or use of
     the Licensed Material, even if the Licensor has been advised of the possibility of
     such losses, costs, expenses, or damages. Where a limitation of liability is not
     allowed in full or in part, this limitation may not apply to You.

     c.      The disclaimer of warranties and limitation of liability provided above
     shall be interpreted in a manner that, to the extent possible, most closely
     approximates an absolute disclaimer and waiver of all liability.

Section 6 – Term and Termination.

     a.      This Public License applies for the term of the Copyright and Similar
     Rights licensed here. However, if You fail to comply with this Public License, then
     Your rights under this Public License terminate automatically.

     b.      Where Your right to use the Licensed Material has terminated under Section
     6(a), it reinstates:

          1. automatically as of the date the violation is cured, provided it is cured
          within 30 days of Your discovery of the violation; or

          2. upon express reinstatement by the Licensor.

     c.      For the avoidance of doubt, this Section 6(b) does not affect any right the
     Licensor may have to seek remedies for Your violations of this Public License.

     d.      For the avoidance of doubt, the Licensor may also offer the Licensed
     Material under separate terms or conditions or stop distributing the Licensed
     Material at any time; however, doing so will not terminate this Public License.

     e.	Sections 1, 5, 6, 7, and 8 survive termination of this Public License.

Section 7 – Other Terms and Conditions.

     a.      The Licensor shall not be bound by any additional or different terms or
     conditions communicated by You unless expressly agreed.

     b.      Any arrangements, understandings, or agreements regarding the Licensed
     Material not stated herein are separate from and independent of the terms and
     conditions of this Public License.

Section 8 – Interpretation.

     a.      For the avoidance of doubt, this Public License does not, and shall not be
     interpreted to, reduce, limit, restrict, or impose conditions on any use of the
     Licensed Material that could lawfully be made without permission under this Public
     License.

     b.      To the extent possible, if any provision of this Public License is deemed
     unenforceable, it shall be automatically reformed to the minimum extent necessary
     to make it enforceable. If the provision cannot be reformed, it shall be severed
     from this Public License without affecting the enforceability of the remaining
     terms and conditions.

     c.      No term or condition of this Public License will be waived and no failure
     to comply consented to unless expressly agreed to by the Licensor.

     d.      Nothing in this Public License constitutes or may be interpreted as a
     limitation upon, or waiver of, any privileges and immunities that apply to the
     Licensor or You, including from the legal processes of any jurisdiction or
     authority.

Creative Commons is not a party to its public licenses. Notwithstanding, Creative
Commons may elect to apply one of its public licenses to material it publishes and in
those instances will be considered the “Licensor.” Except for the limited purpose of
indicating that material is shared under a Creative Commons public license or as
otherwise permitted by the Creative Commons policies published at
creativecommons.org/policies, Creative Commons does not authorize the use of the
trademark “Creative Commons” or any other trademark or logo of Creative Commons without
its prior written consent including, without limitation, in connection with any
unauthorized modifications to any of its public licenses or any other arrangements,
understandings, or agreements concerning use of licensed material. For the avoidance of
doubt, this paragraph does not form part of the public licenses.

Creative Commons may be contacted at creativecommons.org.
```

### 3.2 SIL Open Font License 1.1: Bricolage Grotesque, Figtree, JetBrains Mono

Noty o prawach autorskich, dosłownie z plików licencji:

```text
Copyright 2022 The Bricolage Grotesque Project Authors (https://github.com/ateliertriay/bricolage)

Copyright 2022 The Figtree Project Authors (https://github.com/erikdkennedy/figtree) Figtree-Italic[wght].ttf: Copyright 2022 The Figtree Project Authors (https://github.com/erikdkennedy/figtree)

Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono) JetBrainsMono-Italic[wght].ttf: Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)
```

Treść licencji, wspólna dla trzech krojów:

```text
This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```

### 3.3 Licencja krojów DejaVu (Bitstream Vera)

```text
Copyright (c) 2003 by Bitstream, Inc. All Rights Reserved.
Bitstream Vera is a trademark of Bitstream, Inc.
DejaVu changes are in public domain.

Permission is hereby granted, free of charge, to any person obtaining a copy
of the fonts accompanying this license ("Fonts") and associated
documentation files (the "Font Software"), to reproduce and distribute the
Font Software, including without limitation the rights to use, copy, merge,
publish, distribute, and/or sell copies of the Font Software, and to permit
persons to whom the Font Software is furnished to do so, subject to the
following conditions:

The above copyright and trademark notices and this permission notice shall
be included in all copies of one or more of the Font Software typefaces.

The Font Software may be modified, altered, or added to, and in particular
the designs of glyphs or characters in the Fonts may be modified and
additional glyphs or characters may be added to the Fonts, only if the fonts
are renamed to names not containing either the words "Bitstream" or the word
"Vera".

This License becomes null and void to the extent applicable to Fonts or Font
Software that has been modified and is distributed under the "Bitstream
Vera" names.

The Font Software may be sold as part of a larger software package but no
copy of one or more of the Font Software typefaces may be sold by itself.

THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT,
TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL BITSTREAM OR THE GNOME
FOUNDATION BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING
ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF
THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE
FONT SOFTWARE.

Except as contained in this notice, the names of Gnome, the Gnome
Foundation, and Bitstream Inc., shall not be used in advertising or
otherwise to promote the sale, use or other dealings in this Font Software
without prior written authorization from the Gnome Foundation or Bitstream
Inc., respectively. For further information, contact: fonts at gnome dot
org.
```

Pełny plik licencji DejaVu, razem z notami o późniejszych rozszerzeniach krojów, jest w źródle: https://dejavu-fonts.github.io/

## 4. Co z tego wynika

DESIGN.md na licencji CC BY 4.0:

- Inni mogą kopiować, rozpowszechniać i zmieniać DESIGN.md, także komercyjnie, jeśli podadzą autora, link do licencji i zaznaczą zmiany.
- Licencji nie da się odwołać wobec osób, które już dostały plik. Można tylko przestać go udostępniać.
- Licencja obejmuje treść DESIGN.md w zakresie praw, które przysługują właścicielowi. Nie obejmuje krojów pisma z sekcji 3.2 i 3.3, znaków towarowych ani pozostałych dokumentów projektu.

Kroje pisma:

- Kroje na licencji SIL OFL 1.1 można osadzać w aplikacji i rozpowszechniać razem z nią. Każda kopia plików krojów musi mieć notę o prawach autorskich i tekst licencji z sekcji 3.2.
- Samych krojów nie wolno sprzedawać osobno. Licencja krojów nie obejmuje dokumentów ani ekranów, które z nich korzystają.
- Jeśli aplikacja ma serwować kroje z własnego serwera zamiast z Google Fonts, pliki licencji trzeba dołączyć do katalogu z krojami.

To streszczenie warunków, a nie porada prawna. Wiążąca jest treść licencji z sekcji 3.
