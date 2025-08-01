import React, { useState, useRef, useEffect } from "react";
import { FaMusic, FaPlay, FaPause } from "react-icons/fa";
import oirteDecir from "../../assets/Oirte decir - Instrumental.mp3";
import "./MusicPlayer.css";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const playerRef = useRef(null); // Referência para a div do player
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const togglePlay = () => {
    if (!playing) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
    setExpanded(false); // recolhe ao clicar play/pause
  };

  const toggleExpand = (e) => {
    e.stopPropagation(); // impede que o clique de expandir conte como clique fora
    setExpanded(!expanded);
  };

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        playerRef.current &&
        !playerRef.current.contains(event.target) &&
        expanded
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [expanded]);

  return (
    <>
      <audio ref={audioRef} src={oirteDecir} loop preload="auto" />

      <div
        ref={playerRef}
        className={`music-player ${expanded ? "expanded" : ""}`}
      >
        <div onClick={toggleExpand} style={{ padding: "0 6px 0 2px" }}>
          <FaMusic color="white" size={15} />
        </div>

        {expanded && (
          <div onClick={togglePlay} style={{ padding: "0 2px" }}>
            {playing ? (
              <FaPause color="white" size={15} />
            ) : (
              <FaPlay color="white" size={15} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
