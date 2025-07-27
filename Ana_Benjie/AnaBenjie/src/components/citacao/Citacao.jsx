import React from 'react'
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { assets, citacoes } from '../../assets/assets'
import './Citacao.css'

const Citacao = () => {
  return (
    <div className="relative overflow-visible w-[85vw] md:w-[90vw] text-white ">
      {/* Flor no topo, saindo para cima e para o lado */}
      <img
        src={assets.flores}
        alt="decoracao"
        className="absolute top-0 right-0 -translate-y-7/8 translate-x-1/6 z-10 w-[38vw] md:w-[20vw] lg:w-[13vw]"
      />

      <div className="bg p-5 flex flex-col items-center">
        {/* Seu conteúdo da citação */}
        <p className="italic">"El Amor lo conquista todo"</p>
        <p className="text-sm mb-7">Dr. William Soto Santiago</p>
        <div className="prose max-w-none break-words whitespace-normal">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {citacoes[0].texto}
          </ReactMarkdown>
        </div>
      </div>

      {/* Flor no rodapé, saindo para baixo e para o lado */}
      <img
        src={assets.flores_ponta_cabeca}
        alt="decoracao"
        className="absolute bottom-0 left-0 translate-y-7/8 -translate-x-1/6 z-10 w-[33vw] md:w-[15vw] lg:w-[11vw]"
      />
    </div>
  );
}

export default Citacao