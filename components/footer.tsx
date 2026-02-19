import { Facebook, Linkedin, Instagram, X, Mail, MapPin, Phone, Clock, LayoutDashboard } from "lucide-react";

export const Footer = () => {
  const WHATSAPP_NUMBER = "51904193374";
  const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola, quiero cotizar materiales. ¿Me pueden ayudar?",
  )}`;

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950 text-slate-200">
      {/* Patrón decorativo sutil */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* TOP */}
        <div className="py-12 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-5">
              <a href="#" className="inline-block group">
                <div className="relative">
                  <img
                    src="/LogoFamet2.png"
                    alt="Grupo Famet"
                    className="w-40 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 rounded-xl transition-all duration-300 blur-xl" />
                </div>
              </a>

              <p className="mt-5 text-sm leading-relaxed text-slate-300 max-w-md">
                Somos una empresa especializada en la venta de materiales de
                construcción, orientada a brindar <span className="text-orange-400 font-semibold">calidad, seguridad y confianza</span> en cada proyecto.
              </p>

              {/* Social */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-400 mb-3">Síguenos en redes</p>
                <ul className="flex flex-wrap gap-3">
                  {[
                    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, color: "hover:bg-blue-600" },
                    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, color: "hover:bg-blue-700" },
                    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600" },
                    { name: "X", icon: <X className="h-5 w-5" />, color: "hover:bg-slate-700" },
                  ].map((s) => (
                    <li key={s.name}>
                      <a
                        href="#"
                        aria-label={s.name}
                        className={`group inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-white/20 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${s.color}`}
                      >
                        <span className="transition-transform duration-300 group-hover:scale-110">
                          {s.icon}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-3">
              <h3 className="flex items-center gap-2 text-base font-bold text-white mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full" />
                Enlaces rápidos
              </h3>

              <ul className="space-y-3">
                {[
                  { label: "Inicio", href: "#" },
                  { label: "Categorías", href: "#" },
                  { label: "Marcas", href: "#" },
                  { label: "Ofertas especiales", href: "#" },
                  { label: "Nosotros", href: "#" },
                  { label: "Contáctenos", href: "#" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-orange-500 transition-colors" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {l.label}
                      </span>
                    </a>
                  </li>
                ))}

                {/* Separador */}
                <li className="pt-1">
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                </li>

                {/* Acceso al sistema — discreto, solo para empleados */}
                <li>
                  <a
                    href="/loginEmpleado"
                    className="group inline-flex items-center gap-2 text-slate-500 hover:text-orange-400 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-1"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 group-hover:text-orange-400 transition-colors" />
                    <span className="text-xs group-hover:translate-x-1 transition-transform duration-200">
                      Acceso al sistema
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <h3 className="flex items-center gap-2 text-base font-bold text-white mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full" />
                Contacto directo
              </h3>

              <ul className="space-y-3">
                <FooterContactItem
                  label="Tienda Libertad"
                  value="904 193 374"
                  href={WA_LINK}
                  icon={<WhatsAppIcon />}
                  variant="whatsapp"
                />
                <FooterContactItem
                  label="Tienda Salamanca"
                  value="904 193 374"
                  href={WA_LINK}
                  icon={<WhatsAppIcon />}
                  variant="whatsapp"
                />
                <FooterContactItem
                  label="Almacén Central"
                  value="904 193 374"
                  href={WA_LINK}
                  icon={<WhatsAppIcon />}
                  variant="whatsapp"
                />
                <FooterContactItem
                  label="Correo electrónico"
                  value="grupo.fametsac@gmail.com"
                  href="mailto:grupo.fametsac@gmail.com"
                  icon={<Mail className="h-5 w-5" />}
                />
              </ul>

              {/* Horario */}
              <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/30">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/30">
                    <Clock className="w-4 h-4 text-blue-300" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Horario de atención</h4>
                </div>
                <p className="text-sm text-slate-300 ml-11">
                  Lunes a Viernes: 8:00 AM - 6:30 PM
                </p>
                <p className="text-sm text-slate-300 ml-11">
                  Sábado: 8:00 AM - 2:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative h-px w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Bottom */}
        <div className="py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-5 text-sm justify-center md:justify-start">
              {[
                { label: "Términos de servicio", href: "#" },
                { label: "Políticas de privacidad", href: "#" },
                { label: "Seguridad y pagos", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-1"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="text-center md:text-right">
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} <span className="font-semibold text-slate-300">Grupo Famet SAC</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Todos los derechos reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ---------- Contact Item ---------- */

function FooterContactItem({
  label,
  value,
  href,
  icon,
  variant,
}: {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  variant?: "whatsapp";
}) {
  const isWA = variant === "whatsapp";

  return (
    <li>
      <a
        href={href}
        target={isWA ? "_blank" : undefined}
        rel={isWA ? "noreferrer" : undefined}
        className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 border-2 ${
          isWA
            ? "border-emerald-900/30 bg-emerald-950/20 hover:border-emerald-500/50 hover:bg-emerald-900/30 hover:shadow-lg hover:shadow-emerald-500/10"
            : "border-orange-900/30 bg-orange-950/20 hover:border-orange-500/50 hover:bg-orange-900/30 hover:shadow-lg hover:shadow-orange-500/10"
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
            isWA
              ? "bg-emerald-600/20 group-hover:bg-emerald-500 text-emerald-400 group-hover:text-white"
              : "bg-orange-600/20 group-hover:bg-orange-500 text-orange-400 group-hover:text-white"
          }`}
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <small className="block text-xs text-slate-500 mb-0.5">{label}</small>
          <span className="block text-sm font-semibold text-slate-200 group-hover:text-white truncate">
            {value}
          </span>
        </div>

        {isWA && (
          <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        )}
      </a>
    </li>
  );
}

/* ---------- WhatsApp Icon ---------- */

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="w-5 h-5"
      fill="currentColor"
    >
      <path d="M16 0a16 16 0 0 0-13.84 24.08L0 32l8.16-2.16A16 16 0 1 0 16 0zm0 29.33a13.22 13.22 0 0 1-6.72-1.8l-.48-.28-4.84 1.28 1.3-4.78-.32-.5A13.27 13.27 0 1 1 16 29.33zm7.38-9.38c-.4-.2-2.36-1.17-2.73-1.3s-.63-.2-.9.2-1.04 1.3-1.28 1.56-.48.3-.84.1a10.94 10.94 0 0 1-3.36-2.06 12.7 12.7 0 0 1-2.36-3.02c-.24-.4 0-.62.18-.84s.42-.52.63-.8c.2-.28.26-.46.38-.76s.06-.58 0-.8c-.1-.24-.94-2.4-1.3-3.3s-.7-.7-.96-.7h-.82a1.6 1.6 0 0 0-1.18.56 4.93 4.93 0 0 0-1.44 3.66c0 2.16 1.56 4.27 1.76 4.56s3.1 4.72 7.55 6.6a25.37 25.37 0 0 0 2.52.94 6 6 0 0 0 2.76.18c.84-.12 2.5-1 2.85-1.9s.35-1.7.25-1.88-.36-.28-.75-.48z" />
    </svg>
  );
}