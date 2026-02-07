
export default function Marcas() {
    return (
        <div className="w-full bg-slate-50 px-6 py-12 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-3xl mb-12 max-md:text-center">
          <h2 className="text-slate-900 text-3xl font-bold mb-4 md:!leading-[45px] leading-[40px] dark:text-white">Aliados estratégicos</h2>
          <p className="text-slate-600 text-[15px] leading-relaxed dark:text-gray-400">Trabajamos con marcas reconocidas del sector construcción, garantizando materiales de calidad, confianza y respaldo para cada proyecto.</p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto gap-8">
          <div className="bg-white border border-gray-200 p-5 rounded-2xl">
            <div className="flex items-center gap-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Aceros_Logo.png" alt="aceros arequipa" />
            </div>
            <hr className="border-gray-200 my-6" />
            <div>
              <p className="text-slate-600 text-[15px] leading-relaxed">Líder en acero, reconocida por su calidad, resistencia y respaldo en grandes proyectos de infraestructura.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-2xl">
            <div className="flex items-center gap-6">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoY5G7LMnGrJ43P8yo_w9QwBaKx4ekf_z3Qg&s" alt="cemento pacasmayo" />
            </div>
            <hr className="border-gray-200 my-6" />
            <div>
              <p className="text-slate-600 text-[15px] leading-relaxed">Reconocida por su calidad y resistencia, es una opción confiable para obras civiles, estructuras y proyectos de infraestructura.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-2xl">
            <div className="flex items-center gap-6">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVSKaRE3wPgxynIFiyGB3yZxdQadRUWbngA&s" alt="sideperu" />
            </div>
            <hr className="border-gray-200 my-6" />
            <div>
              <p className="text-slate-600 text-[15px] leading-relaxed">Líder en la producción de acero para la construcción, reconocida por la calidad, resistencia y durabilidad de sus productos.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-2xl">
            <div className="flex items-center gap-6">
             <img src="https://ladrilloslark.pe/wp-content/uploads/2025/07/logotipo.png" alt="lark" />
            </div>
            <hr className="border-gray-200 my-6" />
            <div>
              <p className="text-slate-600 text-[15px] leading-relaxed">Reconocida por su resistencia y durabilidad en proyectos de construcción de viviendas e infraestructura en todo el país.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-2xl">
            <div className="flex items-center gap-6">
              <img src="data:image/png;base64,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" alt="sika" />
            </div>
            <hr className="border-gray-200 my-6" />
            <div>
              <p className="text-slate-600 text-[15px] leading-relaxed">Conocida por sus soluciones de sellado, adhesión, impermeabilización y refuerzo que aportan calidad, durabilidad e innovación a obras civiles.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 rounded-2xl">
            <div className="flex items-center gap-6">
              <img src="https://live.staticflickr.com/3823/19077284720_e6ffb6905c_b.jpg" alt="eternit" />
            </div>
            <hr className="border-gray-200 my-6" />
            <div>
              <p className="text-slate-600 text-[15px] leading-relaxed">Marca reconocida en el sector construcción por sus productos de fibrocemento de alta calidad, utilizados en techos y revestimientos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>  
    )};


