import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TutorialPage from "./pages/TutorialPage";
import VisualLabsPage from "./pages/VisualLabsPage";
import ExampleLibraryPage from "./pages/ExampleLibraryPage";
import PracticePage from "./pages/PracticePage";
import GlossaryPage from "./pages/GlossaryPage";
import ReferencesPage from "./pages/ReferencesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tutorial" element={<TutorialPage />} />
        <Route path="labs" element={<VisualLabsPage />} />
        <Route path="examples" element={<ExampleLibraryPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="glossary" element={<GlossaryPage />} />
        <Route path="references" element={<ReferencesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
