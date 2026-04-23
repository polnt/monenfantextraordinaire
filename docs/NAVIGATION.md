# Navigation structure

```
Navbar (left to right)
├── Home            → simple button → home page
│
├── Comprendre      → simple button → page with 3 tabs:
│                        • Trouble du développement
│                        • L'autisme de A à Z
│                        • Trouble de l'attention
│
├── Aider           → simple button → page with 4 tabs:
│                        • Les parents
│                        • Les professionnels
│                        • Les méthodes
│                        • Les outils de communication
│
├── Outils          → simple button → shop page (tools, activity books, worksheets)
│
├── Ressources      → simple button → free readable content page
│
├── Formations      → simple button → formations page (top-level, distinct from Outils)
│
└── ⋮               → vertical three-dot icon → dropdown:
                         • Le site
                         • Qui suis-je ?
                         • Contact
                         • FAQ
```

## Design notes

- **Comprendre**: replaces "Comprendre l'autisme" — shorter, broader scope (covers all neurodevelopmental disorders). Tabs are within the page, not separate navbar links.
- **Aider**: replaces "Comment l'aider" — shorter, more direct. Same tab pattern.
- **Outils**: replaces "Boutique" — emphasises pedagogical nature of products over transactional framing.
- **Formations**: new top-level item — previously buried inside the shop. Elevated to signal it as a core offer, distinct from downloadable tools.
- **⋮ (about)**: vertical three-dot icon triggers a dropdown grouping secondary pages to keep the main navbar clean.
