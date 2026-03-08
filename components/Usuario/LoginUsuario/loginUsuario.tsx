"use client";

import React, { useMemo, useState } from "react";
import { Button, Input, Link, Card, CardBody, Divider } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, Building2, AlertCircle, ChevronRight } from "lucide-react";
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
      setErrorMsg(null);
      const payload = await loginUsuario(email.trim(), password);
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(payload));
      }
      toastSuccess("Bienvenido al sistema");
      window.location.assign("/dashboard");
    } catch (err: any) {
      const msg = err?.message || "Credenciales inválidas. Intente de nuevo.";
      setErrorMsg(msg);
      toastError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Estilos refinados para Inputs corporativos
  const inputClass = {
    label: "text-neutral-700 dark:text-neutral-300 font-medium text-sm mb-1",
    inputWrapper: [
      "bg-white dark:bg-neutral-900",
      "border-neutral-200 dark:border-neutral-800",
      "group-data-[focus=true]:border-orange-600",
      "group-data-[focus=true]:ring-1 group-data-[focus=true]:ring-orange-600",
      "transition-all duration-200 shadow-sm",
      "h-12 rounded-lg"
    ].join(" "),
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f9fa] dark:bg-neutral-950 px-4 py-12">
      {/* Background Decor (Subtle Enterprise Feel) */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-orange-200 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-blue-100 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Brand Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600 mb-4 shadow-xl shadow-orange-600/20">
            <Building2 size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Portal Corporativo
          </h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400 font-medium">
            {brandName} • Gestión Interna
          </p>
        </div>

        <Card className="border-none bg-white/80 backdrop-blur-md shadow-2xl shadow-neutral-200/50 dark:bg-neutral-900/80 dark:shadow-none">
          <CardBody className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              
              <Input
                label="Correo Electrónico"
                placeholder="ejemplo@grupofamet.com"
                labelPlacement="outside"
                variant="bordered"
                type="email"
                value={email}
                onValueChange={(v) => { setEmail(v); setErrorMsg(null); }}
                startContent={<Mail size={18} className="text-neutral-400" />}
                classNames={inputClass}
              />

              <div className="space-y-1">
                <Input
                  label="Contraseña"
                  placeholder="Ingrese su clave"
                  labelPlacement="outside"
                  variant="bordered"
                  value={password}
                  onValueChange={(v) => { setPassword(v); setErrorMsg(null); }}
                  type={isVisible ? "text" : "password"}
                  startContent={<Lock size={18} className="text-neutral-400" />}
                  endContent={
                    <button 
                      className="focus:outline-none text-neutral-400 hover:text-orange-600 transition" 
                      type="button" 
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  classNames={inputClass}
                />
                <div className="flex justify-end pt-1">
                  <Link
                    href={forgotHref}
                    className="text-xs font-semibold text-orange-700 hover:underline dark:text-orange-500"
                  >
                    ¿Olvidó su contraseña?
                  </Link>
                </div>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-100 dark:border-red-900/50">
                  <AlertCircle size={16} className="shrink-0" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <Button
                type="submit"
                isLoading={isLoading}
                isDisabled={!canSubmit}
                endContent={!isLoading && <ChevronRight size={18} />}
                className="h-12 w-full bg-orange-600 text-[15px] font-bold text-white shadow-lg shadow-orange-600/30 transition-all hover:bg-orange-700 active:scale-[0.98]"
              >
                {isLoading ? "Autenticando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <Divider className="w-1/4 opacity-50" />
          <div className="flex flex-col items-center gap-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-600">
              Sistema de Seguridad Controlado
            </p>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
              © {new Date().getFullYear()} {brandName}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}