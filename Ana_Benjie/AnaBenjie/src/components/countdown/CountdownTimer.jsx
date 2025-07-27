import React from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import "./CountdownTimer.css"

const CountdownTimer = () => {
  // Data alvo: 20 de novembro de 2025 às 14:00 (horário local)
    const targetDate = new Date("2025-11-20T14:00:00-03:00").getTime();

  return (
    <FlipClockCountdown
      to={targetDate}
      labels={["Dias", "Horas", "Minutos", "Segundos"]}
      className="flip-clock"
    />
  );
};

export default CountdownTimer;
