import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyNote from "../components/StickyNote";
import { RECENT_TILTS } from "../data/notes";
import { useNotes } from "../context/NotesContext";
import {
  CreateNoteOverlay,
  DeleteNoteOverlay,
  EditNoteOverlay,
  SinglePostOverlay,
} from "../components/NoteOverlays.jsx";
import "../styles/views.css";

const NOTE_COLORS = ["yellow", "pink", "blue", "green", "orange", "purple"];

const SORT_OPTIONS = {
  recent: "Most Recent",
  oldest: "Oldest First",
  popular: "Most Popular (Upvotes)",
  netScore: "Highest Net Score",
  controversial: "Most Controversial",
  titleAsc: "Title A → Z",
  titleDesc: "Title Z → A",
};

const SCOPE_OPTIONS = {
  all: "Title, description & author",
  title: "Title only",
  description: "Description only",
  author: "Author only",
};

const DEFAULT_FILTERS = {
  sortBy: "recent",
  authorFilter: "",
  colorFilter: "",
  dateFrom: "",
  dateTo: "",
  minUpvotes: "",
  searchScope: "all",
  hideNegative: false,
  hideZeroVotes: false,
  myNotesOnly: false,
};

const NOTES_PER_PAGE = 50;

function applyFiltersAndSort(notes, query, filters, currentUser) {
  const term = query.trim();
  const matched = term
    ? filterByKeyword(notes, query, filters.searchScope)
    : notes;

  const filtered = applyToggleFilters(
    applyMinUpvotesFilter(
      applyDateRangeFilter(
        applyColorFilter(applyAuthorFilter(matched, filters.authorFilter), filters.colorFilter),
        filters.dateFrom,
        filters.dateTo
      ),
      filters.minUpvotes
    ),
    { ...filters, currentUser }
  );
  return sortNotes(filtered, filters.sortBy);
}

function filterByKeyword(notes, query, scope) {
  const term = query.trim().toLowerCase();

  return notes.filter((note) => {
    const title = note.title.toLowerCase();
    const description = note.description.toLowerCase();
    const author = (note.author || "").toLowerCase();

    switch (scope) {
      case "title":
        return title.includes(term);
      case "description":
        return description.includes(term);
      case "author":
        return author.includes(term);
      default:
        return title.includes(term) || description.includes(term) || author.includes(term);
    }
  });
}

function applyAuthorFilter(notes, author) {
  if (!author) return notes;
  return notes.filter((note) => note.author === author);
}

function applyColorFilter(notes, color) {
  if (!color) return notes;
  return notes.filter((note) => note.color === color);
}

function applyDateRangeFilter(notes, dateFrom, dateTo) {
  let result = notes;
  if (dateFrom) {
    const from = new Date(dateFrom);
    result = result.filter((note) => new Date(note.date) >= from);
  }
  if (dateTo) {
    const to = new Date(dateTo);
    result = result.filter((note) => new Date(note.date) <= to);
  }
  return result;
}

function applyMinUpvotesFilter(notes, minUpvotes) {
  const min = Number(minUpvotes);
  if (!minUpvotes || Number.isNaN(min) || min <= 0) return notes;
  return notes.filter((note) => note.up >= min);
}

function applyToggleFilters(notes, { hideNegative, hideZeroVotes, myNotesOnly, currentUser }) {
  let result = notes;
  if (hideNegative) {
    result = result.filter((note) => note.up >= note.down);
  }
  if (hideZeroVotes) {
    result = result.filter((note) => note.up > 0 || note.down > 0);
  }
  if (myNotesOnly && currentUser) {
    result = result.filter((note) => note.author === currentUser);
  }
  return result;
}

