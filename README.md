# AI Complaint Board

## Getting Started

This project is a React app built with Vite.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

### Project Structure

```
src/
  pages/
    HomePage.jsx        — corkboard with top complaints and paginated recent posts
    SearchPage.jsx      — keyword and username search across all notes
    MyNotesPage.jsx     — filtered view of the current user's notes
    ConsensusPage.jsx   — public opinion stats and live Guardian API news feed
  components/
    Header.jsx          — sticky nav with user switcher
    Footer.jsx          — team info
    StickyNote.jsx      — individual note card
    VoteButtons.jsx     — per-user up/down voting
    NoteOverlays.jsx    — create, edit, delete, and single-post modals
  context/
    NotesContext.jsx    — global state (notes, votes, current user, pagination)
  data/
    notes.js            — 150 mock notes with USERS and tilt constants
  styles/
    views.css           — board and overlay styles
    consensus.css       — consensus page styles
  style.css             — global styles and design tokens
```

## Team Members

| Name | Email | ID |
|---|---|---|
| Mallory Whitt | mallory.whitt@study.thws.de | 10012893 |
| Timo Brand | timo.brand@study.thws.de | 5124078 |
| Vladyslav Zaplitnyi | vladyslav.zaplitnyi@study.thws.de | 10012743 |

## Project Description

A community bulletin board where users post sticky notes voicing complaints about the effects of AI. The board is styled to resemble a physical corkboard with colorful, randomly-colored sticky notes. Users can upvote or downvote notes on a per-user basis. Top-rated notes appear in a dedicated section at the top. Recent posts are paginated and sorted newest-first.

## Target Users and Goals

The bulletin board is built for the general public, with a focus on younger users. The goal is to give people a shared space to voice concerns about artificial intelligence and have those perspectives seen and engaged with by a broader community.

## Core Features

- Create, edit, and delete sticky notes (with form validation)
- Top Complaints section showing the 5 highest net-voted notes
- Paginated recent posts board sorted by date (newest first)
- Per-user thumbs-up/thumbs-down voting (one vote per note per simulated user)
- Simulated login with three user accounts via a dropdown switcher
- My Notes page showing only the current user's posts
- Keyword and username search across all notes
- Public Consensus page with research statistics and live Guardian API news feed

## Backend

Data is mocked locally in `src/data/notes.js`. The Guardian Open Platform API is used for live AI news articles on the Consensus page.

## Project Scope

This is a frontend-only project with no persistent backend or real authentication. The platform is built for general community use, centered on note management, voting, and public opinion data. Features such as real user accounts, commenting, and persistent data storage are outside the scope of this project.

#### Acknowledging AI Technologies

This project was developed with the support of Claude Code (Anthropic). The tool was used to assist with code implementation, debugging, and content research. All project-specific decisions, feature design, and final review were carried out by the team.
