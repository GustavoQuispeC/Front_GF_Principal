const BRANDS = [
  "ACEROS AREQUIPA",
  "PACASMAYO",
  "ETERNIT",
  "SIDERPERU",
  "LARK",
  "NICOLL",
  "FIBRAFORTE",
  "UYUSTOOLS",
  "ANYPSA",
  "SIKA",
  "CPP",
  "PRODAC",
];

export default function Marcas() {
  return (
    <section className="w-full bg-slate-50 py-12 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 2xl:px-12 mt-8">
        
        {/* HEADER */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-blue-900 dark:text-white md:leading-[45px]">
            Aliados estratégicos
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-white/70">
            Trabajamos con marcas reconocidas del sector construcción,
            garantizando materiales de calidad, confianza y respaldo para cada proyecto.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
          {BRANDS.map((brand) => (
            <a
              key={brand}
              href="#"
              aria-label={`Ver productos de ${brand}`}
              title={brand}
              className="
                group relative flex items-center justify-center
                rounded-2xl
                bg-white dark:bg-gray-400
                border border-black/5 dark:border-white/10
                px-6 py-8
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-lg
                hover:shadow-orange-500/20
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-orange-500/60
              "
            >
              {/* Glow sutil naranja */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none shadow-[0_0_35px_rgba(249,115,22,0.15)]" />

              <img
                src={`https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Marcas%2F${encodeURIComponent(
                  brand
                )}.png?alt=media`}
                alt={brand}
                loading="lazy"
                className="
                  h-16 sm:h-20 w-auto max-w-[200px]
                  object-contain
                  grayscale opacity-80
                  transition duration-300
                  group-hover:grayscale-0
                  group-hover:opacity-100
                "
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
