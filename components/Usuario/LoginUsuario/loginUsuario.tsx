"use client";

import React, { useMemo, useState } from "react";
import {
  Button,
  Input,
  Link,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, Zap } from "lucide-react";
import { loginUsuario } from "@/helpers/usuario.helpers";
import { toastError, toastSuccess } from "@/helpers/toast.helper";

type LoginPageProps = {
  forgotHref?: string;
  brandName?: string;
  storageKey?: string;
};

export default function LoginUsuario({
  forgotHref = "/intranet/recuperar-password",
  brandName = "Grupo Famet",
  storageKey = "auth_usuario",
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const emailOk = /\S+@\S+\.\S+/.test(email.trim());
    return emailOk && password.trim().length > 0 && !isLoading;
  }, [email, password, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setIsLoading(true);
      setErrorMsg(null); // limpia error anterior

      const payload = await loginUsuario(email.trim(), password);

      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(payload));
      }

      toastSuccess("Inicio de sesión exitoso 🎉");
      window.location.assign("/dashboard");
    } catch (err: any) {
      const msg =
        err?.message ||
        "No se pudo iniciar sesión. Verifica tus credenciales e inténtalo nuevamente.";

      setErrorMsg(msg);
      toastError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#F2F2F0] dark:bg-[#0E0E0E]">

      {/* ── Ambient blobs ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-[120px] dark:bg-orange-600/10" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-sky-500/15 blur-[120px] dark:bg-sky-600/8" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
=======
    <main className="min-h-[100svh] w-full bg-[#F4F4F4] dark:bg-gray-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-orange-600/15 blur-2xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600/10 blur-2xl" />
>>>>>>> 46162e0895973c48cc363c9dd9f24d4350e194b3
      </div>

      {/* ── Page layout ───────────────────────────────────── */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* ── Left panel (desktop only) ──────────────────── */}
          <section className="hidden lg:block">
            <div className="max-w-md space-y-6">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
                </span>
                Acceso al sistema
              </span>

              {/* Headline */}
              <div>
                <h1
                  className="text-5xl font-black leading-[1.1] tracking-tight text-[#0E0E0E] dark:text-white"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Bienvenido a{" "}
                  <span className="relative whitespace-nowrap">
                    <span className="relative z-10 text-orange-600">{brandName}</span>
                    <svg
                      aria-hidden
                      className="absolute -bottom-1 left-0 w-full"
                      viewBox="0 0 200 8"
                      fill="none"
                    >
                      <path
                        d="M2 6 Q50 2 100 5 Q150 8 198 4"
                        stroke="#EA580C"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
                <p className="mt-4 text-base leading-relaxed text-[#555] dark:text-[#888]">
                  Ingresa con tu correo y contraseña para continuar y gestionar
                  tu cuenta de forma segura.
                </p>
              </div>

<<<<<<< HEAD
              {/* Feature pills */}
              <ul className="flex flex-wrap gap-2">
                {["Seguridad SSL", "2FA disponible", "Soporte 24/7"].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-1.5 rounded-full border border-[#E0E0E0] bg-white px-3 py-1 text-xs font-medium text-[#333] dark:border-white/10 dark:bg-white/5 dark:text-white/60"
                  >
                    <Zap size={11} className="text-orange-500" />
                    {f}
                  </li>
                ))}
              </ul>
=======
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#11181C] dark:text-white">
                Bienvenido a {brandName}
              </h1>

              <p className="mt-3 text-base leading-relaxed text-default-600">
                Ingresa con tu correo y contraseña para continuar.
              </p>
