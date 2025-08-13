import React from 'react'
import { assets } from '../../assets/assets'
import { useTranslation } from "react-i18next";
const Footer = () => {
    const { t } = useTranslation("footer");
  return (
    <div className="py-10">
      <h1 className="text-[#FFACAD] ">{t("title")}</h1>
    </div>
  );
}

export default Footer