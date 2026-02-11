import { Facebook, Linkedin, Instagram, X, Mail } from "lucide-react";

export const Footer = () => {
  const WHATSAPP_NUMBER = "51904193374";
  const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola, quiero cotizar materiales. ¿Me pueden ayudar?"
  )}`;

  return (
    <footer className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 2xl:px-12">

        {/* TOP */}
        <div className="py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Brand */}
            <div className="lg:col-span-5">
              <a href="#" className="inline-flex items-center gap-3">
                <img src="/LogoFamet2.png" alt="Grupo Famet" className="w-44" />
              </a>

              <p className="mt-5 text-sm leading-relaxed text-slate-300">
                Somos una empresa especializada en la venta de materiales de construcción,
                orientada a brindar calidad, seguridad y confianza en cada proyecto.
              </p>

              CTA
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
                >
                  Cotiza ahora
                </a>

                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
                >
                  Ver catálogo
                </a>
              </div>

              {/* Social */}
              <ul className="mt-7 flex flex-wrap gap-3">
                {[
                  { name: "Facebook", icon: <Facebook className="h-6 w-6" /> },
                  { name: "LinkedIn", icon: <Linkedin className="h-6 w-6" /> },
                  { name: "Instagram", icon: <Instagram className="h-6 w-6" /> },
                  { name: "X", icon: <X className="h-6 w-6" /> },
                ].map((s) => (
                  <li key={s.name}>
                    <a
                      href="#"
                      aria-label={s.name}
                      className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:border-orange-500/40 hover:bg-orange-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70"
                    >
                      <span className="opacity-90 transition group-hover:opacity-100">
                        {s.icon}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-extrabold tracking-wide text-white">
                Enlaces
              </h3>

              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { label: "Categorías", href: "#" },
                  { label: "Marcas", href: "#" },
                  { label: "Ofertas", href: "#" },
                  { label: "Contáctenos", href: "#" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-slate-300 hover:text-white hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 rounded"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <h3 className="text-sm font-extrabold tracking-wide text-white">
                Contacto
              </h3>

              <ul className="mt-4 space-y-4">
                <FooterContactItem
                  label="Tienda Libertad"
                  value="WhatsApp: 904 193 374"
                  href={WA_LINK}
                  icon={<WhatsAppIcon />}
                  variant="whatsapp"
                />
                <FooterContactItem
                  label="Tienda Salamanca"
                  value="WhatsApp: 904 193 374"
                  href={WA_LINK}
                  icon={<WhatsAppIcon />}
                  variant="whatsapp"
                />
                <FooterContactItem
                  label="Almacén Central"
                  value="WhatsApp: 904 193 374"
                  href={WA_LINK}
                  icon={<WhatsAppIcon />}
                  variant="whatsapp"
                />
                <FooterContactItem
                  label="Correo"
                  value="grupo.fametsac@gmail.com"
                  href="mailto:grupo.fametsac@gmail.com"
                  icon={<Mail className="h-5 w-5" />}
                />
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Bottom */}
        <div className="py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-4 text-sm justify-center md:justify-start">
            {[
              { label: "Términos de servicio", href: "#" },
              { label: "Políticas de privacidad", href: "#" },
              { label: "Seguridad", href: "#" },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-slate-300 hover:text-white hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 rounded"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-center md:text-right text-sm text-slate-400">
            © Grupo Famet SAC. Todos los derechos reservados.
          </p>
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
        className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition border border-white/10 bg-white/5 hover:-translate-y-0.5 ${
          isWA
            ? "hover:border-emerald-500/40 hover:bg-emerald-500/10"
            : "hover:border-orange-500/40 hover:bg-orange-500/10"
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ${
            isWA ? "text-emerald-400" : "text-white"
          }`}
        >
          {icon}
        </div>

        <div>
          <small className="block text-xs text-slate-400">{label}</small>
          <span className="block text-sm font-semibold text-slate-200 group-hover:text-white">
            {value}
          </span>
        </div>
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
      className="w-5 h-5 text-emerald-500"
      fill="currentColor"
    >
      <path d="M16 0a16 16 0 0 0-13.84 24.08L0 32l8.16-2.16A16 16 0 1 0 16 0zm0 29.33a13.22 13.22 0 0 1-6.72-1.8l-.48-.28-4.84 1.28 1.3-4.78-.32-.5A13.27 13.27 0 1 1 16 29.33zm7.38-9.38c-.4-.2-2.36-1.17-2.73-1.3s-.63-.2-.9.2-1.04 1.3-1.28 1.56-.48.3-.84.1a10.94 10.94 0 0 1-3.36-2.06 12.7 12.7 0 0 1-2.36-3.02c-.24-.4 0-.62.18-.84s.42-.52.63-.8c.2-.28.26-.46.38-.76s.06-.58 0-.8c-.1-.24-.94-2.4-1.3-3.3s-.7-.7-.96-.7h-.82a1.6 1.6 0 0 0-1.18.56 4.93 4.93 0 0 0-1.44 3.66c0 2.16 1.56 4.27 1.76 4.56s3.1 4.72 7.55 6.6a25.37 25.37 0 0 0 2.52.94 6 6 0 0 0 2.76.18c.84-.12 2.5-1 2.85-1.9s.35-1.7.25-1.88-.36-.28-.75-.48z" />
    </svg>
  );
}
