import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Hero } from "./components/hero/Hero";
import InfoGeneral from "./components/Info/InfoGeneral";
import Dicas from "./pages/Dicas"; // importa sua nova página
import ComoChegar from "./pages/ComoChegar";
import Citacao from "./components/citacao/Citacao";
import Countdown from "./components/countdown/Countdown"

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full overflow-hidden text-xl flex flex-col items-center">
              <Hero />
              <InfoGeneral />
              <Citacao />
              <Countdown />
            </div>
          }
        />

        <Route path="/dicas" element={<Dicas />} />
        <Route path="/comoChegar" element={<ComoChegar />} />
      </Routes>
    </Router>
  );
}

export default App;
