import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";

const ModalSuccess = ({ show, message, onClose }) => {
  const { t } = useTranslation("confirmation");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        role="alert"
        className={`alert alert-success alert-soft p-6 rounded-lg shadow-lg transition-transform duration-300 ${
          show ? "translate-y-0" : "translate-y-6"
        }`}
        style={{ minWidth: "300px", textAlign: "center" }}
      >
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

const FormConfirm = () => {
  const { t } = useTranslation("confirmation");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    phone: "",
    quantidade: 0,
    observacao: "",
    confirmacao: "",
    acompanhantes: [],
  });
  const [hadPreviousResponse, setHadPreviousResponse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

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

        setHadPreviousResponse(
          confirmacaoAtual === "Vai" || confirmacaoAtual === "Não Vai"
        );

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

  const isFirstResponse = !hadPreviousResponse;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const pageId = localStorage.getItem("notionPageId");
      await fetch("/.netlify/functions/updateGuest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, pageId }),
      });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/responseReport");
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar.");
    } finally {
      setSaving(false);
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
  if (saving)
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
    <div className="relative w-full flex flex-col items-center justify-center min-h-[90vh] bg-Presenca py-8 px-4">
      {/* Flores decorativas */}
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

      {/* Modal animado sucesso */}
      <ModalSuccess
        show={showSuccess}
        message={
          isFirstResponse
            ? t("confirmation.form.successFirst")
            : t("confirmation.form.successUpdate")
        }
        onClose={() => setShowSuccess(false)}
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md w-full max-w-xl p-6 space-y-4"
      >
        <h2 className=" text-center text-[#614183]">
          {isFirstResponse
            ? t("confirmation.form.registerResponse")
            : t("confirmation.form.modifyResponse")}
        </h2>

        <div>
          <p className="text-sm font-light text-[#614183]">
            {t("confirmation.form.name")}
          </p>
          <p className="font-medium">{formData.nome}</p>
        </div>

        <div>
          <p className="text-sm font-light text-[#614183]">
            {t("confirmation.form.willAttend")}
          </p>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="confirmacao"
                value="Vai"
                checked={formData.confirmacao === "Vai"}
                onChange={() => handleConfirmacaoChange("Vai")}
                required
              />
              <span className="font-medium">{t("confirmation.form.yes")}</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="confirmacao"
                value="Não Vai"
                checked={formData.confirmacao === "Não Vai"}
                onChange={() => handleConfirmacaoChange("Não Vai")}
              />
              <span className="font-medium">{t("confirmation.form.no")}</span>
            </label>
          </div>
        </div>

        <div>
          <p className="text-sm font-light text-[#614183]">
            {t("confirmation.form.email")}
          </p>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#614183]"
          />
        </div>

        <div>
          <p className="text-sm font-light text-[#614183]">
            {t("confirmation.form.phone")}
          </p>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#614183]"
          />
        </div>

        {formData.acompanhantes.length > 0 && (
          <div>
            <p className="text-sm font-light text-[#614183]">
              {t("confirmation.form.guests", {
                count: formData.acompanhantes.length,
              })}
            </p>
            <div className="space-y-1 mt-1">
              {[...formData.acompanhantes]
                .sort((a, b) => {
                  const tipoA = a.tipo.toLowerCase();
                  const tipoB = b.tipo.toLowerCase();
                  if (tipoA === tipoB) return 0;
                  return tipoA === "adulto" ? -1 : 1;
                })
                .map((a, idx) => (
                  <p key={idx} className="font-medium">
                    <span className="text-[#614183] text-sm">●</span> {a.nome}
                  </p>
                ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-light text-[#614183]">
            {t("confirmation.form.observations")}
          </p>
          <input
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
            placeholder={t("confirmation.form.noObservations")}
            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#614183]"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#614183]"
        >
          {isFirstResponse
            ? t("confirmation.form.register")
            : t("confirmation.form.update")}
        </button>
      </form>
    </div>
  );
};

export default FormConfirm;
