// pages/Pagina2/ListRegalos.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { assets, citacoes } from "../../assets/assets";
import "../citacao/Citacao.css"

const ListRegalos = () => {
  const citacoesPagina2 = citacoes.filter((c) => c.pagina === 2);

  return (
    <div className="relative overflow-visible w-full text-white my-5">
      <img
        src={assets.flores}
        alt="decoracao"
        className="absolute top-0 left-0 w-[40vw] md:w-[20vw] lg:w-[15vw] rotate-180  -translate-x-1/6 z-10 -translate-y-1/5"
      />

      {citacoesPagina2.map((citacao, index) => (
        <div
          key={index}
          className="bg p-5 flex flex-col items-center text-center"
        >
          <div className="prose break-words whitespace-normal max-w-[80vw] md:max-w-[60vw] py-10">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {citacao.texto}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      <img
        src={assets.flores_ponta_cabeca}
        alt="decoracao"
        className="absolute bottom-0 right-0 w-[37vw] md:w-[20vw] lg:w-[15vw] rotate-180  translate-x-1/6 z-10 translate-y-2/6"
      />
    </div>
  );
};

export default ListRegalos;
