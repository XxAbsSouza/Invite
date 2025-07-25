import React from "react";
import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import "./MapRoute.css";

const MapRoute = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAoSIuwpjV1nxxUvVUWp99Zqz_VRaIeUBM",
    libraries: ["places"],
  });

  const position = { lat: -23.528694, lng: -46.889704 };

  const handleMapClick = () => {
    const confirmOpen = window.confirm("Quer abrir o mapa no Google Maps?");
    if (confirmOpen) {
      window.open(
        `https://www.google.com/maps?q=${position.lat},${position.lng}`,
        "_blank"
      );
    }
  };

  return (
    <div onClick={handleMapClick} className="map-container">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            minHeight: "300px",
          }}
          center={position}
          zoom={17}
        >
          <Marker
            position={position}
            options={{
              label: {
                text: "Local do Casamento",
                className: "map-marker",
              },
            }}
          />
          {/* Aqui você pode colocar rotas, marcadores etc */}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MapRoute;
