import React from "react";
import MapRoute from "../components/Info/MapRoute";
import { assets } from "../assets/assets";

const ComoChegar = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-como_chegar p-5">
      {/* Flores decorativas no topo */}
      <img
        src={assets.flores}
        alt="decoração esquerda"
        className="absolute top-0 left-0 z-10 w-[25vw] md:w-[15vw] lg:w-[10vw] -translate-x-1/6 -translate-y-1/5 rotate-180"
      />
      <img
        src={assets.flores}
        alt="decoração direita"
        className="absolute top-0 right-0 z-10 w-[25vw] md:w-[15vw] lg:w-[10vw] translate-x-1/6 -translate-y-1/5 rotate-[270deg]"
      />

      {/* Conteúdo principal */}
      <div className=" w-full max-w-[1200px] ">
        <h1 className="mt-8 text-center text-[#C57B91]">Como llegar</h1>

        <div className="flex flex-col items-center justify-center pb-9 my-5">
          <div className="mt-5 px-4 sm:px-5 w-full max-w-[90vw] text-center">
            <p className="mb-4 text-black">
              Digite aqui o local de partida para encontrar a melhor rota!
            </p>
            <div className="w-full">
              <MapRoute />
              <p className="mt-4 text-black text-sm">
                💡 Dica: Salve a rota para que não haja problemas com perca de
                sinal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComoChegar;
