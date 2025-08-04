import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const FormConfirm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    phone: "",
    quantidade: 0,
    observacao: "",
    confirmacao: "",
    acompanhantes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuestData = async () => {
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

        const acompanhantesData = (data.acompanhantes || []).map((ac) => ({
          nome: ac.properties?.Nome?.title?.[0]?.plain_text || "",
          tipo: ac.properties?.Tipo?.select?.name || "",
        }));

        const confirmacaoAtual =
          data.convidado?.properties?.Confirmação?.status?.name || "";

        setFormData({
          nome: data.convidado?.properties?.Nome?.title?.[0]?.plain_text || "",
          email: data.convidado?.properties?.Email?.email || "",
          phone: data.convidado?.properties?.Phone?.phone_number || "",
          quantidade:
            data.convidado?.properties?.Quantidade?.number ||
            acompanhantesData.length ||
            0,
          observacao:
            data.convidado?.properties?.Observacao?.rich_text?.[0]
              ?.plain_text || "",
          confirmacao:
            confirmacaoAtual === "Vai" || confirmacaoAtual === "Não Vai"
              ? confirmacaoAtual
              : "",
          acompanhantes: acompanhantesData,
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmacaoChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      confirmacao: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pageId = localStorage.getItem("notionPageId");
      const res = await fetch("/.netlify/functions/updateGuest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, pageId }),
      });
      const data = await res.json();
      console.log("Atualizado:", data);
      alert("Atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar.");
    }
  };

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


  return (
    <div className="w-[95vw] h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "400px",
        }}
      >
        <div className="flex w-full mauto gap-4">
          <label>Nome do representante familiar</label>
          <p className="p-2 border rounded bg-gray-100 flex-1">
            {formData.nome}
          </p>
        </div>

        <div className="flex flex-col w-full mauto gap-2">
          <label>Você confirma que irá ao evento?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="confirmacao"
                value="Vai"
                checked={formData.confirmacao === "Vai"}
                onChange={() => handleConfirmacaoChange("Vai")}
                required
              />
              Sim
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="confirmacao"
                value="Não Vai"
                checked={formData.confirmacao === "Não Vai"}
                onChange={() => handleConfirmacaoChange("Não Vai")}
              />
              Não
            </label>
          </div>
        </div>

        <div className="flex w-full mauto gap-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex w-full mauto gap-4">
          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {formData.acompanhantes.length > 0 && (
          <div className="flex flex-col w-full mauto gap-2">
            <label>Acompanhantes</label>
            <ul className="list-disc list-inside">
              {formData.acompanhantes.map((ac, idx) => (
                <li key={idx}>{ac.nome}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col w-full mauto gap-4">
          <label htmlFor="obs">Observação</label>
          <input
            id="obs"
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
            placeholder="Observação"
          />
        </div>

        <button type="submit">Atualizar no Notion</button>
      </form>
    </div>
  );
};

export default FormConfirm;
