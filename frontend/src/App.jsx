
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FormPage from "./pages/FormPage";
import SubmissionsPage from "./pages/SubmissionsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white px-6 py-3 shadow">
          <div className="max-w-4xl mx-auto flex gap-4">
            <Link to="/" className="font-semibold text-blue-600">Form</Link>
            <Link to="/submissions" className="font-semibold text-gray-700">Submissions</Link>
          </div>
        </nav>

        <main className="py-8">
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/submissions" element={<SubmissionsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

