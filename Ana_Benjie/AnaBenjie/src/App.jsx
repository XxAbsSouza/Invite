import React from "react";
import { Hero } from "./components/hero/Hero";
import InfoGeneral from "./components/Info/InfoGeneral";


function App() {
  return (
    <div className=" w-full overflow-hidden text-xl">
      <Hero />
      <InfoGeneral />
    </div>
  );
}

export default App;
