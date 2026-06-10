# AI Complaint Board - Design Document

## 1. Purpose

The AI Complaint Board is a frontend-only community bulletin board where users can post short complaints about artificial intelligence. The interface is designed to feel like a physical corkboard with colorful sticky notes, while still providing familiar web interactions such as navigation, voting, editing, deleting, sorting, and pagination.

The current design is implemented as a low-/mid-fidelity HTML prototype in:

- `src/index.html` - main board screen
- `src/views.html` - screen prototypes for post detail, create, edit, and delete flows
- `src/style.css` - shared visual styling
- `src/script.js` - mock data rendering for the main board

## 2. Main Screens

### 2.1 Main Board

The main board is the application's landing screen. It shows a sticky header, a featured area for top complaints, a recent posts area, pagination, and a footer.

```text
+------------------------------------------------------------------+
| AI Complaint Board                         Top | Recent | + Post |
| A place to vent about AI                                      Views|
+------------------------------------------------------------------+

  Top Complaints                         Most popular this week

  +--------------------------------------------------------------+
  |                      CORKBOARD                               |
  |                                                              |
  |  +----------+  +----------+  +----------+  +----------+       |
  |  | #1       |  | #2       |  | #3       |  | #4       |       |
  |  | Sticky   |  | Sticky   |  | Sticky   |  | Sticky   |       |
  |  | Note     |  | Note     |  | Note     |  | Note     |       |
  |  | votes    |  | votes    |  | votes    |  | votes    |       |
  |  +----------+  +----------+  +----------+  +----------+       |
  |                                                              |
  +--------------------------------------------------------------+

  -------------------------- Recent Notes -------------------------

  Recent Posts                           Freshly pinned to the board

  +----------------+ +----------------+ +----------------+
  | Card note      | | Card note      | | Card note      |
  | votes + date   | | votes + date   | | votes + date   |
  +----------------+ +----------------+ +----------------+

                 [ Prev ]     Page 1 of 1     [ Next ]
```

Important elements:

- The header keeps the app title visible and gives access to the major areas.
- The top complaint area uses large, rotated sticky notes to emphasize popularity.
- The recent posts area uses a cleaner grid layout so many notes can be scanned quickly.
- Votes and dates are visible on both featured and recent notes.

### 2.2 Single Post View

The single post view opens the selected note as a larger modal over a blurred/dimmed corkboard background.

```text
+------------------------------------------------------------------+
| Board in background, dark overlay                                |
|                                                                  |
|                  +--------------------------------+              |
|                  | Complaint - Date            X  |              |
|                  |                                |              |
|                  | Large note title               |              |
|                  |                                |              |
|                  | Full complaint text preview    |              |
|                  |                                |              |
|                  | Up / Down votes    Edit Delete |              |
|                  +--------------------------------+              |
|                                                                  |
+------------------------------------------------------------------+
```

Purpose:

- Gives one complaint more space without navigating away from the board context.
- Keeps owner actions close to the content they affect.
- Uses the same sticky note visual language as the board.

### 2.3 Create Note View

The create view uses a blank sticky note as the input surface.

```text
+------------------------------------------------------------------+
| Board in background, dark overlay                                |
|                                                                  |
|                  +--------------------------------+              |
|                  | New complaint               X  |              |
|                  |                                |              |
|                  | [ Give it a title...       ]   |              |
|                  |                                |              |
|                  | [ What happened? Tell...   ]   |              |
|                  |                                |              |
|                  | Color:  o o o o o o            |              |
|                  |              Cancel   Post     |              |
|                  +--------------------------------+              |
|                                                                  |
+------------------------------------------------------------------+
```

Purpose:

- Writing directly onto a note reinforces the metaphor of pinning something to a board.
- Color selection gives users a simple way to personalize posts without adding complex options.
- The `Post` action is visually stronger than `Cancel`.

### 2.4 Edit Note View

The edit view reuses the enlarged sticky note pattern, but replaces read-only content with editable fields.

```text
+------------------------------------------------------------------+
| Board in background, selected note still visible behind overlay   |
|                                                                  |
|                  +--------------------------------+              |
|                  | Editing your note           X  |              |
|                  |                                |              |
|                  | [ Existing title           ]   |              |
|                  |                                |              |
|                  | [ Existing body text       ]   |              |
|                  |                                |              |
|                  | Color:  o o o o o o            |              |
|                  |              Cancel   Save     |              |
|                  +--------------------------------+              |
|                                                                  |
+------------------------------------------------------------------+
```

Purpose:

- Users edit the same object they originally posted, reducing context switching.
- The action layout mirrors the create view to make the form predictable.
- The selected note remains visible in the background to preserve spatial context.

