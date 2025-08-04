import heroIMG from './heroIMG.png'

import nos_casamos_hero from './nos_casamos_hero.svg'
import nossos_nomes_hero from './nossos_nomes_hero.svg'
import Data_hero from './Data_hero.svg'

import dezoito from './18_quadrado.svg'
import dezenove from './19_quadrado.svg'
import vinteum from './21_quadrado.svg'
import vintedois from './22_quadrado.svg'
import flores_ponta_cabeca from './flores_ponta_cabeca.svg'
import flores from './flores.svg'
import hora from './hora.svg'
import lugar from './lugar.svg'
import novembroRosa from './novembro_cor_rosa.svg'
import nosVemos from './nosVemosPronto.svg'
import tuConfirmacion from './confirmacion-important.svg'

import foto0 from './foto0.jfif'
import foto1 from "./foto1.jpg";
import foto2 from "./foto2.jpg";
import foto3 from "./foto3.jpg";
import foto4 from "./foto4.jpg";
import foto5 from "./foto5.jpg";
import foto6 from "./foto6.jpg";
import foto7 from "./foto7.jpg";
import foto8 from "./foto8.jpg";
import foto9 from "./foto9.jpg";
import foto10 from "./foto10.jfif";
import foto11 from "./foto11.jfif";
import foto12 from "./foto12.jfif";
import foto13 from "./foto13.jfif";
import linha from "./linha.svg"
import mapa from "./mapa.svg"
import vinte from "./vinte.svg"

export const assets = {
  heroIMG,
  nos_casamos_hero,
  nossos_nomes_hero,
  Data_hero,
  dezenove,
  dezoito,
  vinteum,
  vintedois,
  flores_ponta_cabeca,
  flores,
  novembroRosa,
  nosVemos,
  tuConfirmacion,
  linha,
  mapa,
  vinte,
};

export const infosGeneralesData = [
  {
    pagina: 1,
    alt: "Lugar",
    title: lugar,
    description:
      "Campo de los abuelos de Ana, **Campo de los olivos** (esta linea es de ejemplo jajaja)",
    subTitleField: "Digite aqui o endereço de origem para traçar uma rota",
    hasMap: true,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.127993214698!2d-46.893292724693985!3d-23.52789846036371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf015a4ab787db%3A0x9d1ab78dd5e2f206!2sR.%20Eng.%20Jonas%20Pomp%C3%A9ia%20-%20Jardim%20Silveira%2C%20Barueri%20-%20SP%2C%2006434-090!5e0!3m2!1spt-BR!2sbr!4v1753316732035!5m2!1spt-BR!2sbr",
    destination: "Campo de los olivos",
    hasBtn: true,
    buttonText: "Como chegar",
    navigateTo: "/comochegar",
  },
  {
    pagina: 1,
    alt: "Hora",
    title: hora,
    description:
      "Te esperamos a las **3:00 p.m.** y agradecemos tu puntualidad.",
  },
  {
    pagina: 1,
    alt: "Vestimenta",
    title: hora,
    description:
      "**Casual elegante**, toma en cuenta de que la celebración será en un campo al aire libre.",
    hasBtn: true,
    buttonText: "Ver Tips",
    navigateTo: "/dicas",
  },
  {
    pagina: 2,
    alt: "A confirmação é importante",
    title: tuConfirmacion,
    description: "asegúranos tu presencia confirmando en el siguiente botón",
    hasBtn: true,
    buttonText: "Confirme Aqui",
    navigateTo: "/searchGuest",
  },
];

// citacoes.js
export const citacoes = [
  {
    pagina: 1,
    texto: `Cuando dos almas fueron creadas para caminar juntas,
Dios encuentra la manera de unirlas, sin importar el
tiempo ni la distancia, ni el idioma.<br />
Así fue con nosotros.<br /><br />
Dos historias distintas, dos corazones con marcas
diferentes, pero un mismo propósito: amarnos por la
eternidad.<br /><br />
**Hoy queremos invitarte a ser testigo del inicio de
algo que nunca tendrá final,** de este para siempre que
Dios ha escrito para nosotros.<br /><br />
Eres importante en nuestras vidas, y por ello, nos encantaría
que nos acompañes en nuestra ceremonia y
seas parte de este capítulo que se abre ante nosotros.`,
  },
  {
    pagina: 2,
    texto: `Sus buenos deseos y presencia son un gran regalo para nosotros, pero en caso de hacernos un obsequio, este puede ser en efectivo.`,
  },
];


export const fotosCarrossel = [
  {
    img: foto0
  },
  {
    img: foto1
  },
  {
    img: foto2
  },
  {
    img: foto3
  },
  {
    img: foto4
  },
  {
    img: foto5
  },
  {
    img: foto6
  },
  {
    img: foto7
  },
  {
    img: foto8
  },
  {
    img: foto9
  },
  {
    img: foto10
  },
  {
    img: foto11
  },
  {
    img: foto12
  },
  {
    img: foto13
  },
]
