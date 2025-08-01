import React from 'react'
import { useNavigate } from "react-router-dom";

const MessageSorry = () => {
    const navigate = useNavigate();

  return (
    <div>
      <p>
        Desculpe! Não conseguimos encontrar o seu nome na lista de
        convidados.
        <br /> Mas fique tranquilo! Basta verificar no convite enviado pelos
        noivos ao seu número de Whatsapp, o nome exato do "Representante
        Familiar" e tentar novamente.
        <br /> <br /> Entre em contato com os Noivos se o problema persistir.
      </p>
      <button
        className="btn btn-style btn-outline transition-colors duration-300 mt-4 w-full md:max-w-[20vw]"
        onClick={() => navigate("/searchGuest")}
      >
        Tentar Novamente
      </button>
    </div>
  );
}

export default MessageSorry;