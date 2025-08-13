import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const MessageSorry = () => {
  const { t } = useTranslation("confirmation");
  const navigate = useNavigate();

  return (
    <div className="relative w-full flex flex-col items-center justify-center h-[90vh] bg-Presenca">
      <img
        src={assets.flores}
        alt="decoração esquerda"
        className="absolute top-0 left-0 z-10 w-[25vw] md:w-[15vw] lg:w-[8vw] -translate-x-1/6 -translate-y-1/5 rotate-180"
      />
      <img
        src={assets.flores}
        alt="decoração direita"
        className="absolute top-0 right-0 z-10 w-[25vw] md:w-[15vw] lg:w-[8vw] translate-x-1/6 -translate-y-1/5 rotate-[270deg]"
      />
      <div className="max-w-[90vw]">
        <h2 className="my-2 text-[#765994]">
          {t("confirmation.notFound.title")}
        </h2>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {t("confirmation.notFound.message")}
        </ReactMarkdown>
        <button
          className="btn btn-style btn-outline transition-colors duration-300 mt-4 w-full md:max-w-[20vw]"
          onClick={() => navigate(t("confirmation.notFound.navigateTo"))}
        >
          {t("confirmation.notFound.button")}
        </button>
      </div>
    </div>
  );
};

export default MessageSorry;
