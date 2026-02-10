export default function Marcas() {
  return (
    <div className="w-full bg-slate-50 px-6 py-12 dark:bg-gray-900">
      <div className="container mx-auto px-8 mt-32">

        {/* TEXTO CENTRADO */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-blue-900 text-3xl font-bold mb-4 md:!leading-[45px] leading-[40px] dark:text-white">
            Aliados estratégicos
          </h2>
          <p className="text-slate-600 text-[15px] leading-relaxed dark:text-gray-400">
            Trabajamos con marcas reconocidas del sector construcción,
            garantizando materiales de calidad, confianza y respaldo para cada
            proyecto.
          </p>
        </div>

        {/* GRID DE MARCAS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {[
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
          ].map((brand, index) => (
            <div
              key={index}
              className="group bg-neutral-100 dark:bg-gray-50 p-4 xl:p-8 flex justify-center items-center grayscale hover:grayscale-0 transition duration-300 overflow-hidden"
            >
              <img
                className="w-full h-full object-contain scale-115 transition-transform duration-300"
                src={`https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Marcas%2F${encodeURIComponent(
                  brand
                )}.png?alt=media`}
                alt={brand}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
