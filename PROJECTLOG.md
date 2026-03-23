# Projectlog – Samen Verder
**CBS Op Dreef & OBS De Meerpaal, Bruinisse**

> Dit is een living document. Het wordt bijgehouden tijdens de ontwikkeling van de website.
> Elke wijziging, keuze en afweging wordt hier vastgelegd.

---

## Over dit project

| | |
|---|---|
| **Opdrachtgever** | CBS Op Dreef & OBS De Meerpaal, Bruinisse |
| **Doel** | Informatiewebsite voor ouders over een lopende verkenning naar samenwerking tussen beide scholen |
| **Doelgroep** | Ouders van leerlingen van beide scholen |
| **Taal** | Nederlands (B1-niveau) |
| **Status** | In ontwikkeling |
| **Gestart** | Maart 2026 |

---

## Kernprincipes

Deze principes gelden voor alle beslissingen over inhoud én design:

1. **Neutraliteit** — Geen van beide scholen krijgt voorrang. Altijd gelijkwaardig weergegeven.
2. **Eerlijkheid** — Duidelijk onderscheid tussen wat bekend is, wat onderzocht wordt en wat nog onbeslist is.
3. **Toegankelijkheid** — B1-taalniveau, korte zinnen, geen jargon.
4. **Vertrouwen** — Geen marketingtaal. Herhaal waar nodig: *"Dit is een verkenning. Er is nog geen besluit."*

---

## Bestandsstructuur

```
mijn-website/
├── index.html              ← Homepage (enige pagina tot nu toe)
├── styles.css              ← Alle CSS: tokens, componenten, secties
├── PROJECTLOG.md           ← Dit document
├── CLAUDE.md               ← Richtlijnen voor AI-assistent
└── brand_assets/
    ├── brand_guidelines_bruinisse.pdf   ← Merkrichtlijnen (nog niet leesbaar zonder poppler)
    ├── logo cbs op dreef.png
    └── logo obs de meerpaal .png
```

---

## Design systeem

### Kleuren

| Token | Waarde | Gebruik |
|---|---|---|
| `--color-blue-500` | `#2797BA` | Primaire kleur — knoppen, links, accenten |
| `--color-blue-50` | `#EEF7FC` | Lichte achtergronden, hero |
| `--color-blue-300` | `#5CB5D6` | Scheidingslijnen, rule-element |
| `--color-green-500` | `#4FA064` | Accent — spaarzaam gebruiken |
| `--color-green-50` | `#EAF5EE` | Groene callout-achtergronden |
| `--color-neutral-900` | `#1A252C` | Primaire tekstkleur |
| `--color-neutral-500` | `#6B7A84` | Subtekst, footer |

> **Herkomst:** Blauw is afgeleid van het logo van CBS Op Dreef (lichtblauwe tekst) en het blauwe vlak in het logo van OBS De Meerpaal. Groen sluit aan bij het groene driehoekje in het De Meerpaal-logo.

### Typografie

| | |
|---|---|
| **Font** | Inter (Google Fonts) |
| **Basisgrootte** | 18px — boven het minimum van WCAG AA |
| **Regelhoogte** | 1.75 — ruimte voor leesbaarheid |
| **H1** | Clamp 1.7rem → 2.4rem |
| **H2** | Clamp 1.3rem → 1.65rem |

### Ruimte & vorm

- **Spacing** — vaste schaal op basis van 4px (space-2 t/m space-40)
- **Radius** — `--radius-sm: 8px` t/m `--radius-xl: 28px` — zacht en afgerond
- **Schaduwen** — subtiel (shadow-xs t/m shadow-lg) — geen harde lijnen

---

## Paginastructuur – Homepage (`index.html`)

| # | Sectie | ID | Doel |
|---|---|---|---|
| — | Navigatie | — | Logo's beide scholen gelijkwaardig; sticky |
| 1 | Hero | — | Eerste indruk; badge "nog geen besluit"; twee knoppen |
| 2 | Video | `#video` | Uitlegvideo directeuren (placeholder) |
| 3 | Uitleg | `#uitleg` | Wat speelt er? Checklijst + twee callouts |
| 4 | Waarom | `#waarom` | Achtergrond in drie feitelijke kaarten |
| 5 | Mogelijkheden | — | Mogelijke voordelen — expliciet als mogelijkheden geframed |
| 6 | Tijdlijn | `#tijdlijn` | Vier fasen; fase 1 actief gemarkeerd |
| 7 | Voor ouders | — | Drie geruststelling-kaarten |
| 8 | FAQ | `#faq` | Vijf vragen, uitklapbaar (native `<details>`) |
| 9 | Contact | `#contact` | Formulier met schoolkeuze-dropdown |
| — | Footer | — | Logo's beide scholen gelijkwaardig; disclaimer |

---

## Wijzigingenlog

### v0.1 — Eerste opzet (18 maart 2026)

