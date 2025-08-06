import React from 'react'
import { assets, tips } from '../assets/assets';

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import "./Dicas.css";

const Dicas = () => {
  const dicas = tips
  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-tips p-5 min-h-[80vh] pagina-dicas">
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
      <h1 className="text-[#df8646] mb-8">Tips</h1>
      {tips.map((tip, index) => (
        <div className="flex flex-col items-center justify-center my-2">
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0
                ? "items-start text-start gradient-left"
                : "items-end text-end gradient-right"
            } mx-2 py-4 w-[90vw] md:w-[80vw] lg:w-[70vw]`}
          >
            <h3 className="text-[#df8646]">{tip.title}</h3>
            <div className="md:max-w-[60vw] lg:max-w-[50vw] prose prose-orange">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {tip.text}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dicas