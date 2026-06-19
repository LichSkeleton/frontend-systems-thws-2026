# React Scaffold Documentation

## 1. Project Structure

```
frontendsystems/
├── index.html              # Vite entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite + React plugin configuration
├── src/
│   ├── main.jsx            # React root mount
│   ├── App.jsx             # Router setup (BrowserRouter, Routes)
│   ├── style.css           # Global styles (board, notes, header, footer)
│   ├── data/
│   │   └── notes.js        # Static mock data (30 notes) and tilt angles
│   ├── utils/
│   │   └── formatDate.js   # Date formatting helper
│   ├── components/
│   │   ├── Header.jsx        # Shared header with nav and post button
│   │   ├── Footer.jsx        # Shared footer
│   │   ├── StickyNote.jsx    # Featured note card (corkboard area)
│   │   ├── RecentCard.jsx    # Recent posts grid card
│   │   ├── VoteButtons.jsx   # Up/down vote display
│   │   └── NoteOverlays.jsx  # SinglePostOverlay, CreateNoteOverlay, EditNoteOverlay, DeleteNoteOverlay
│   ├── pages/
│   │   ├── HomePage.jsx    # Main board + overlay state management
│   │   └── ViewsPage.jsx   # Scrollable reference prototype for all four CRUD views
│   └── styles/
│       └── views.css       # Overlay and views-page styles
└── docs/
    ├── design-draft-portfolio-submission.md
    └── react-scaffold-documentation.md
```

---

## 2. Key Components and Views Already Implemented

### Pages

**HomePage** (`/`)
Renders the main corkboard. The top section shows the six highest-ranked notes as large rotated sticky notes. Below a divider, a responsive grid shows notes as compact recent cards with pagination controls. `HomePage` also owns the overlay state: it tracks which overlay is active (`single`, `create`, `edit`, `delete`) and which note is selected, then renders the appropriate overlay component.

**ViewsPage** (`/views`)
A scrollable reference prototype that shows all four CRUD patterns side by side. A sticky sub-navigation highlights the active section using `IntersectionObserver`.

### Components

| Component | What it does |
|---|---|
| `Header` | Site title; anchor links to `#top-section` and `#recent-section`; React Router link to `/views`; "+ Post Note" button that triggers the create overlay via `onCreateNote` prop |
| `StickyNote` | Featured note with rank badge, colour class, randomised tilt, vote counts, and `onClick` prop |
| `RecentCard` | Compact grid card with colour, title, votes, date, and `onClick` prop |
| `Footer` | Minimal branded footer |
| `VoteButtons` | Renders up/down vote counts from props |
| `NoteOverlays` | Module containing all four overlay components: `SinglePostOverlay` (full note view with Edit/Delete actions), `CreateNoteOverlay` (blank form with colour swatches), `EditNoteOverlay` (pre-filled form), and `DeleteNoteOverlay` (confirmation dialog) |

### Interaction Flow

Clicking any sticky note or recent card opens `SinglePostOverlay`. From there the user can transition to `EditNoteOverlay` or `DeleteNoteOverlay`. Clicking "+ Post Note" in the header opens `CreateNoteOverlay`. All overlays close on the × button or a click outside the modal. This covers the four views specified in the design draft.

---

## 3. Technical Decisions Made So Far

- **Mocked backend data** — all note data is hardcoded in `src/data/notes.js`. This was a deliberate choice to keep the prototype self-contained and focus development effort on the UI rather than an API layer.
- **Mobile responsiveness deferred** — the current priority was getting the corkboard aesthetic right: realistic sticky-note styling, tilt angles, colour palette, and the modal overlay. Responsive breakpoints for tablet and phone will be addressed once the core desktop layout is stable.
- **Modal overlay for realism** — CRUD interactions (view, create, edit, delete) are handled through full-screen modal overlays rather than separate pages. This mirrors how a real board feels and keeps the user anchored to the board while interacting with a note.
- **`activeView` + `selectedNote` state in `HomePage`** — a single string (`activeView`) and a note object (`selectedNote`) drive which overlay is shown and for which note. This means the entire interaction flow — opening a post, switching to edit, confirming a delete — is controlled from one place without a global state library.
- **Overlay components in `src/components/`** — the four modal overlays (`NoteOverlays.jsx`) were moved out of `ViewsPage.jsx` into the components folder. This keeps `ViewsPage` as a pure page file and makes the overlays importable from anywhere without creating a dependency on a page module.
- **`/views` kept as a live reference prototype** — the Views page remains accessible via the header and continues to show static mockups of all four CRUD interactions. This serves as an ongoing design reference while the real interactive versions are developed on the main board.
- **Plain CSS, no framework** — styles are split into `style.css` (global layout, board, notes, header) and `views.css` (overlays and the views prototype page). This keeps concerns separated and avoids the overhead of a utility-class framework.

---

## 4. Open Issues and Next Steps

| Area | Status / What's missing |
|---|---|
| **Form submission** | Inputs in Create and Edit overlays are rendered but read-only; "Post" and "Save" close the modal without mutating data |
| **Delete action** | "Yes, delete it" closes the modal but does not remove the note from the list |
| **Vote buttons** | Display counts from mock data; clicking does not update state |
| **Pagination** | Controls are rendered but hardcoded to "Page 1 of 1" |
| **Sorting** | No sort-by-popularity or sort-by-recency controls exist yet |
| **Search** | Not started |
| **Mobile layout** | Overlay sizing is responsive; the corkboard grid and header still need media queries for tablet and phone breakpoints |
| **Accessibility** | Overlays use `role="dialog"` and `aria-modal`; focus trapping and Escape-key dismissal are not yet implemented |

The immediate next steps are wiring up React state so that create, edit, and delete actions actually modify the displayed note list, followed by making vote buttons interactive and adding sort controls.
