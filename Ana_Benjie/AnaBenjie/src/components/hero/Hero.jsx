import React from 'react' 
import { assets } from "../../assets/assets";
import "./hero.css";

export const Hero = () => {
  return (
    <div
      className="mb-4 
      h-[100vh] md:h-[140vh] lg:h-[150vh] xl:h-[230vh] 
      bg-contain bg-no-repeat 
      flex justify-center
      hero_img"
      id="Hero"
    >
      <div className="flex flex-col items-center mt-16 md:pt-10 space-y-4 ">
        <img
          src={assets.nos_casamos_hero}
          alt="Nos Casamos"
          className="md:w-[25vw] mb-2 w-[35vw]"
        />
        <img
          src={assets.nossos_nomes_hero}
          alt="Ana e Benjie nome"
          className="md:w-[70vw] mb-0 w-[80vw]"
        />
        <img
          src={assets.Data_hero}
          alt="Data do casamento"
          className="md:w-[25vw] w-[35vw]"
        />
      </div>
    </div>
  );
};