"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@heroui/react"; // Usando tus componentes de UI
import { DrawerComponent, Footer, Navbar } from "@/components";
import { getAuthUser } from "@/helpers/authorization";


export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const hideMainChrome = pathname?.startsWith("/dashboard");

  useEffect(() => {
    if (hideMainChrome) {
      const usuario = getAuthUser();

      // 1. Verificación de Sesión
      if (!usuario || !usuario.token) {
        router.push("/loginUsuario");
        return;
      }

      // 2. Verificación de Rol (Bloqueo a Clientes)
      if (usuario.rol?.toLowerCase() === "cliente") {
        setShowError(true);
        setIsAuthorized(false);
        return;
      }

      setIsAuthorized(true);
      setShowError(false);
    } else {
      setIsAuthorized(true);
      setShowError(false);
    }
  }, [hideMainChrome, router]);

  // --- Vista de No Autorizado ---
  if (showError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Acceso Restringido</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Usted no está autorizado para acceder a esta sección. 
          Por favor, comuníquese con el <strong>Administrador de Sistemas</strong> para mayor información.
        </p>
        <Button color="primary" onPress={() => router.push("/")}>
          Volver al Inicio
        </Button>
      </div>
    );
  }

  // Mientras verifica la sesión, mantenemos la pantalla limpia
  if (!isAuthorized && hideMainChrome) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      {!hideMainChrome && <div className="bg-blue-800 px-6 py-3 gap-4" />}
      {!hideMainChrome && <Navbar />}
      {!hideMainChrome && <DrawerComponent />}
      <main className={clsx("w-full flex-grow", hideMainChrome ? "p-0" : "mx-auto max-w-screen-2xl pt-1 px-4 sm:px-6 lg:px-8 2xl:px-12")}>
        {children}
      </main>
      {!hideMainChrome && <Footer />}
    </div>
  );
}