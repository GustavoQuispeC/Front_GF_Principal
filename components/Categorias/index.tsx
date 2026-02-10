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
      title: "Chess",
      img: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      title: "Fierros",
      img: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FFIERROS.png?alt=media&token=bed4ba9b-a40d-40b3-a0c3-e0dff043de68",
    },
    {
      title: "Cricket",
      img: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
  ];

  const Card = ({ title, img, classNameImg = "h-48", big = false }: CardProps) => (
    <div className={`relative overflow-hidden rounded-2xl shadow-lg group ${big ? "md:col-span-2 md:row-span-2" : ""}`}>
      <img
        src={img}
        alt={title}
        className={`w-full ${big ? "h-full" : classNameImg} object-cover
          transition duration-300 ease-out
          group-hover:scale-110
          group-hover:brightness-75
          group-hover:blur-[2px]
        `}
      />

      {/* Texto */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`${big ? "text-2xl" : "text-xl"} font-bold text-white`}>
            {title}
          </h3>
          {big && (
            <p className="text-white">
               Somos Distribuidor autorizado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Nuestras Categorías
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Large */}
          <Card
            title="Cemento"
            img="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FCEMENTO.png?alt=media&token=b320dcf4-1228-4a61-8cad-68a9b2790e27"
            big
          />

          {/* Two small */}
          <Card
            title="Ladrillos"
            img="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FLADRILLOS.png?alt=media&token=d5e605cf-989e-4687-9117-6f7d9ae937a7"
          />
          <Card
            title="Tech Innovations"
            img="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          />

          {/* Medium */}
          <Card
            title="Perfiles y Tubos"
            img="https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Categorias%2FPERFILES.png?alt=media&token=a9a0deef-eb83-458a-8275-72cf3b3d9338"
          />
          <Card
            title="Artistic Expressions"
            img="https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
