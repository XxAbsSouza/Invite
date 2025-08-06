import React, { useEffect, useRef } from "react";
import "./LinhaDecorativa.css";



const LinhaDecorativa = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
     
    const scroll = () => {
        const distance = window.scrollY
        const totalDistance = document.body.clientHeight - window.innerHeight

const percent = distance / totalDistance

        const len = path.getTotalLength();
        
        path.style.strokeDasharray = `${len}`
        path.style.strokeDashoffset = `${len * (1 - percent)}`
    };

    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <div className="linha-decorativa-svg">
      <svg
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 948.99 1730.41"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <path
          ref={pathRef}
          className="linha"
          d="M50,100 C150,200 250,0 350,150 S450,300 400,400"
          stroke="#ffacae"
          strokeWidth="6"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default LinhaDecorativa;
