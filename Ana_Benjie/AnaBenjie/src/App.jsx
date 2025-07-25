import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from "./components/hero/Hero";
import InfoGeneral from "./components/Info/InfoGeneral";
import Dicas from "./pages/Dicas"; // importa sua nova página

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route
          path="/"
          element={
            <div className="w-full overflow-hidden text-xl">
              <Hero />
              <InfoGeneral />
            </div>
          }
        />

        {/* Página de dicas */}
        <Route path="/dicas" element={<Dicas />} />
      </Routes>
    </Router>
  );
}

export default App;
