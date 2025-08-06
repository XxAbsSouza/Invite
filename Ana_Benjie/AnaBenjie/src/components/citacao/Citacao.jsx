// pages/Pagina1/Citacao.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { assets, citacoes } from "../../assets/assets";
import "./Citacao.css";

const Citacao = () => {
  // Filtra só as citações da página 1
  const citacoesPagina1 = citacoes.filter((c) => c.pagina === 1);

  return (
    <div className="relative overflow-visible w-[85vw] md:w-[90vw] text-white ">
      <img
        src={assets.flores}
        alt="decoracao"
        className="absolute top-0 right-0 -translate-y-7/8 translate-x-1/6 z-10 w-[38vw] md:w-[20vw] lg:w-[13vw]"
      />

      {citacoesPagina1.map((citacao, index) => (
        <div key={index} className="bg p-5 flex flex-col items-start">
          {/* Bloco do h3 e p alinhados à direita */}
          <div className="flex flex-col items-end self-end md:self-center md:items-center mt-4">
            <h3>- El Amor lo conquista todo</h3>
            <p className="text-sm italic mb-7">Dr. William Soto Santiago</p>
          </div>

          {/* Texto da citação */}
          <div className="prose max-w-none break-words whitespace-normal mb-4">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {citacao.texto}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      <img
        src={assets.flores_ponta_cabeca}
        alt="decoracao"
        className="absolute bottom-0 left-0 translate-y-7/8 -translate-x-1/6 z-10 w-[33vw] md:w-[15vw] lg:w-[11vw]"
      />
    </div>
  );
};

export default Citacao;
