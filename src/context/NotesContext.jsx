import { createContext, useContext, useState } from "react";
import { NOTES, USERS } from "../data/notes";

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(NOTES);
  const [votes, setVotes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(50);
  const [currentUser, setCurrentUser] = useState(USERS[0]);

  const notesByDate = [...notes].sort((a, b) => new Date(b.date) - new Date(a.date));
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notesByDate.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAdd = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSave = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const getUserVote = (noteId) => votes[noteId]?.[currentUser] ?? null;

  const handleVote = (noteId, direction) => {
    const prevVote = getUserVote(noteId);
    const nextVote = prevVote === direction ? null : direction;

    setVotes((prev) => {
      const noteVotes = { ...(prev[noteId] || {}) };
      if (nextVote === null) {
        delete noteVotes[currentUser];
      } else {
        noteVotes[currentUser] = nextVote;
      }
      return { ...prev, [noteId]: noteVotes };
    });

    setNotes((current) =>
      current.map((note) => {
        if (note.id !== noteId) return note;
        const updated = { ...note };
        if (prevVote) updated[prevVote] = note[prevVote] - 1;
        if (nextVote) updated[nextVote] = note[nextVote] + 1;
        return updated;
      })
    );
  };

  return (
    <NotesContext.Provider
      value={{
        paginatedNotes: currentNotes,
        allNotes: notes,
        totalNotes: notes.length,
        notesPerPage,
        currentPage,
        paginate,
        currentUser,
        setCurrentUser,
        handleAdd,
        handleDelete,
        handleSave,
        handleVote,
        getUserVote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
