import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Confirmar Presença</h1>
      <input
        type="text"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        placeholder="Digite seu nome"
        className="mt-2 p-2 border rounded"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div>
        <button
          className="btn btn-style btn-outline transition-colors duration-300 mt-4 w-full md:max-w-[20vw]"
          onClick={handleSearch}
          disabled={!guestName.trim()}
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
};

export default SearchGuest;
