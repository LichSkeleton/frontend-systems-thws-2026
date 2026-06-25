import { createContext, useContext, useState } from "react";
import { NOTES } from "../data/notes";

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(NOTES);

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
    <NotesContext.Provider value={{ notes, handleAdd, handleDelete, handleSave, handleVote }}>
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
