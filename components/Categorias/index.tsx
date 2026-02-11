interface CardData {
  title: string;
  img: string;
}
interface CardProps {
  title: string;
  img: string;
  classNameImg?: string;
  big?: boolean;
}

export default function Categorias() {
  const cards: CardData[] = [
    {
      title: "Teja Andina",
      img: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FTEJA%20ANDINA.png?alt=media&token=783b20f5-7e8d-4cce-bc89-b8a85f45d2c2",
    },
    {
      title: "Tuberías, tanques y accesorios",
      img: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FTUBERIAS.png?alt=media&token=11c93a02-c2fa-4d91-8687-1dcc0d76127e",
    },
    {
      title: "Fierros",
      img: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FFIERROS.png?alt=media&token=bed4ba9b-a40d-40b3-a0c3-e0dff043de68",
    },
    {
      title: "Calaminas",
      img: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FCALAMINA.png?alt=media&token=58b0c4dc-2a02-467e-8bf3-4edc4a0f9ec3",
    },
  ];

  const Card = ({ title, img, classNameImg = "h-48", big = false }: CardProps) => (
  <div
    className={`relative overflow-hidden rounded-2xl shadow-lg group ${
      big ? "md:col-span-2 md:row-span-2" : ""
    }`}
  >
    {/* Imagen */}
    <img
      src={img}
      alt={title}
      className={`w-full ${big ? "h-full" : classNameImg} object-cover
        transition-transform duration-300 ease-out
        group-hover:scale-110
      `}
    />

    {/* Overlay + Texto SIEMPRE visible y centrado */}
    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
      <div className="text-center px-4">
        <h3 className={`${big ? "text-2xl" : "text-xl"} font-bold text-white`}>
          {title}
        </h3>

        {big && (
          <p className="text-white mt-2">
            Somos Distribuidor autorizado.
          </p>
        )}
      </div>
    </div>
  </div>
);

  return (
    <div className="bg-slate-50 dark:bg-gray-900">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Nuestras Categorías
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Large */}
          <Card
            title="Cementos"
            img="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FCEMENTOS.png?alt=media&token=5d3cda29-4bb0-4995-8a06-8ba682fad27d"
            big
          />

          {/* Two small */}
          <Card
            title="Ladrillos"
            img="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FLADRILLOS.png?alt=media&token=d5e605cf-989e-4687-9117-6f7d9ae937a7"
          />
          <Card
            title="Clavos"
            img="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FCLAVOS.png?alt=media&token=b28b962f-bab1-4ab4-a8af-39554ac19f70"
          />

          {/* Medium */}
          <Card
            title="Perfiles y Tubos"
            img="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FPERFILES.png?alt=media&token=a9a0deef-eb83-458a-8275-72cf3b3d9338"
          />
          <Card
            title="Alambres"
            img="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FALAMBRES.png?alt=media&token=90569c1e-7376-4c63-8de0-bd811dac7435"
          />

          {/* Bottom */}
          {cards.map((c, i) => (
            <Card key={i} title={c.title} img={c.img} />
          ))}
        </div>
      </div>
    </div>
  );
}