>>>>>>> 46162e0895973c48cc363c9dd9f24d4350e194b3
            </div>
          </section>

          {/* ── Right panel – login card ───────────────────── */}
          <section className="mx-auto w-full max-w-md">
            {/* Mobile-only heading */}
            <div className="mb-6 lg:hidden">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-semibold text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-400">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Acceso al sistema
              </span>
              <h1
                className="mt-3 text-3xl font-black text-[#0E0E0E] dark:text-white"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Bienvenido a{" "}
                <span className="text-orange-600">{brandName}</span>
              </h1>
            </div>

            <Card
              className="
                overflow-visible border-0
                shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)]
                dark:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6)]
                bg-white dark:bg-[#161616]
              "
            >
              {/* Top accent bar */}
              <div className="h-[3px] w-full rounded-t-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400" />

              <CardHeader className="flex flex-col items-start gap-1 px-6 pt-6 pb-2">
                <h2
                  className="text-2xl font-bold text-[#0E0E0E] dark:text-white"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Iniciar sesión
                </h2>
                <p className="text-sm text-[#777] dark:text-[#666]">
                  Ingresa tus credenciales para acceder.
                </p>
              </CardHeader>

              <CardBody className="px-6 pb-7 pt-3">
                <form
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Email */}
                  <Input
                    isRequired
                    value={email}
                    onValueChange={(v) => {
                      setEmail(v);
                      setErrorMsg(null);
                    }}
                    label="Correo electrónico"
                    labelPlacement="outside"
                    placeholder="ejemplo@correo.com"
                    variant="bordered"
                    type="email"
                    autoComplete="email"
                    startContent={
                      <Mail size={16} className="text-[#999] dark:text-[#555]" />
                    }
                    classNames={{
                      inputWrapper: [
                        "h-12 border-[#E5E5E5] dark:border-[#2A2A2A]",
                        "bg-[#FAFAFA] dark:bg-[#1A1A1A]",
                        "hover:border-orange-400 dark:hover:border-orange-700",
                        "data-[focus=true]:border-orange-500 dark:data-[focus=true]:border-orange-500",
                        "transition-colors duration-200",
                      ],
                      label:
                        "text-[#333] dark:text-[#AAA] text-sm font-semibold mb-1",
                      input: "dark:text-white placeholder:text-[#BBB] dark:placeholder:text-[#444]",
                    }}
                  />

                  {/* Password */}
                  <div className="flex flex-col gap-1">
                    <Input
                      isRequired
                      value={password}
                      onValueChange={(v) => {
                        setPassword(v);
                        setErrorMsg(null);
                      }}
                      label="Contraseña"
                      labelPlacement="outside"
                      placeholder="••••••••"
                      variant="bordered"
                      type={isVisible ? "text" : "password"}
                      autoComplete="current-password"
                      startContent={
                        <Lock size={16} className="text-[#999] dark:text-[#555]" />
                      }
                      classNames={{
                        inputWrapper: [
                          "h-12 border-[#E5E5E5] dark:border-[#2A2A2A]",
                          "bg-[#FAFAFA] dark:bg-[#1A1A1A]",
                          "hover:border-orange-400 dark:hover:border-orange-700",
                          "data-[focus=true]:border-orange-500 dark:data-[focus=true]:border-orange-500",
                          "transition-colors duration-200",
                        ],
                        label:
                          "text-[#333] dark:text-[#AAA] text-sm font-semibold mb-1",
                        input: "dark:text-white placeholder:text-[#BBB] dark:placeholder:text-[#444]",
                      }}
                      endContent={
                        <button
                          type="button"
                          onClick={() => setIsVisible((v) => !v)}
                          className="focus:outline-none"
                          aria-label={
                            isVisible ? "Ocultar contraseña" : "Mostrar contraseña"
                          }
                        >
                          {isVisible ? (
                            <EyeOff size={18} className="text-[#999] dark:text-[#555] hover:text-orange-500 transition-colors" />
                          ) : (
                            <Eye size={18} className="text-[#999] dark:text-[#555] hover:text-orange-500 transition-colors" />
                          )}
                        </button>
                      }
                    />

                    {/* Forgot password – right aligned under field */}
                    <div className="flex justify-end">
                      <Link
                        href={forgotHref}
                        size="sm"
                        className="text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                  </div>

                  {/* Error message */}
                  {errorMsg && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 animate-[fadeIn_.2s_ease]">
                      <span className="mt-0.5 text-base leading-none">⚠️</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    isDisabled={!canSubmit}
                    isLoading={isLoading}
                    className="
                      mt-1 h-12 w-full rounded-xl
                      bg-gradient-to-r from-orange-600 to-orange-500
                      text-white font-bold tracking-wide
                      shadow-[0_4px_20px_-4px_rgba(234,88,12,0.5)]
                      hover:shadow-[0_6px_24px_-4px_rgba(234,88,12,0.65)]
                      hover:opacity-95
                      active:scale-[0.98]
                      transition-all duration-200
                      disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed
                    "
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {isLoading ? "Verificando…" : "INGRESAR"}
                  </Button>
                </form>

                {/* Divider + register CTA */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
                  <span className="text-xs text-[#AAA] dark:text-[#555]">o</span>
                  <div className="h-px flex-1 bg-[#E5E5E5] dark:bg-[#2A2A2A]" />
                </div>

                <p className="mt-4 text-center text-xs text-[#777] dark:text-[#555]">
                  ¿No tienes cuenta?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 transition-colors text-xs"
                  >
                    Regístrate aquí
                  </Link>
                </p>
              </CardBody>
            </Card>

            {/* Footer note */}
            <p className="mt-5 text-center text-[11px] text-[#AAA] dark:text-[#444]">
              Al ingresar aceptas nuestros{" "}
              <Link href="/terms" className="text-[11px] text-[#888] dark:text-[#555] underline underline-offset-2">
                Términos de uso
              </Link>{" "}
              y{" "}
              <Link href="/privacy" className="text-[11px] text-[#888] dark:text-[#555] underline underline-offset-2">
                Política de privacidad
              </Link>
              .
            </p>
          </section>
        </div>
      </div>

      {/* Sora font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
      `}</style>
    </main>
  );
}
