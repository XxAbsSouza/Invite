import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import NavBar from "./components/navbar/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import { Hero } from "./components/hero/Hero";
import InfoGeneral from "./components/Info/InfoGeneral";
import Dicas from "./pages/Dicas";
import ComoChegar from "./pages/ComoChegar";
import Citacao from "./components/citacao/Citacao";
import Countdown from "./components/countdown/Countdown";
import Gallery from "./components/gallery/Gallery";
import Confirmation from "./components/confirmation/Confirmation";
import ListRegalos from "./components/listaRegalos/ListRegalos";
import Footer from "./components/footer/Footer";
import FormConfirm from "./pages/FormConfirm";
import SearchGuest from "./components/confirmation/SearchGuest";
import MessageSorry from "./components/confirmation/MessageSorry";
import ResponseReport from "./pages/ResponseReport";


import "./App.css";


// Componente base de layout
const BaseLayout = ({ showConfirmation = false, showFooter = false }) => (
  <div className="w-full text-xl flex flex-col items-center">
    <Outlet />
    <div className="w-2/4 my-5 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>

    {showConfirmation && <Confirmation />}
    <ListRegalos />
    {showFooter && <Footer />}
  </div>
);

function App() {
  return (
    <Router>
      <NavBar />
      <ScrollToTop />
      <MusicPlayer />
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full overflow-hidden text-xl flex flex-col items-center">
              <Hero  />
              <InfoGeneral  />
              <Citacao />
              <Countdown />
              <Gallery />
              <Confirmation />
              <ListRegalos />
              <Footer />
            </div>
          }
        />

        <Route element={<BaseLayout />}>
          <Route path="/messageSorry" element={<MessageSorry />} />
        </Route>

        <Route element={<BaseLayout showFooter />}>
          <Route path="/searchGuest" element={<SearchGuest />} />
          <Route path="/responseReport" element={<ResponseReport />} />
          <Route path="/formsConfirmation" element={<FormConfirm />} />
        </Route>

        <Route element={<BaseLayout showConfirmation showFooter />}>
          <Route path="/dicas" element={<Dicas />} />
          <Route path="/comoChegar" element={<ComoChegar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
