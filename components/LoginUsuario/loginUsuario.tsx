"use client";

import React, { useMemo, useState } from "react";
import {
  addToast,
  ToastProvider,
  Button,
  Input,
  Link,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginUsuario } from "@/helpers/usuario.helpers";


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

  const canSubmit = useMemo(() => {
    const emailOk = /\S+@\S+\.\S+/.test(email.trim());
    return emailOk && password.trim().length > 0 && !isLoading;
  }, [email, password, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setIsLoading(true);

      const payload = await loginUsuario(email.trim(), password);

      // Guardar respuesta backend
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(payload));
      }

      // Toast éxito (top-right)
      addToast({
        title: "Inicio de sesión exitoso",
        description: "Redirigiendo al dashboard...",
        color: "success",
      });

      // Redirigir
      window.location.assign("/dashboard");
    } catch (err: any) {
      const msg =
        err?.message ||
        "No se pudo iniciar sesión. Verifica tus credenciales e inténtalo nuevamente.";

      // Toast error (top-right)
      addToast({
        title: "Error al iniciar sesión",
        description: msg,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[100svh] w-full bg-[#F4F4F4]">
      {/* Toasts (top-right) */}
      <div className="fixed z-[100]">
        <ToastProvider placement="top-right" toastOffset={60} />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-orange-600/15 blur-2xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-600/10 blur-2xl" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-center px-4 py-10">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <section className="hidden lg:block">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 rounded-full border border-default-200 bg-white px-3 py-1 text-xs font-semibold text-default-600">
                <span className="h-2 w-2 rounded-full bg-orange-600" />
                Acceso al sistema
              </div>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#11181C]">
                Bienvenido a {brandName}
              </h1>

              <p className="mt-3 text-base leading-relaxed text-default-600">
                Ingresa con tu correo y contraseña para continuar.
              </p>
            </div>
          </section>

          <section className="mx-auto w-full max-w-md">
            <Card
              className="border border-default-200 shadow-md"
              classNames={{ base: "overflow-visible" }}
            >
              <div className="h-1 w-full rounded-t-2xl bg-orange-600" />

              <CardHeader className="flex flex-col items-start gap-1 px-6 pt-6">
                <h2 className="text-2xl font-bold text-[#11181C]">Iniciar sesión</h2>
                <p className="text-sm text-default-500">
                  Ingresa tus credenciales para acceder.
                </p>
              </CardHeader>

              <CardBody className="px-6 pb-6 pt-2">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <Input
                    isRequired
                    value={email}
                    onValueChange={setEmail}
                    label="Correo electrónico"
                    labelPlacement="outside"
                    placeholder="ejemplo@correo.com"
                    variant="bordered"
                    type="email"
                    autoComplete="email"
                    startContent={<Mail size={18} className="text-default-400" />}
                    classNames={{
                      inputWrapper: "h-12 group-data-[focus=true]:border-blue-600",
                      label: "text-[#11181C] font-semibold",
                    }}
                  />

                  <Input
                    isRequired
                    value={password}
                    onValueChange={setPassword}
                    label="Contraseña"
                    labelPlacement="outside"
                    placeholder="••••••••"
                    variant="bordered"
                    type={isVisible ? "text" : "password"}
                    autoComplete="current-password"
                    startContent={<Lock size={18} className="text-default-400" />}
                    classNames={{
                      inputWrapper: "h-12 group-data-[focus=true]:border-blue-600",
                      label: "text-[#11181C] font-semibold",
                    }}
                    endContent={
                      <button
                        type="button"
                        onClick={() => setIsVisible((v) => !v)}
                        className="focus:outline-none"
                        aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {isVisible ? (
                          <EyeOff size={20} className="text-default-400" />
                        ) : (
                          <Eye size={20} className="text-default-400" />
                        )}
                      </button>
                    }
                  />

                  <div className="flex items-center justify-end">
                    <Link
                      href={forgotHref}
                      size="sm"
                      className="text-blue-600 text-xs font-semibold hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    isDisabled={!canSubmit}
                    isLoading={isLoading}
                    className="h-12 w-full bg-orange-600 text-white font-bold shadow-md hover:opacity-90"
                  >
                    INGRESAR
                  </Button>
                </form>
              </CardBody>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
