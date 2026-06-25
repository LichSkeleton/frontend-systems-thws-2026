import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ViewsPage from "./pages/ViewsPage";

export default function App() {
  return (
    <BrowserRouter>
      <NotesProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/views" element={<ViewsPage />} />
        </Routes>
      </NotesProvider>
    </BrowserRouter>
  );
}
