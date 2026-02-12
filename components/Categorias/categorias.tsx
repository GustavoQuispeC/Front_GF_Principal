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
    <button
      type="button"
      className={[
        "group relative overflow-hidden rounded-2xl text-left",
        "bg-white/70 dark:bg-white/5",
        "border border-black/5 dark:border-white/10",
        "shadow-sm hover:shadow-xl",
        "transition-all duration-300",
        "hover:-translate-y-0.5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60",
        big ? "md:col-span-2 md:row-span-2" : "",
      ].join(" ")}
    >
      {/* Glow naranja sutil (como Marcas) */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 shadow-[0_0_45px_rgba(249,115,22,0.18)]" />

      {/* Imagen */}
      <img
        src={img}
        alt={title}
        loading="lazy"
        className={[
          "w-full object-cover",
          big ? "h-full" : classNameImg,
          "transition-transform duration-500 ease-out",
          "group-hover:scale-[1.08]",
        ].join(" ")}
      />

      {/* Overlay pro: degradado para legibilidad */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20" />
        {/* borde brillo sutil */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* “shine” suave */}
        <div className="absolute -top-24 left-[-40%] h-40 w-[140%] rotate-6 bg-white/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Texto siempre visible */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="w-full">
          <h3
            className={[
              "font-extrabold tracking-tight text-white",
              big ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
            ].join(" ")}
          >
            {title}
          </h3>

          {big && (
            <p className="mt-2 text-white/90 text-sm sm:text-base">
              Somos Distribuidor autorizado.
            </p>
          )}

          {/* CTA e-commerce (aparece en hover, no rompe el layout) */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm text-white/90 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Ver productos <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <section className="bg-slate-50 dark:bg-gray-900">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-10">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-900 dark:text-white">
            Nuestras Categorías
          </h1>
          <p className="mt-3 text-slate-600 dark:text-white/70">
            Encuentra materiales y soluciones para tu proyecto.
          </p>
        </div>

        {/* MISMA cantidad de columnas/filas: 2 en mobile, 4 en md */}
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
    </section>
  );
}
