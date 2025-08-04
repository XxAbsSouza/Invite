import React from 'react'
import { useNavigate } from "react-router-dom";
import { assets } from '../../assets/assets';

const MessageSorry = () => {
    const navigate = useNavigate();

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
      <div className="max-w-[90vw]">
        <p>
          ¡Lo sentimos! <br />
          No pudimos encontrar tu nombre en la lista de invitados.
          <br /> <br /> ¡Pero no te preocupes! Revisa la invitación que te
          enviaron los novios a tu número de WhatsApp para ver tu nombre exacto
          e inténtalo de nuevo.
          <br /> <br /> Si el problema persiste, contacta con los novios.
        </p>
        <button
          className="btn btn-style btn-outline transition-colors duration-300 mt-4 w-full md:max-w-[20vw]"
          onClick={() => navigate("/searchGuest")}
        >
          Intentar otra vez
        </button>
      </div>
    </div>
  );
}

export default MessageSorry;