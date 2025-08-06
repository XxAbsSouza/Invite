import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { assets, infosGeneralesData } from "../../assets/assets";
import LinhaDecorativa from "./LinhaDecorativa";
import { useNavigate } from "react-router-dom";

import "./InfoGeneral.css";

const InfoGeneral = ({ className = "" }) => {
  const dias = [
    {
      src: assets.dezoito,
      alt: "Dia Dezoito",
      classes: "w-[10vw] md:w-[6vw] lg:w-[4vw] opacity-80",
    },
    {
      src: assets.dezenove,
      alt: "Dia Dezenove",
      classes: "w-[12vw] md:w-[8vw] lg:w-[6vw] opacity-80",
    },
    {
      src: assets.vinte,
      alt: "Dia Vinte, O Grande Dia",
      classes: "w-[22vw] md:w-[15vw] lg:w-[10vw] img-scroll-effect", // classe para o efeito
    },
    {
      src: assets.vinteum,
      alt: "Dia vinte e um",
      classes: "w-[12vw] md:w-[8vw] lg:w-[6vw] opacity-80",
    },
    {
      src: assets.vintedois,
      alt: "Dia vinte e Dois",
      classes: "w-[10vw] md:w-[6vw] lg:w-[4vw] opacity-80",
    },
  ];

  const [origem, setOrigem] = useState("");

  function handleOrigemChange(e) {
    setOrigem(e.target.value);
  }

  const navigate = useNavigate();

  const infosPagina1 = infosGeneralesData.filter((info) => info.pagina === 1);

  useEffect(() => {
    const imgs = document.querySelectorAll(".img-scroll-effect");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.5 }
    );

    imgs.forEach((img) => observer.observe(img));

    return () => {
      imgs.forEach((img) => observer.unobserve(img));
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* <LinhaDecorativa /> */}
      <div className="relative z-10 flex flex-col items-center my-16 md:pt-10 space-y-4">
        <p className="p-5 text-lg md:text-xl lg:text-2xl text-center">
          Con mucho amor te invitamos al inicio de nuestra eternidad juntos!
        </p>
        <div className=" flex flex-col items-center w-full">
          <img
            src={assets.novembroRosa}
            alt="Novembro"
            className="md:w-[20vw] mb-4 w-[50vw]"
          />
          <div className="flex items-center justify-between max-w-[80vw] md:max-w-[50vw] lg:max-w-[40vw] w-full">
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
        <div className="w-full flex flex-col items-center justify-center ">
          {infosPagina1.map((info, index) => (
            <div
              key={index}
              data-title={info.title}
              className={`flex flex-col ${
                index % 2 === 0 ? "items-start" : "items-end"
              } mx-2 py-4 w-[90vw] md:w-[80vw] lg:w-[70vw]`}
            >
              <div className="flex flex-col text-justify max-w-[70vw] md:max-w-full py-2 my-4">
                <h2 className="text-[#b2af80]">{info.title}</h2>
                <div className="md:max-w-[70vw]  lg:max-w-[50vw] description">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {info.description}
                  </ReactMarkdown>
                </div>
                {info.hasBtn && (
                  <button
                    className="btn btn-style btn-outline transition-colors duration-300 mt-4 md:max-w-[20vw] lg:max-w-[13vw]"
                    onClick={() => navigate(info.navigateTo)}
                  >
                    {info.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoGeneral;