function sortNotes(notes, sortBy) {
  const sorted = [...notes];
  const net = (n) => n.up - n.down;

  switch (sortBy) {
    case "oldest":
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "popular":
      sorted.sort((a, b) => b.up - a.up || b.down - a.down);
      break;
    case "netScore":
      sorted.sort((a, b) => net(b) - net(a) || b.up - a.up);
      break;
    case "controversial":
      sorted.sort(
        (a, b) =>
          b.down - a.down || Math.abs(net(b)) - Math.abs(net(a)) || b.up + b.down - (a.up + a.down)
      );
      break;
    case "titleAsc":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "titleDesc":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return sorted;
}

function countActiveFilters(filters) {
  let count = 0;
  if (filters.authorFilter) count += 1;
  if (filters.colorFilter) count += 1;
  if (filters.dateFrom || filters.dateTo) count += 1;
  if (filters.minUpvotes) count += 1;
  if (filters.searchScope !== "all") count += 1;
  if (filters.hideNegative) count += 1;
  if (filters.hideZeroVotes) count += 1;
  if (filters.myNotesOnly) count += 1;
  return count;
}

export default function SearchPage() {
  const { allNotes, handleAdd, handleDelete, handleSave, currentUser } = useNotes();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [activeView, setActiveView] = useState(null);

  const authors = useMemo(
    () => [...new Set(allNotes.map((n) => n.author).filter(Boolean))].sort(),
    [allNotes]
  );

  const dateBounds = useMemo(() => {
    const dates = allNotes.map((n) => n.date).filter(Boolean).sort();
    return { min: dates[0] ?? "", max: dates[dates.length - 1] ?? "" };
  }, [allNotes]);

  const activeFilterCount = countActiveFilters(filters);
  const hasNonDefaultSort = filters.sortBy !== DEFAULT_FILTERS.sortBy;

  const selectedNote = allNotes.find((n) => n.id === selectedNoteId) ?? null;
  const trimmedQuery = query.trim();

  const allResults = useMemo(
    () => applyFiltersAndSort(allNotes, query, filters, currentUser),
    [allNotes, query, filters, currentUser]
  );

  const totalPages = Math.max(1, Math.ceil(allResults.length / NOTES_PER_PAGE));

  useEffect(() => {
    setPage(1);
  }, [query, filters]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageResults = useMemo(() => {
    const start = (page - 1) * NOTES_PER_PAGE;
    return allResults.slice(start, start + NOTES_PER_PAGE);
  }, [allResults, page]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setAdvancedOpen(false);
  };

  const closeView = () => setActiveView(null);

  const handleSingleViewClick = (note) => {
    setSelectedNoteId(note.id);
    setActiveView("single");
  };

  const handleAddNote = (newNote) => {
    handleAdd(newNote);
    closeView();
  };

  const handleDeleteNote = (id) => {
    handleDelete(id);
    closeView();
  };

  const handleSaveNote = (updatedNote) => {
    handleSave(updatedNote);
    closeView();
  };

  return (
    <>
      <Header onCreateNote={() => setActiveView("create")} />
      <main style={{ flex: 1 }}>
        <section className="board-section search-section">
          <div className="section-heading">
            <h2>Search Notes</h2>
            <span className="section-sub">Find complaints by keyword or username</span>
          </div>

          <form
            className="search-bar"
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <label htmlFor="note-search" className="search-label">
              Search
            </label>
            <div className="search-input-wrap">
              <span className="search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                id="note-search"
                type="search"
                className="search-input"
                placeholder="Search titles, descriptions, or usernames..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  ×
                </button>
              )}
            </div>
          </form>

          <div className="search-controls" aria-label="Sort and filter options">
            <div className="search-controls-toolbar">
              <div className="search-control-group">
                <label htmlFor="search-sort" className="search-control-label">
                  Sort by
                </label>
                <select
                  id="search-sort"
                  className="search-control-select"
                  value={filters.sortBy}
                  onChange={(e) => updateFilter("sortBy", e.target.value)}
                >
                  {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-control-group">
                <label htmlFor="search-author" className="search-control-label">
                  Author
                </label>
                <select
                  id="search-author"
                  className="search-control-select"
                  value={filters.authorFilter}
                  onChange={(e) => updateFilter("authorFilter", e.target.value)}
                >
                  <option value="">All Authors</option>
                  {authors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-controls-actions">
                <button
                  type="button"
                  className={`search-advanced-toggle${advancedOpen ? " is-open" : ""}`}
                  aria-expanded={advancedOpen}
                  aria-controls="search-advanced-panel"
                  onClick={() => setAdvancedOpen((open) => !open)}
                >
                  Advanced filters
                  {activeFilterCount > 0 && (
                    <span className="search-filter-badge">{activeFilterCount}</span>
                  )}
                </button>
                {(activeFilterCount > 0 || hasNonDefaultSort) && (
                  <button type="button" className="search-reset-btn" onClick={resetFilters}>
                    Reset all
                  </button>
                )}
              </div>
            </div>

            <div
              id="search-advanced-panel"
              className={`search-controls-advanced${advancedOpen ? " is-open" : ""}`}
            >
              <div className="search-control-group">
                <label htmlFor="search-scope" className="search-control-label">
                  Search in
                </label>
                <select
                  id="search-scope"
                  className="search-control-select"
                  value={filters.searchScope}
                  onChange={(e) => updateFilter("searchScope", e.target.value)}
                >
                  {Object.entries(SCOPE_OPTIONS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-control-group">
                <label htmlFor="search-color" className="search-control-label">
                  Note color
                </label>
                <select
                  id="search-color"
                  className="search-control-select"
                  value={filters.colorFilter}
                  onChange={(e) => updateFilter("colorFilter", e.target.value)}
                >
                  <option value="">All Colors</option>
                  {NOTE_COLORS.map((color) => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-control-group">
                <label htmlFor="search-date-from" className="search-control-label">
                  From date
                </label>
                <input
                  id="search-date-from"
                  type="date"
                  className="search-control-input"
                  value={filters.dateFrom}
                  min={dateBounds.min}
                  max={filters.dateTo || dateBounds.max}
                  onChange={(e) => updateFilter("dateFrom", e.target.value)}
                />
              </div>

              <div className="search-control-group">
                <label htmlFor="search-date-to" className="search-control-label">
                  To date
                </label>
                <input
                  id="search-date-to"
                  type="date"
                  className="search-control-input"
                  value={filters.dateTo}
                  min={filters.dateFrom || dateBounds.min}
                  max={dateBounds.max}
                  onChange={(e) => updateFilter("dateTo", e.target.value)}
                />
              </div>

              <div className="search-control-group">
                <label htmlFor="search-min-upvotes" className="search-control-label">
                  Min upvotes
                </label>
                <input
                  id="search-min-upvotes"
                  type="number"
                  className="search-control-input"
                  min="0"
                  step="1"
                  placeholder="e.g. 50"
                  value={filters.minUpvotes}
                  onChange={(e) => updateFilter("minUpvotes", e.target.value)}
                />
              </div>

              <div className="search-toggles-row">
                <label className="search-control-toggle">
                  <input
                    type="checkbox"
                    checked={filters.hideNegative}
                    onChange={(e) => updateFilter("hideNegative", e.target.checked)}
                  />
                  <span>Hide negatively voted notes</span>
                </label>
                <label className="search-control-toggle">
                  <input
                    type="checkbox"
                    checked={filters.hideZeroVotes}
                    onChange={(e) => updateFilter("hideZeroVotes", e.target.checked)}
                  />
                  <span>Hide notes with no votes</span>
                </label>
                <label className="search-control-toggle">
                  <input
                    type="checkbox"
                    checked={filters.myNotesOnly}
                    onChange={(e) => updateFilter("myNotesOnly", e.target.checked)}
                  />
                  <span>My notes only ({currentUser})</span>
                </label>
              </div>
            </div>
          </div>

          <div className="corkboard search-results-board">
            <div className="board-ribbon">
              {trimmedQuery ? (
                <>
                  {allResults.length === 1
                    ? `1 match for "${trimmedQuery}"`
                    : `${allResults.length} matches for "${trimmedQuery}"`}
                  {activeFilterCount > 0 && " · filters applied"}
                </>
              ) : (
                <>
                  {allResults.length === 1 ? "1 note" : `${allResults.length} notes`}
                  {activeFilterCount > 0 ? " · filters applied" : " · browse all"}
                </>
              )}
            </div>
            {pageResults.length > 0 ? (
              pageResults.map((note, i) => (
                <StickyNote
                  key={note.id}
                  note={note}
                  tiltDeg={RECENT_TILTS[i % RECENT_TILTS.length]}
                  onClick={() => handleSingleViewClick(note)}
                />
              ))
            ) : (
              <p className="search-empty">
                {trimmedQuery
                  ? "No notes match your search and filters. Try adjusting your criteria."
                  : "No notes match your filters. Try adjusting your criteria."}
              </p>
            )}
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              className="btn-pagination"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className="btn-pagination"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </main>
      <Footer />
      {activeView === "single" && (
        <SinglePostOverlay
          note={selectedNote}
          onClose={closeView}
          onEdit={() => setActiveView("edit")}
          onDelete={() => setActiveView("delete")}
        />
      )}
      {activeView === "create" && (
        <CreateNoteOverlay onClose={closeView} onAdd={handleAddNote} />
      )}
      {activeView === "edit" && (
        <EditNoteOverlay note={selectedNote} onClose={closeView} onSave={handleSaveNote} />
      )}
      {activeView === "delete" && (
        <DeleteNoteOverlay
          note={selectedNote}
          onClose={closeView}
          onConfirm={handleDeleteNote}
        />
      )}
    </>
  );
}
