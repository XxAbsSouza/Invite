import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const ResponseReport = () => {
  const navigate = useNavigate();
  const [guestData, setGuestData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuest = async () => {
      const pageId = localStorage.getItem("notionPageId");
      if (!pageId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/.netlify/functions/getGuestData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageId }),
        });
        const data = await res.json();
        setGuestData(data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
  }, []);

  if (loading)
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
        <div className="loading loading-infinity loading-xl text-[#614183]"></div>
      </div>
    );

  if (!guestData) return <p>Não foi possível carregar os dados.</p>;

  const convidado = guestData.convidado?.properties || {};
  const acompanhantes = guestData.acompanhantes || [];

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[90vh] bg-Presenca pt-5">
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

        {convidado.Confirmação?.status?.name === "Vai" && (
          <div role="alert" className="alert alert-success mb-4 mb-10 md:mb-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>¡Su presencia está confirmada!</span>
          </div>
        )}

        {convidado.Confirmação?.status?.name === "Não Vai" && (
          <div role="alert" className="alert alert-error mb-4 mb-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>¡Confirmaste que NO IRÁS!</span>
          </div>
        )}
      <div className="flex flex-col items-center">

        <h2 className="text-xl font-bold mb-4">Detalhes da Confirmação</h2>
        <p>
          <strong>Nome:</strong> {convidado.Nome?.title?.[0]?.plain_text}
        </p>
        <p>
          <strong>Email:</strong> {convidado.Email?.email}
        </p>
        <p>
          <strong>Telefone:</strong> {convidado.Phone?.phone_number}
        </p>
        <p>
          <strong>Confirmação:</strong> {convidado.Confirmação?.status?.name}
        </p>
        <p>
          <strong>Quantidade de acompanhantes:</strong>{" "}
          {convidado.Quantidade?.number}
        </p>
        <p>
          <strong>Observação:</strong>{" "}
          {convidado.Observacao?.rich_text?.[0]?.plain_text}
        </p>

        <h3 className="mt-4 font-semibold">Acompanhantes:</h3>
        {acompanhantes.length === 0 ? (
          <p>Nenhum acompanhante registrado.</p>
        ) : (
          acompanhantes.map((a, index) => (
            <div key={a.id}>
              <p>
                - {a.properties?.Nome?.title?.[0]?.plain_text} (
                {a.properties?.Tipo?.select?.name})
              </p>
            </div>
          ))
        )}

        <button
          onClick={() => navigate("/formsConfirmation")}
          className="mt-4 btn btn-primary"
        >
          Modificar resposta
        </button>
      </div>
    </div>
  );

};

export default ResponseReport;

