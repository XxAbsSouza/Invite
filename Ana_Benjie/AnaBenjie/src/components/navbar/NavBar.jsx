import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { CiMenuFries, CiHeart } from "react-icons/ci";
import { GiClothes } from "react-icons/gi";
import { FiX, FiMapPin, FiClock, FiCheckCircle } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();

  const closeMenu = () => {
    const input = document.getElementById("drawer-toggle");
    if (input) input.checked = false;
  };

  const goHome = () => {
    closeMenu();
    navigate("/");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const scrollToTitle = (title) => {
    closeMenu();
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(`[data-title="${title}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.querySelector(`[data-title="${title}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-4">
      <div className="drawer drawer-end">
        <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

        {/* Botão hamburguer (minimalista, sem círculo) */}
        <div className="drawer-content">
          <label
            htmlFor="drawer-toggle"
            className="cursor-pointer inline-flex items-center py-2 hover:opacity-80 transition"
            aria-label="Abrir menu"
          >
            <CiMenuFries className="h-7 w-7" style={{ color: "#b2af80" }} />
          </label>
        </div>

        {/* Menu lateral */}
        <div className="drawer-side z-50">
          <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
          <div
            className="flex flex-col w-72 min-h-full"
            style={{
              backgroundColor: "rgba(163, 159, 95, 0.8)", // #848158 com transparência
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {/* Topo com logo e botão X */}
            <div className="flex items-center justify-between p-4 border-b border-black/10">
              <img
                src={assets.nossos_nomes_hero}
                alt="Nossos nomes"
                className="w-[48vw] md:w-[25vw] lg:w-[20vw] xl:w-[12vw]"
              />
              <label
                htmlFor="drawer-toggle"
                className="btn btn-ghost btn-circle hover:bg-black/10 transition"
                aria-label="Fechar menu"
              >
                <FiX className="h-6 w-6" style={{ color: "#efedcd" }} />
              </label>
            </div>

            {/* Lista de links */}
            <ul
              className="menu p-4 flex-1 text-lg"
              style={{ color: "#efedcd" }}
            >
              <li>
                <button
                  onClick={goHome}
                  className="flex items-center gap-3 hover:text-white transition-all"
                  style={{ color: "#efedcd" }}
                >
                  <CiHeart /> Início
                </button>
              </li>

              <li className="mt-6">
                {/* Seção Lugar sem ser clicável */}
                <span
                  className="text-sm font-light uppercase tracking-wide mb-1 block"
                  style={{ color: "rgba(112, 109, 66, 0.8)" }}
                >
                  Lugar
                </span>
                <ul>
                  <li>
                    <button
                      onClick={() => scrollToTitle("Lugar")}
                      className="flex items-center gap-3 hover:text-white transition-all"
                      style={{ color: "#efedcd" }}
                    >
                      <FiMapPin /> Lugar
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/comochegar"
                      onClick={closeMenu}
                      className="flex items-center gap-3 hover:text-white transition-all"
                      style={{ color: "#efedcd" }}
                    >
                      <FiMapPin /> Como Chegar
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="mt-6">
                <button
                  onClick={() => scrollToTitle("Hora")}
                  className="flex items-center gap-3 hover:text-white transition-all"
                  style={{ color: "#efedcd" }}
                >
                  <FiClock /> Hora
                </button>
              </li>

              <li className="mt-6">
                {/* Seção Vestimenta sem ser clicável */}
                <span
                  className="text-sm font-light uppercase tracking-wide mb-1 block"
                  style={{ color: "rgba(112, 109, 66, 0.8)" }}
                >
                  Vestimenta
                </span>
                <ul>
                  <li>
                    <button
                      onClick={() => scrollToTitle("Vestimenta")}
                      className="flex items-center gap-3 hover:text-white transition-all"
                      style={{ color: "#efedcd" }}
                    >
                      <GiClothes /> Vestimenta
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/dicas"
                      onClick={closeMenu}
                      className="flex items-center gap-3 hover:text-white transition-all"
                      style={{ color: "#efedcd" }}
                    >
                      <CiHeart /> Tips
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="mt-8">
                <Link
                  to="/searchGuest"
                  onClick={closeMenu}
                  className="flex items-center gap-3 font-semibold hover:underline hover:text-white transition"
                  style={{ color: "#ffd4d2" }}
                >
                  <FiCheckCircle /> Confirmação
                </Link>
              </li>
            </ul>

            {/* Rodapé */}
            <div
              className="p-4 border-t border-black/10 text-sm text-center select-none"
              style={{ color: "rgba(178, 175, 128, 0.7)" }}
            >
              © {new Date().getFullYear()} Nosso Casamento
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
