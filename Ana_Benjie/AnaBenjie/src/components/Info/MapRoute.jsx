import React, { useRef, useState } from "react";
import "./MapRoute.css";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const MapRoute = () => {
  const destination = { lat: -23.34901, lng: -48.19917};
  const inputRef = useRef(null);
  const [routeUrl, setRouteUrl] = useState("");
  const [error, setError] = useState(false);


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
    language: "pt-BR",
  });

  const handleMapClick = () => {
    const confirmOpen = window.confirm("Quer abrir o mapa no Google Maps?");
    if (confirmOpen) {
      window.open(
        `https://www.google.com/maps?q=${destination.lat},${destination.lng}`,
        "_blank"
      );
    }
  };

  const handleOnPlacesChanged = () => {
    const places = inputRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];

      // Endereço textual para origem
      const origin = place.formatted_address || "";

      // Monta a URL da rota
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${destination.lat},${destination.lng}&travelmode=driving`;
      setRouteUrl(url);
      setError(false);
    }
    console.log("A origem: ", origin);
    console.log("O destino: ", destination);
    console.log(places);
  };



  return (
    <div className="">
      {/* Sempre renderiza o input */}
      {isLoaded && (
        <>
          <StandaloneSearchBox
            onLoad={(ref) => {
              inputRef.current = ref;

              const southWest = new window.google.maps.LatLng(-24.0, -47.3); // canto inferior esquerdo
              const northEast = new window.google.maps.LatLng(-23.1, -46.2); // canto superior direito
              const bounds = new window.google.maps.LatLngBounds(
                southWest,
                northEast
              );

              ref.setBounds(bounds);
            }}
            onPlacesChanged={handleOnPlacesChanged}
            options={{
              componentRestrictions: { country: "br" },
            }}
          >
            <input
              type="text"
              placeholder="Digite o ponto de partida"
              className={`input btn-style btn-outline input-bordered mt-2 w-full ${
                error ? "border-red-500" : ""
              }`}
            />
          </StandaloneSearchBox>
          {error && (
            <p className="text-red-500 text-sm mt-1">
              Por favor, selecione um local antes de traçar a rota.
            </p>
          )}

          <div className="flex justify-end">
            <button
              className="btn btn-style btn-outline transition-colors duration-300 mt-2 w-full md:w-[15vw]"
              onClick={() => {
                if (routeUrl) {
                  window.open(routeUrl, "_blank");
                } else {
                  setError(true);
                }
              }}
            >
              Traçar rota
            </button>
          </div>
        </>
      )}

      {/* Renderiza o mapa só se showMap for true */}
      {isLoaded && (
        <div onClick={handleMapClick} className="mt-4 md:mt-4 pt-5 map-container">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              minHeight: "300px",
            }}
            center={destination}
            zoom={17}
            fullscreenControl={false}
          >
            <Marker
              position={destination}
              options={{
                label: {
                  text: "Local do Casamento",
                  className: "map-marker",
                },
              }}
            />
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default MapRoute;
