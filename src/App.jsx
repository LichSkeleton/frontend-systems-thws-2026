import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MyNotesPage from "./pages/MyNotesPage";
import ConsensusPage from "./pages/ConsensusPage";

export default function App() {
  return (
    <BrowserRouter>
      <NotesProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/my-notes" element={<MyNotesPage />} />
          <Route path="/consensus" element={<ConsensusPage />} />
        </Routes>
      </NotesProvider>
    </BrowserRouter>
  );
}
