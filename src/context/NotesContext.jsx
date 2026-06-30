import { createContext, useContext, useState } from "react";
import { NOTES } from "../data/notes";

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(NOTES); // This is the full list of notes
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(50); // Changed to 50 notes per page

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

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

  const handleVote = (id, next, prev) => {
    setNotes((current) =>
      current.map((note) => {
        if (note.id !== id) return note;
        const updated = { ...note };
        if (next) updated[next] = note[next] + 1;
        if (prev) updated[prev] = note[prev] - 1;
        return updated;
      })
    );
  };

  return (
    <NotesContext.Provider
      value={{
        paginatedNotes: currentNotes,
        allNotes: notes, // Provide all notes for "Top Complaints"
        totalNotes: notes.length,
        notesPerPage,
        currentPage,
        paginate,
        handleAdd,
        handleDelete,
        handleSave,
        handleVote,
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