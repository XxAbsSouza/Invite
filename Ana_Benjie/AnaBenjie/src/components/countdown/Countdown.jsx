import React from "react";
import { assets } from "../../assets/assets";
import CountdownTimer from "./CountdownTimer";

const Countdown = () => {
  return (
    <div className="mb-10">
      <div className="flex flex-col items-center pt-12 justify-center text-center">
        <h1 className="my-5 text-[#B0BCE5]">Quedan</h1>
        <CountdownTimer />
        <p className="mt-6 px-5">para que entre nosotros ya no hayan 6.376km</p>
      </div>
      <img
        src={assets.mapa}
        alt="mapa"
        className="block mx-auto w-[98vw] lg:w-[45vw]"
      />
    </div>
  );
};

export default Countdown;