**Wat is gemaakt:**
- `index.html` — eerste versie als één groot bestand met inline CSS
- Alle negen secties aanwezig
- Beide logo's gelijkwaardig geplaatst in navigatie en footer
- Video-sectie met placeholder (URL nog in te vullen)
- FAQ met native `<details>` elementen
- Contactformulier met schoolkeuze-dropdown

**Notities:**
- PDF met merkrichtlijnen (`brand_guidelines_bruinisse.pdf`) kon niet worden gelezen (poppler-utils niet geïnstalleerd). Kleuren zijn afgeleid van de logo-bestanden.
- Screenshot-workflow met Puppeteer aangemaakt maar direct daarna bewust buiten scope geplaatst.

---

### v0.2 — Refactor: scheiding HTML en CSS (18 maart 2026)

**Wat is gewijzigd:**
- `styles.css` aangemaakt — alle CSS verplaatst uit `index.html`
- `index.html` herschreven: alleen nog semantische HTML, geen inline stijlen
- Design tokens volledig uitgewerkt in `styles.css` (`:root`)
- Componentnamen vereenvoudigd en consistenter gemaakt
- Semantic HTML verbeterd: `<header>`, `<main>`, `<footer>`, `<article>`, `<ol>` voor tijdlijn
- Mobiele navigatie verbeterd: `is-open`-klasse via JavaScript, `aria-expanded` correct bijgehouden
- FAQ-icoontje van `+/−` naar SVG-rotatie-animatie

**Waarom:**
- Één HTML-bestand van 49KB met inline CSS is niet onderhoudbaar
- Scheiding maakt toekomstige aanpassingen eenvoudiger
- Reusable components zijn nu daadwerkelijk herbruikbaar

---

### v0.3 — Bredere layout en vaste navigatie (18 maart 2026)

**Wat is gewijzigd:**
- `--container` vergroot van `740px` naar `960px`
- `--container-wide` vergroot van `1040px` naar `1280px`
- `--nav-height: 64px` toegevoegd als token
- Navigatie van `position: sticky` naar `position: fixed` — blijft altijd zichtbaar
- `body { padding-top: var(--nav-height) }` toegevoegd om te compenseren voor de vaste nav
- `scroll-margin-top` op alle secties met een ID — navigatielinks snijden kopteksten niet meer af

**Waarom:**
- Op bredere beeldschermen bleef te veel witruimte aan de zijkanten
- Klant vroeg expliciet om een altijd-zichtbaar menu

---

### v0.4 — Contactformulier gekoppeld aan Formsubmit (18 maart 2026)

**Wat is gewijzigd:**
- Formulier `action` gekoppeld aan `https://formsubmit.co/directie@cbsopdreef.nl`
- CC ingesteld op `c.segers@obase.nl` via hidden field `_cc`
- Onderwerpregel ingesteld: *"Nieuwe vraag via de website – Samen Verder"*
- E-mails worden opgemaakt als overzichtelijke tabel (`_template: table`)
- Na verzending wordt de bezoeker doorgestuurd naar `bedankt.html`
- `bedankt.html` aangemaakt — zelfde huisstijl als de homepage

**Hoe Formsubmit werkt:**
- Geen account nodig, geen betaling
- Bij de **eerste inzending** stuurt Formsubmit een activatiemail naar `directie@cbsopdreef.nl`
- Die mail moet **eenmalig bevestigd worden** via de link erin
- Daarna werkt het formulier direct

**Ontvangers:**
| Adres | Rol |
|---|---|
| `directie@cbsopdreef.nl` | Primaire ontvanger |
| `c.segers@obase.nl` | CC (ontvangt altijd een kopie) |

---

## Openstaande punten

- [ ] Video-URL invullen in `index.html` (zie commentaar in sectie #video)
- [ ] PDF merkrichtlijnen lezen zodra poppler beschikbaar is — kleuren eventueel bijstellen
- [ ] Formulier koppelen aan backend of e-mailservice (bijv. Formspree, Netlify Forms)
- [ ] Favicon toevoegen
- [ ] Pagina's toevoegen: Uitleg, Toekomstperspectief, Tijdlijn, FAQ, Updates, Contact
- [ ] Echte foto's toevoegen (authentiek, geen stockfoto's — zie CLAUDE.md)
- [ ] Toegankelijkheid testen: tabvolgorde, contrast, schermlezer

---

## Afspraken over toon en inhoud

Zolang er geen officieel besluit is, geldt altijd:

- Gebruik **"we verkennen"** — niet "we gaan"
- Gebruik **"mogelijk"** bij voordelen — niet "zal"
- Herhaal regelmatig: **"Er is nog geen besluit genomen"**
- Beide scholen **altijd gelijkwaardig** noemen — nooit de ene voor de andere

---

## Overdracht aan klant

*Dit onderdeel wordt aangevuld zodra de website klaar is voor overdracht.*

- Hosting: _nog te bepalen_
- Domeinnaam: _nog te bepalen_
- CMS: _nog te bepalen_ (website is nu statische HTML — eventueel uitbreidbaar)
- Beheer contactformulier: _nog te bepalen_
- Toegang logo-bestanden: beschikbaar in `brand_assets/`
