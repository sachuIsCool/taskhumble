import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ConfigPage from "./pages/ConfigPage";
import OutputPage from "./pages/OutputPage";
import "./index.css"; // Import Tailwind styles

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-5">
        <nav className="flex justify-center gap-5 mb-5">
          <Link
            to="/"
            className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
          >
            Config Page
          </Link>
          <Link
            to="/output"
            className="text-white bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded"
          >
            Output Page
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<ConfigPage />} />
          <Route path="/output" element={<OutputPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
