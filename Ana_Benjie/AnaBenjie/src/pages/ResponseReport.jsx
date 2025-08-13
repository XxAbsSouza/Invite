import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";

const ResponseReport = () => {
  const { t } = useTranslation("confirmation");
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

  if (!guestData)
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <p className="text-center text-gray-600">
          {/* Texto fixo, poderia ser traduzido se quiser */}
          Não foi possível carregar os dados.
        </p>
      </div>
    );

  const convidado = guestData.convidado?.properties || {};
  const acompanhantes = guestData.acompanhantes || [];

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[90vh] bg-Presenca py-8 px-4">
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

      {/* Alerta */}
      {convidado.Confirmação?.status?.name === "Vai" && (
        <div className="alert alert-success mb-6 flex items-center">
          <svg
            className="h-6 w-6 mr-2 stroke-current"
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
          <span className="font-medium">
            {t("confirmation.responseReport.confirmedYes")}
          </span>
        </div>
      )}

      {convidado.Confirmação?.status?.name === "Não Vai" && (
        <div className="alert alert-error mb-6 flex items-center">
          <svg
            className="h-6 w-6 mr-2 stroke-current"
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
          <span className="font-medium">{t("confirmation.responseReport.confirmedNo")}</span>
        </div>
      )}

      {/* Card principal */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md w-full max-w-xl p-6 space-y-4">
        <h2 className=" text-center text-[#614183]">
          {t("confirmation.responseReport.confirmationDetails")}
        </h2>

        <div>
          <p className="text-sm font-light text-[#614183]">{t("confirmation.form.name")}</p>
          <p className="font-medium">
            {convidado.Nome?.title?.[0]?.plain_text}
          </p>
        </div>

        <div>
          <p className="text-sm font-light text-[#614183]">{t("confirmation.form.email")}</p>
          <p className="font-medium">{convidado.Email?.email}</p>
        </div>

        <div>
          <p className="text-sm font-light text-[#614183]">{t("confirmation.form.phone")}</p>
          <p className="font-medium">{convidado.Phone?.phone_number}</p>
        </div>

        <div>
          <p className="text-sm font-light text-[#614183]">
            {t("confirmation.form.willAttend")}
          </p>
          <p className="font-medium flex items-center space-x-2">
            {convidado.Confirmação?.status?.name === "Vai" ? (
              <>
                <span className="text-green-600">✔</span>
                <span>{t("confirmation.form.yes")}</span>
              </>
            ) : convidado.Confirmação?.status?.name === "Não Vai" ? (
              <>
                <span className="text-red-600">✘</span>
                <span>{t("confirmation.form.no")}</span>
              </>
            ) : (
              <span className="text-gray-500">Sin respuesta</span>
            )}
          </p>
        </div>

        {/* Lista de acompanhantes (apenas se houver) */}
        {acompanhantes.length > 0 && (
          <div>
            <p className="text-sm font-light text-[#614183]">
              {t("confirmation.form.guests", { count: acompanhantes.length })}
            </p>
            <div className="space-y-1 mt-1">
              {acompanhantes
                .slice()
                .sort((a, b) => {
                  const tipoA =
                    a.properties?.Tipo?.select?.name?.toLowerCase() || "";
                  const tipoB =
                    b.properties?.Tipo?.select?.name?.toLowerCase() || "";

                  if (tipoA === tipoB) return 0;
                  return tipoA === "adulto" ? -1 : 1;
                })
                .map((a) => (
                  <p key={a.id} className="font-medium">
                    <span className="text-[#614183] text-sm">●</span>{" "}
                    {a.properties?.Nome?.title?.[0]?.plain_text}
                  </p>
                ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-light text-[#614183]">
            {t("confirmation.form.observations")}
          </p>
          {convidado.Observacao?.rich_text?.length === 0 ? (
            <p className="font-medium text-gray-500">
              {t("confirmation.form.noObservations")}
            </p>
          ) : (
            <p className="font-medium">
              {convidado.Observacao?.rich_text?.[0]?.plain_text}
            </p>
          )}
        </div>

        <button
          onClick={() => navigate("/formsConfirmation")}
          className="btn btn-style btn-outline transition-colors duration-300 w-full mt-2"
        >
          {t("confirmation.responseReport.modifyBtn")}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn btn-outline w-full mt-2"
        >
          {t("confirmation.responseReport.backBtn")}
        </button>
      </div>
    </div>
  );
};

export default ResponseReport;
