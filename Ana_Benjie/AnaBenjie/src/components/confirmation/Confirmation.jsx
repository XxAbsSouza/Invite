// pages/Pagina2/Confirmation.jsx
import React from "react";
import { assets, infosGeneralesData } from "../../assets/assets";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  const infosPagina2 = infosGeneralesData.filter((info) => info.pagina === 2);

  return (
    <div className="my-10 flex flex-col items-center justify-center gap-6 w-[90vw] text-center">
      <img
        src={assets.tuConfirmacion}
        alt="A confirmação é importante"
        className="w-[100vw] md:w-[70vw] lg:w-[40vw]"
      />

      {infosPagina2.map((info, index) => (
        <div key={index} className="flex flex-col items-center">
          <ReactMarkdown>{info.description}</ReactMarkdown>
          {info.hasBtn && (
            <button
              className="btn btn-style btn-outline transition-colors duration-300 mt-4 w-full md:max-w-[20vw]"
              onClick={() => navigate(info.navigateTo)}
            >
              {info.buttonText}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Confirmation;
