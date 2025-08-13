import React, { useRef, useState } from "react";
import "./MapRoute.css";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useTranslation } from "react-i18next";

const MapRoute = () => {
  const { t, i18n } = useTranslation("map");

  const destination = { lat: -23.34901, lng: -48.19917 };
  const inputRef = useRef(null);
  const [routeUrl, setRouteUrl] = useState("");
  const [error, setError] = useState(false);

  // FIXAR idioma do mapa para evitar erro de múltiplos loaders
  // Troque para "en" se preferir inglês
  const mapsLang = "pt-BR";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script", // id fixo — NÃO variar com idioma
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
    language: mapsLang,
  });

  const handleMapClick = () => {
    if (window.confirm(t("confirm_open_map"))) {
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
      const origin = place.formatted_address || "";
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        origin
      )}&destination=${destination.lat},${destination.lng}&travelmode=driving`;
      setRouteUrl(url);
      setError(false);
    }
  };

  return (
    <div>
      {isLoaded && (
        <>
          <StandaloneSearchBox
            onLoad={(ref) => {
              inputRef.current = ref;
              if (ref) {
                const southWest = new window.google.maps.LatLng(-24.0, -47.3);
                const northEast = new window.google.maps.LatLng(-23.1, -46.2);
                const bounds = new window.google.maps.LatLngBounds(
                  southWest,
                  northEast
                );
                ref.setBounds(bounds);
              }
            }}
            onPlacesChanged={handleOnPlacesChanged}
            options={{ componentRestrictions: { country: "br" } }}
          >
            <input
              type="text"
              placeholder={t("placeholder_origin")}
              className={`p-2 border rounded-lg text-base mt-2 w-full ${
                error ? "border-red-500" : ""
              }`}
              required
            />
          </StandaloneSearchBox>

          {error && (
            <p className="text-red-500 text-sm mt-1">
              {t("error_select_place")}
            </p>
          )}

          <div className="flex justify-end">
            <button
              className="btn btn-style btn-outline transition-colors duration-300 mt-2 w-full md:w-[15vw]"
              onClick={() => {
                if (routeUrl) window.open(routeUrl, "_blank");
                else setError(true);
              }}
            >
              {t("btn_trace_route")}
            </button>
          </div>
        </>
      )}

      {isLoaded && (
        <div
          onClick={handleMapClick}
          className="mt-4 md:mt-4 pt-5 map-container"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleMapClick();
          }}
        >
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
                label: { text: t("marker_label"), className: "map-marker" },
              }}
            />
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default MapRoute;
