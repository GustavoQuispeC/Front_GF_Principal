"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DrawerComponent } from "@/components";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideMainChrome = pathname?.startsWith("/dashboard");

  return (
    <div className="relative flex min-h-screen flex-col">
      {!hideMainChrome && <div className="bg-blue-800 px-6 py-3 gap-4" />}
      {!hideMainChrome && <Navbar />}
      {!hideMainChrome && <DrawerComponent />}
      <main
        className={clsx(
          "w-full flex-grow",
          hideMainChrome
            ? "p-0"
            : "mx-auto max-w-screen-2xl pt-1 px-4 sm:px-6 lg:px-8 2xl:px-12",
        )}
      >
        {children}
      </main>
      {!hideMainChrome && <Footer />}
    </div>
  );
}
