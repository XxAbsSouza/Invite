import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { CiMenuFries, CiHeart } from "react-icons/ci";
import { GiClothes } from "react-icons/gi";
import { FiX, FiMapPin, FiClock, FiCheckCircle } from "react-icons/fi";

import { LanguageSwitcher } from "../LanguageSwitcher.jsx";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation("navbar");
  const navigate = useNavigate();

  const closeMenu = () => {
    const input = document.getElementById("drawer-toggle");
    if (input) input.checked = false;
  };

  const goHome = () => {
    closeMenu();
    navigate("/");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const scrollToTitle = (title) => {
    closeMenu();
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(`[data-title="${title}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.querySelector(`[data-title="${title}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-4">
      <div className="drawer drawer-end">
        <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

        {/* Botão hamburguer */}
        <div className="drawer-content">
          <label
            htmlFor="drawer-toggle"
            className="cursor-pointer inline-flex items-center py-2 hover:opacity-80 transition"
            aria-label={t("openMenu")}
          >
            <CiMenuFries
              className="h-7 w-7 text-gray-800"
              style={{ color: "#b2af80" }}
            />
          </label>
        </div>

        {/* Menu lateral */}
        <div className="drawer-side z-50">
          <label
            htmlFor="drawer-toggle"
            className="drawer-overlay bg-black/40 backdrop-blur-sm transition-opacity"
          ></label>

          <div className="flex flex-col w-72 min-h-full bg-white/95 backdrop-blur-md shadow-xl transition-transform duration-300">
            {/* Topo */}
            <div className="flex items-center justify-between p-5 border-b border-gray-300">
              <h3>Ana & Benjie</h3>
              <label
                htmlFor="drawer-toggle"
                className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors"
                aria-label={t("closeMenu")}
              >
                <FiX className="h-6 w-6 text-gray-700" />
              </label>
            </div>

            {/* Idioma */}
            <div className="p-5 border-b border-gray-200">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 block">
                {t("language")}
              </span>
              <LanguageSwitcher onChangeLanguage={closeMenu} />
            </div>

            {/* Links */}
            <ul className="flex-1 flex flex-col p-5 gap-3 text-gray-800">
              <li>
                <button
                  onClick={goHome}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  <CiHeart /> {t("home")}
                </button>
              </li>

              <li className="mt-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1 block">
                  {t("place")}
                </span>
                <ul className="flex flex-col gap-2">
                  <li>
                    <button
                      onClick={() => scrollToTitle("Lugar")}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FiMapPin /> {t("place")}
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/comochegar"
                      onClick={closeMenu}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FiMapPin /> {t("howToGet")}
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="mt-3">
                <button
                  onClick={() => scrollToTitle("Hora")}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FiClock /> {t("time")}
                </button>
              </li>

              <li className="mt-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1 block">
                  {t("dress")}
                </span>
                <ul className="flex flex-col gap-2">
                  <li>
                    <button
                      onClick={() => scrollToTitle("Vestimenta")}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <GiClothes /> {t("dress")}
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/dicas"
                      onClick={closeMenu}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <CiHeart /> {t("tips")}
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="mt-6">
                <Link
                  to="/searchGuest"
                  onClick={closeMenu}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg font-semibold bg-pink-100 hover:bg-pink-200 transition-colors"
                >
                  <FiCheckCircle /> {t("confirmation")}
                </Link>
              </li>
            </ul>

            {/* Rodapé */}
            <div className="p-5 text-sm text-center text-gray-500 select-none">
              © {new Date().getFullYear()} {t("footer")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
