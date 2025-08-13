import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "pt", name: "Português", flag: "https://flagcdn.com/w20/br.png" },
  { code: "es", name: "Español", flag: "https://flagcdn.com/w20/es.png" },
];

export function LanguageSwitcher({ onChangeLanguage }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (onChangeLanguage) onChangeLanguage();
    setOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}
      style={{ fontFamily: "inherit" }}
    >
      {/* Botão principal */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-full rounded-md border border-yellow-700 bg-white/90 px-3 py-1 text-sm font-medium text-yellow-800 shadow-md hover:bg-yellow-100/60 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-1 transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
      >
        <img
          src={currentLang.flag}
          alt={`Bandeira de ${currentLang.name}`}
          className="w-5 h-4 mr-2 object-cover"
          loading="lazy"
        />
        <span>{currentLang.name}</span>
        <svg
          className="ml-2 -mr-1 h-4 w-4 text-yellow-700 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? "M6 18L18 6M6 6l12 12" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-md border border-yellow-700 bg-white/95 backdrop-blur-sm shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-all"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1">
            {languages.map(({ code, name, flag }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`flex items-center w-full px-4 py-2 text-sm text-yellow-800 rounded-md hover:bg-yellow-100/50 focus:bg-yellow-100/50 transition-colors ${
                  i18n.language === code ? "font-semibold" : "font-normal"
                }`}
                role="menuitem"
                type="button"
              >
                <img
                  src={flag}
                  alt={`Bandeira de ${name}`}
                  className="w-5 h-4 mr-2 object-cover"
                  loading="lazy"
                />
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
