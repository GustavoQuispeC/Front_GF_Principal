'use client';

import { useState } from "react";
import { MapPin } from "lucide-react";

const tiendas = [
  {
    id: 1,
    nombre: "Tienda Libertad",
    direccion: "Jr. Libertad 824",
    telefono: "+1 23494 34993",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2707623661913!2d-77.87393042323248!3d-6.227988993760102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6ab302a2a09a7%3A0x71faab90638d4838!2sGrupo%20Famet!5e0!3m2!1ses!2spe!4v1770703752465!5m2!1ses!2spe",
  },
  {
    id: 2,
    nombre: "Tienda Salamanca",
    direccion: "Jr. Salamanca 858",
    telefono: "+1 23494 34993",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.140116959124!2d-77.87222178117379!3d-6.226735088928205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6ab3d0ad44f01%3A0x554e80bc9ed5e677!2sNEGOCIOS%20FAMET!5e0!3m2!1ses!2spe!4v1770704383965!5m2!1ses!2spe",
  },
  {
    id: 3,
    nombre: "Almacén Principal",
    direccion: "Cruce Pucacruz",
    telefono: "+1 23494 34993",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15864.590983710019!2d-77.89342045783998!3d-6.24425191674977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6aba3605476b9%3A0x24e39c6024492983!2sGrupo%20Famet%20sac!5e0!3m2!1ses!2spe!4v1770704463430!5m2!1ses!2spe",
  },
];


export default function Contactenos() {
    const [tiendaActiva, setTiendaActiva] = useState(tiendas[0]);
  return (
     <section className="bg-gray-50 dark:bg-gray-900">
      <div className="px-6 sm:px-10 py-12">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Visítanos o Contáctanos
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Encuentra nuestra ubicación y contáctanos para cualquier consulta.
            </p>
          </div>

          {/* Content */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* MAPA */}
            <div className="rounded-3xl overflow-hidden shadow">
              <iframe
                key={tiendaActiva.id}
                src={tiendaActiva.mapSrc}
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* LISTA DE TIENDAS */}
            <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden">
              {tiendas.map((tienda) => {
                const activa = tienda.id === tiendaActiva.id;

                return (
                  <button
                    key={tienda.id}
                    onClick={() => setTiendaActiva(tienda)}
                    className={`w-full text-left px-6 py-4 border-b last:border-none transition
                      ${activa ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin
                        className={`mt-1 ${
                          activa ? "text-indigo-600" : "text-gray-400"
                        }`}
                        size={20}
                      />

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {tienda.nombre}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {tienda.direccion}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Tel: {tienda.telefono}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}

              <div className="px-6 py-4 border-t">
                <p className="text-gray-600 text-sm">
                  📧 grupo.fametsac@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
