import React, { useState } from "react";

import ReactMarkdown from "react-markdown";
import { assets, infosGeneralesData } from "../../assets/assets";

import MapRoute from "./MapRoute.jsx";
import "./InfoGeneral.css";

import { useNavigate } from "react-router-dom";

const InfoGeneral = () => {
  const dias = [
    {
      src: assets.dezoito,
      alt: "Dia Dezoito",
      classes: "w-[12vw] md:w-[7vw] lg:w-[5vw]",
    },
    {
      src: assets.dezenove,
      alt: "Dia Dezenove",
      classes: "w-[15vw] md:w-[9vw] lg:w-[7vw]",
    },
    {
      src: assets.dezenove,
      alt: "Dia Vinte, O Grande Dia",
      classes: "w-[20vw] md:w-[13vw] lg:w-[10vw]",
    },
    {
      src: assets.vinteum,
      alt: "Dia vinte e um",
      classes: "w-[15vw] md:w-[9vw] lg:w-[7vw]",
    },
    {
      src: assets.vintedois,
      alt: "Dia vinte e Dois",
      classes: "w-[12vw] md:w-[7vw] lg:w-[5vw]",
    },
  ];
  const [origem, setOrigem] = useState("");
  function handleOrigemChange(e) {
    setOrigem(e.target.value);
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center my-16 md:pt-10 space-y-4">
      <p className="p-5 text-lg md:text-xl lg:text-4xl text-center">
        Con mucho amor te invitamos al inicio de nuestra eternidad juntos
      </p>
      <div className=" flex flex-col items-center w-full">
        <img
          src={assets.novembroRosa}
          alt="Novembro"
          className="md:w-[30vw] mb-0 w-[50vw]"
        />
        <div className="flex items-center justify-between max-w-[80vw] md:max-w-[50vw] lg:max-w-[45vw] w-full">
          {dias.map((dia, index) => (
            <img
              key={index}
              src={dia.src}
              alt={dia.alt}
              className={dia.classes}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-12 md:mt-[24]">
        {infosGeneralesData.map((info, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "items-start" : "items-end"
            } mx-2 py-4 w-[90vw] md:w-[80vw] lg:w-[70vw]`}
          >
            <div className="flex flex-col text-justify max-w-[70vw] md:max-w-full py-2 my-4">
              <img
                src={info.title}
                alt={info.alt}
                className="w-[25vw] md:w-[11vw] lg:w-[8vw] mb-4"
              />
              <div>
                <ReactMarkdown>{info.description}</ReactMarkdown>
              </div>

              {info.hasMap && (
                <div className="mt-4 w-fit">
                    <p className="text-base">Digite aqui o endereço de origem para traçar uma rota</p>
                  <div className=" h-full">
                    <MapRoute showMap={false} />
                  </div>
                </div>
              )}

              {info.hasBtn && (
                <button
                  className="btn btn-style btn-dash transition-colors duration-300 mt-4 md:max-w-[13vw]"
                  onClick={() => navigate("/dicas")}
                >
                  {info.buttonText}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoGeneral;
