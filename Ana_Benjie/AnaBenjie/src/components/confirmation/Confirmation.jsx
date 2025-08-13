import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Confirmation = () => {
  const { t } = useTranslation("confirmation");
  const navigate = useNavigate();

  return (
    <div className="my-10 flex flex-col items-center justify-center gap-6 w-[90vw] text-center">
      <h2 className="text-[#b2af80] leading-[0.9] text-center">
        {t("confirmation.title")}
      </h2>

      <div className="flex flex-col items-center">
        <ReactMarkdown>{t("confirmation.description")}</ReactMarkdown>
        <button
          className="btn btn-style btn-outline transition-colors duration-300 mt-6 w-full md:max-w-[20vw]"
          onClick={() => navigate(t("confirmation.navigateTo"))}
        >
          {t("confirmation.button")}
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
