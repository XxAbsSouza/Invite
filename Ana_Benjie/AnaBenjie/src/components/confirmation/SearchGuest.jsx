import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const SearchGuest = () => {
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!guestName.trim()) {
      setError("Por favor, digite seu nome antes de pesquisar.");
      return;
    }

    try {
      setError(""); // limpa erro
      const res = await fetch("/.netlify/functions/searchGuest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: guestName }),
      });
      const data = await res.json();

      if (data.found) {
        localStorage.setItem("notionPageId", data.pageId);
        localStorage.setItem(
          "notionConfirmacao",
          data.confirmacao || "Indefinido"
        );

        if (data.confirmacao === "Vai" || data.confirmacao === "Não Vai") {
          navigate("/responseReport");
        } else {
          navigate("/formsConfirmation");
        }
      } else {
        navigate("/messageSorry");
      }
    } catch (error) {
      console.error("Erro ao buscar convidado:", error);
      navigate("/messageSorry");
    }
  };

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
      <div className="flex flex-col items-center justify-center w-[90vw]   h-[70vh] ">
        <h1 className="text-[#765994]">Confirmar Presença</h1>
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Digite el nombre de tu invitación"
          className="mt-10 p-2 border rounded w-full text-base"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div>
          <button
            className="btn btn-style btn-outline transition-colors duration-300 mt-4 w-full md:w-[20vw]"
            onClick={handleSearch}
            disabled={!guestName.trim()}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchGuest;
