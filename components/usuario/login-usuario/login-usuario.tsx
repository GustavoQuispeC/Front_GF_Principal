"use client";

import React, { useMemo, useState } from "react";
import { Button, Input, Link, Card, CardBody, Divider } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, Building2, AlertCircle, ChevronRight } from "lucide-react";

import { loginUsuarioApi } from "@/features/usuario/usuario.service";
import { toastError, toastSuccess } from "@/shared/utils/toast";

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
      setErrorMsg(null);

      const payload = await loginUsuarioApi(email.trim(), password);

      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(payload));
      }

      toastSuccess("Bienvenido al sistema");

      window.location.assign("/dashboard");
    } catch (err: any) {
      const msg = err?.message || "Credenciales inválidas";

      setErrorMsg(msg);

      toastError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = {
    label: "text-neutral-700 dark:text-neutral-300 font-medium text-sm mb-1",

    inputWrapper: `
      bg-white dark:bg-neutral-900
      border border-neutral-200 dark:border-neutral-700
      group-data-[focus=true]:border-orange-600
      group-data-[focus=true]:ring-1 group-data-[focus=true]:ring-orange-600
      transition-all duration-200
      h-12 rounded-lg
      shadow-sm
    `,
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center px-4 py-12 overflow-hidden
    bg-gradient-to-br from-blue-900 via-blue-950 to-black
    dark:from-black dark:via-neutral-950 dark:to-black"
    >
      {/* glow decor */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}

        <div className="mb-10 text-center">
          <div
            className="inline-flex h-16 w-16 items-center justify-center
          rounded-2xl bg-orange-600 shadow-xl shadow-orange-600/30 mb-4"
          >
            <Building2 size={30} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white">Portal Corporativo</h1>

          <p className="text-sm text-neutral-300 mt-2 font-medium">{brandName} • Acceso de Empleados</p>
        </div>

        {/* Card */}

        <Card className="border-none bg-white shadow-2xl dark:bg-neutral-900">
          <CardBody className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Correo Electrónico"
                placeholder="usuario@empresa.com"
                labelPlacement="outside"
                variant="bordered"
                type="email"
                value={email}
                onValueChange={(v) => {
                  setEmail(v);
                  setErrorMsg(null);
                }}
                startContent={<Mail size={18} className="text-neutral-400" />}
                classNames={inputClass}
              />

              <div>
                <Input
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  labelPlacement="outside"
                  variant="bordered"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onValueChange={(v) => {
                    setPassword(v);
                    setErrorMsg(null);
                  }}
                  startContent={<Lock size={18} className="text-neutral-400" />}
                  endContent={
                    <button
                      type="button"
                      className="text-neutral-400 hover:text-orange-600 transition"
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  classNames={inputClass}
                />

                <div className="flex justify-end pt-2">
                  <Link href={forgotHref} className="text-xs font-semibold text-orange-600 hover:underline">
                    ¿Olvidó su contraseña?
                  </Link>
                </div>
              </div>

              {errorMsg && (
                <div
                  className="flex gap-2 items-center
                bg-red-50 text-red-700
                dark:bg-red-950/40 dark:text-red-400
                border border-red-200 dark:border-red-900
                rounded-lg p-3 text-sm"
                >
                  <AlertCircle size={16} />

                  {errorMsg}
                </div>
              )}

              <Button
                type="submit"
                isLoading={isLoading}
                isDisabled={!canSubmit}
                endContent={!isLoading && <ChevronRight size={18} />}
                className="
                h-12
                w-full
                bg-gradient-to-r
                from-orange-600
                to-orange-500
                hover:from-orange-700
                hover:to-orange-600
                text-white
                font-bold
                shadow-lg shadow-orange-600/30
                transition-all
                active:scale-[0.98]
                "
              >
                {isLoading ? "Autenticando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Footer */}

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <Divider className="w-1/3 opacity-40" />

          <p className="text-[11px] uppercase tracking-widest text-neutral-400">Sistema Corporativo Seguro</p>

          <p className="text-[10px] text-neutral-500">
            © {new Date().getFullYear()} {brandName}
          </p>
        </div>
      </div>
    </main>
  );
}
