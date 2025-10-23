export const aguas = [
  {
    id: 1,
    nombre: "Agua Mineral Bonaqua",
    descripcion: "Botella de 500 ml – Sin gas",
    precio: 150,
    imagen: "/images/500.png",
  },
  {
    id: 2,
    nombre: "Agua Saborizada",
    descripcion: "Botella 1 L – Sabor limón",
    precio: 180,
    imagen: "/images/agua2.png",
  },
];

export const jugos = [
  {
    id: 101,
    nombre: "Jugo Citric Naranja",
    descripcion: "Botella 1 L",
    precio: 350,
    imagen: "/images/jugo1.png",
  },
  {
    id: 102,
    nombre: "Jugo Baggio Manzana",
    descripcion: "Botella 1 L",
    precio: 330,
    imagen: "/images/jugo2.png",
  },
];

export const gaseosas = [
  {
    id: 201,
    nombre: "Coca-Cola 1,5 L",
    descripcion: "Clásica",
    precio: 750,
    imagen: "/images/coca.png",
  },
  {
    id: 202,
    nombre: "Sprite 1,5 L",
    descripcion: "Con azúcar",
    precio: 720,
    imagen: "/images/sprite.png",
  },
];

export const alcoholes = [
  {
    id: 301,
    nombre: "Cerveza Heineken",
    descripcion: "Lata 473 ml",
    precio: 950,
    imagen: "/images/heineken.png",
  },
  {
    id: 302,
    nombre: "Fernet Branca 750 ml",
    descripcion: "Botella",
    precio: 6500,
    imagen: "/images/fernet.png",
  },
];

// Catálogo global listo para Explorar
export const todosLosProductos = [
  ...aguas,
  ...jugos,
  ...gaseosas,
  ...alcoholes,
];
