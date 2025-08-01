import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Hero } from "./components/hero/Hero";
import InfoGeneral from "./components/Info/InfoGeneral";
import Dicas from "./pages/Dicas"; // importa sua nova página
import ComoChegar from "./pages/ComoChegar";
import Citacao from "./components/citacao/Citacao";
import Countdown from "./components/countdown/Countdown"
import Gallery from "./components/gallery/Gallery";
import Confirmation from "./components/confirmation/Confirmation";
import ListRegalos from "./components/listaRegalos/ListRegalos";
import Footer from "./components/footer/Footer";
import FormConfirm from "./pages/FormConfirm"
import SearchGuest from "./components/confirmation/SearchGuest";
import MessageSorry from "./components/confirmation/messageSorry";
import ResponseReport from "./pages/ResponseReport";

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
              <Gallery />
              <Confirmation />
              <ListRegalos />
              <Footer />
            </div>
          }
        />

        <Route path="/dicas" element={<Dicas />} />
        <Route path="/comoChegar" element={<ComoChegar />} />
        <Route path="/formsConfirmation" element={<FormConfirm />} />
        <Route path="/searchGuest" element={<SearchGuest />} />
        <Route path="/messageSorry" element={<MessageSorry />} />
        <Route path="/responseReport" element={<ResponseReport />} />
      </Routes>
    </Router>
  );
}

export default App;
