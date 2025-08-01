import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  if (loading) return <p>Carregando...</p>;
  if (!guestData) return <p>Não foi possível carregar os dados.</p>;

  const convidado = guestData.convidado?.properties || {};
  const acompanhantes = guestData.acompanhantes || [];

  return (
    <div className="p-4 max-w-[600px] mx-auto">
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
  );
};

export default ResponseReport;

