import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewsPage from "./pages/ViewsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/views" element={<ViewsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
