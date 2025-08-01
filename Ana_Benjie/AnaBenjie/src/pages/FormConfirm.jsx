import React, { useState, useEffect } from "react";

const FormConfirm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    phone: "",
    quantidade: 0,
    observacao: "",
    confirmacao: "",
    acompanhantes: [], // array de { nome, tipo }
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

        // monta acompanhantes do Notion para array local
        const acompanhantesData = (data.acompanhantes || []).map((ac) => ({
          nome: ac.properties?.Nome?.title?.[0]?.plain_text || "",
          tipo: ac.properties?.Tipo?.select?.name || "Selecione aqui",
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

  // mudar nome/tipo de um acompanhante específico
  const handleAcompanhanteChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.acompanhantes];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, acompanhantes: updated };
    });
  };

  // incrementa quantidade
  const addAcompanhante = () => {
    setFormData((prev) => ({
      ...prev,
      quantidade: prev.quantidade + 1,
      acompanhantes: [
        ...prev.acompanhantes,
        { nome: "", tipo: "Selecione aqui" },
      ],
    }));
  };

  // diminui quantidade
  const removeAcompanhante = () => {
    setFormData((prev) => {
      if (prev.quantidade <= 0) return prev;
      const updated = [...prev.acompanhantes];
      updated.pop();
      return {
        ...prev,
        quantidade: prev.quantidade - 1,
        acompanhantes: updated,
      };
    });
  };

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

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="w-[95vw] h-screen flex flex-col items-center justify-center ">
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

        <div className="flex flex-col w-full mauto gap-2">
          <label>Quantidade de acompanhantes</label>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={removeAcompanhante}
              disabled={formData.quantidade <= 0}
            >
              -
            </button>
            <span>{formData.quantidade}</span>
            <button type="button" onClick={addAcompanhante}>
              +
            </button>
          </div>
        </div>

        {formData.acompanhantes.map((ac, idx) => (
          <div key={idx} className="flex flex-col w-full mauto gap-2">
            <label>Acompanhante {idx + 1}</label>
            <input
              placeholder="Nome"
              value={ac.nome}
              onChange={(e) =>
                handleAcompanhanteChange(idx, "nome", e.target.value)
              }
              required
            />
            <select
              value={ac.tipo}
              onChange={(e) =>
                handleAcompanhanteChange(idx, "tipo", e.target.value)
              }
              required
            >
              <option>Selecione aqui</option>
              <option>Adulto</option>
              <option>Criança</option>
            </select>
          </div>
        ))}

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