### 2.5 Delete Confirmation

The delete confirmation is intentionally simple and uses stronger warning styling.

```text
+------------------------------------------------------------------+
| Board in background, dark overlay                                |
|                                                                  |
|                  +--------------------------------+              |
|                  |                             X  |              |
|                  |                                |              |
|                  |              Trash icon        |              |
|                  | Remove "Note title"?           |              |
|                  | This cannot be undone.         |              |
|                  |                                |              |
|                  |          Keep it   Delete it   |              |
|                  +--------------------------------+              |
|                                                                  |
+------------------------------------------------------------------+
```

Purpose:

- Prevents accidental deletion.
- Uses a clear destructive action and a safer alternative.
- Keeps the message short so the decision is easy to understand.

## 3. Navigation and Screen Flow

```text
Main Board
  |
  | click note
  v
Single Post
  |                 |
  | Edit            | Delete
  v                 v
Edit Note       Delete Confirmation
  |                 |
  | Save/Cancel     | Keep/Delete
  v                 v
Main Board <---------+

Main Board
  |
  | + Post Note
  v
Create Note
  |
  | Post/Cancel
  v
Main Board

Main Board
  |
  | Views link
  v
Prototype Views Page
  |
  | sub navigation tabs
  v
Single Post / Create / Edit / Delete examples
```

The main application flow should keep users on or near the board. Modal-style views are preferred over separate pages because notes are small objects that belong to a shared spatial board.

## 4. Design Decisions

### Corkboard Metaphor

The application uses a corkboard background, paper-like note colors, slight rotations, shadows, and folded note corners. This makes the board feel informal and community-driven instead of like a standard issue tracker or forum.

### Sticky Notes for Featured Content

Top complaints are displayed as larger sticky notes because they are the main content users should notice first. The ranking label (`#1`, `#2`, etc.) makes the popularity ordering understandable without requiring extra explanation.

### Card Grid for Recent Posts

Recent posts use a more regular grid. This is less expressive than the featured corkboard area, but it improves scanability when many notes are shown.

### Color Palette

The design uses warm browns for the board and header, combined with bright sticky note colors:

- Yellow, pink, blue, green, orange, and purple for note variety
- Dark brown for structure and contrast
- Muted tan text in secondary navigation and footer areas

The palette supports the physical noticeboard theme while keeping individual notes visually distinct.

### Typography

The prototype combines:

- `Caveat` for handwritten-style note titles and headings
- `Inter` for interface text, navigation, buttons, metadata, and controls

This separates expressive content from functional UI text.

### Voting

Votes are visible directly on each note. Upvotes and downvotes use green and red styling, which makes the interaction familiar and easy to understand.

### Modal Views

Single post, create, edit, and delete states are shown as enlarged sticky notes over the board. This keeps the interaction focused while preserving the feeling that the user is still working with one note on the same board.

## 5. Responsiveness

The current HTML/CSS prototype is primarily desktop-focused. It already uses flexible layout techniques in some areas:

- The top board uses flex wrapping for sticky notes.
- The recent posts section uses a responsive grid with `auto-fill` and `minmax`.
- Header and footer content can wrap when horizontal space becomes limited.
- Sticky note widths use `clamp()` in the featured area.

Planned responsive behavior:

- On tablet screens, keep the corkboard layout but reduce spacing and note sizes.
- On mobile screens, stack header navigation below the logo or convert it into a compact menu.
- Show notes in one or two columns depending on width.
- Make modal notes use most of the viewport width instead of fixed desktop dimensions.
- Increase touch target size for voting, close, save, cancel, and delete buttons.

## 6. Usability Notes

- The main actions are placed near the content they affect: vote buttons on notes, edit/delete in the single post view, save/cancel in forms.
- The destructive delete action is separated behind a confirmation screen.
- Reusing the same modal pattern for post detail, create, edit, and delete makes the interface predictable.
- The prototype includes `aria-label`, `role="dialog"`, and `aria-modal` attributes in modal examples to guide later accessibility implementation.
- Text is kept short on cards and notes to avoid overcrowding the board; longer content is handled in the enlarged post view.
- Search and sorting are planned core features from the project scope, but the current prototype focuses on the main board and note-management screens first.

## 7. Implementation Guidance

The design should guide the next implementation steps:

- Connect the `+ Post Note` button to the create note modal.
- Make sticky notes clickable and open the single post modal.
- Wire edit and delete actions only for notes owned by the current mock user.
- Implement sorting by popularity and recency using the mock note data.
- Add keyword search across note titles and descriptions.
- Add responsive CSS media queries for tablet and mobile layouts.
