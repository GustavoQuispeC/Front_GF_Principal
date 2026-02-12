"use client";

import { useMemo, useState } from "react";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";

const tiendas = [
  {
    id: 1,
    nombre: "Tienda Libertad",
    direccion: "Jr. Libertad 824",
    telefono: "+1 23494 34993",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2707623661913!2d-77.87393042323248!3d-6.227988993760102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6ab302a2a09a7%3A0x71faab90638d4838!2sGrupo%20Famet!5e0!3m2!1ses!2spe!4v1770703752465!5m2!1ses!2spe",
    gmapsLink: "https://www.google.com/maps?q=Grupo%20Famet",
  },
  {
    id: 2,
    nombre: "Tienda Salamanca",
    direccion: "Jr. Salamanca 858",
    telefono: "+1 23494 34993",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.140116959124!2d-77.87222178117379!3d-6.226735088928205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6ab3d0ad44f01%3A0x554e80bc9ed5e677!2sNEGOCIOS%20FAMET!5e0!3m2!1ses!2spe!4v1770704383965!5m2!1ses!2spe",
    gmapsLink: "https://www.google.com/maps?q=NEGOCIOS%20FAMET",
  },
  {
    id: 3,
    nombre: "Almacén Principal",
    direccion: "Cruce Pucacruz",
    telefono: "+1 23494 34993",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15864.590983710019!2d-77.89342045783998!3d-6.24425191674977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6aba3605476b9%3A0x24e39c6024492983!2sGrupo%20Famet%20sac!5e0!3m2!1ses!2spe!4v1770704463430!5m2!1ses!2spe",
    gmapsLink: "https://www.google.com/maps?q=Grupo%20Famet%20sac",
  },
];

export default function Contactenos() {
  const [tiendaActiva, setTiendaActiva] = useState(tiendas[0]);

  const email = "grupo.fametsac@gmail.com";

  const tiendaActivaLabel = useMemo(() => {
    return `${tiendaActiva.nombre} — ${tiendaActiva.direccion}`;
  }, [tiendaActiva]);

  return (
    <section className="bg-slate-50 dark:bg-gray-900">
      <div className="py-12">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 2xl:px-12">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-900 dark:text-white">
              Visítanos o contáctanos
            </h2>
            <p className="mt-3 text-slate-600 dark:text-white/70">
              Elige una sede para ver el mapa y obtener indicaciones. Estamos listos para ayudarte con tu compra.
            </p>
          </div>

          {/* Content */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* MAPA */}
            <div className="overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm">
              <div className="px-5 py-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-white/60">
                    Ubicación seleccionada
                  </p>
                  <p className="truncate font-semibold text-slate-900 dark:text-white">
                    {tiendaActivaLabel}
                  </p>
                </div>

                <a
                  href={tiendaActiva.gmapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60"
                >
                  <Navigation size={16} />
                  Cómo llegar
                </a>
              </div>

              <iframe
                key={tiendaActiva.id}
                title={tiendaActiva.nombre}
                src={tiendaActiva.mapSrc}
                width="100%"
                height="440"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* PANEL DERECHA */}
            <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm overflow-hidden">
              {/* Top: contacto rápido */}
              <div className="p-5 border-b border-black/5 dark:border-white/10">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-white/60">
                  Atención
                </p>

                <div className="mt-2 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm font-medium text-slate-800 dark:text-white/90 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60"
                  >
                    <Mail size={16} />
                    {email}
                  </a>

                  <a
                    href={`tel:${tiendaActiva.telefono.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm font-medium text-slate-800 dark:text-white/90 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60"
                  >
                    <Phone size={16} />
                    Llamar
                  </a>
                </div>
              </div>

              {/* Lista */}
              <div className="p-2">
                {tiendas.map((tienda) => {
                  const activa = tienda.id === tiendaActiva.id;

                  return (
                    <button
                      key={tienda.id}
                      onClick={() => setTiendaActiva(tienda)}
                      className={[
                        "w-full text-left rounded-2xl px-4 py-4 transition",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60",
                        activa
                          ? "bg-orange-50/80 dark:bg-orange-500/10 border border-orange-200/80 dark:border-orange-400/20"
                          : "hover:bg-black/[0.03] dark:hover:bg-white/[0.06] border border-transparent",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={[
                            "mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl",
                            activa
                              ? "bg-orange-600 text-white"
                              : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-white/70",
                          ].join(" ")}
                        >
                          <MapPin size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                              {tienda.nombre}
                            </h3>
                            {activa && (
                              <span className="shrink-0 rounded-full bg-orange-600/10 text-orange-700 dark:text-orange-300 px-2 py-0.5 text-xs font-semibold">
                                Seleccionada
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                            {tienda.direccion}
                          </p>

                          <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                            {tienda.telefono}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer opcional */}
              <div className="px-5 py-4 border-t border-black/5 dark:border-white/10">
                <p className="text-sm text-slate-600 dark:text-white/70">
                  ¿Necesitas ayuda con tu pedido? Escríbenos y te asesoramos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
