import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { assets } from "../../assets/assets";
import { useTranslation } from "react-i18next";
import "./Citacao.css";

const Citacao = () => {
  const { t } = useTranslation("citacoes");
  const citacoes = t("citacoes", { returnObjects: true });

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
          <div className="flex flex-col items-end text-center md:self-center md:items-center mt-4">
            <h2 className="leading-[0.9] text-center">
              - El Amor lo conquista todo
            </h2>
            <p className="mt-3 self-end text-sm italic mb-7">
              Dr. William Soto Santiago
            </p>
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
