import React from "react";
import MapRoute from "../components/Info/MapRoute";

const ComoChegar = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh]">
      <h1 className="p-4 mb-5 text-4xl text-[#b2af80]">Como Chegar</h1>

      <div className="w-[90vw] text-center md:text-left mt-4">
        <p>Digite aqui o local de partida para encontrar a melhor rota!</p>
      </div>

      <div className="w-[90vw] max-w-[95vw]">
        <MapRoute />
      </div>
    </div>
  );
};

export default ComoChegar;
