'use client';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";
import { Facebook, Instagram, LogIn, PackageSearch, UserCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { CartButton } from "./Drawer/drawer"; // ✅ Importar solo el botón

export const Navbar = () => {
  return (
    <HeroUINavbar
      maxWidth="2xl"
      position="sticky"
      className={clsx(
        "fixed top-0 left-0 right-0 z-50",
        "h-[80px]",
        "bg-white/90 dark:bg-slate-950/80 backdrop-blur-xl",
        "border-b border-slate-200/50 dark:border-white/10",
        "shadow-sm"
      )}
    >
      {/* BRAND / LOGO */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center gap-2 transition-transform hover:scale-105" href="/">
            <img
              src="/LogoFamet2.png"
              alt="Grupo Famet S.A.C. Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </NextLink>
        </NavbarBrand>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center gap-2 ml-8">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                className={clsx(
                  "relative px-4 py-2 font-bold text-[15px] uppercase tracking-wide",
                  "text-slate-600 dark:text-slate-300",
                  "transition-all duration-300 ease-in-out",
                  "hover:text-orange-600 dark:hover:text-orange-500",
                  "group"
                )}
              >
                {item.label}
                <span className="absolute inset-x-4 -bottom-1 h-0.5 bg-orange-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* RIGHT ACTIONS (DESKTOP) */}
      <NavbarContent className="hidden lg:flex basis-full" justify="end">
        <div className="flex items-center gap-3">
          {/* Social Icons */}
          <div className="flex items-center gap-1 mr-2 border-r border-slate-200 dark:border-white/10 pr-3">
            <Button
              as={Link}
              isIconOnly
              href={siteConfig.links?.facebook ?? "#"}
              className="bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-500 hover:text-[#1877F2] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 fill-current" strokeWidth={1.5} />
            </Button>
            <Button
              as={Link}
              isIconOnly
              href={siteConfig.links?.instagram ?? "#"}
              className="bg-transparent hover:bg-pink-50 dark:hover:bg-pink-900/20 text-slate-500 hover:text-[#E4405F] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </Button>
          </div>

          {/* Ecommerce Actions */}
          <Button
            as={NextLink}
            href="/mis-pedidos"
            variant="light"
            className="font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
            startContent={<PackageSearch className="h-4 w-4 text-orange-600" />}
          >
            Mis pedidos
          </Button>

          <Button
            as={NextLink}
            href="/iniciar-sesion"
            className={clsx(
              "bg-blue-950 text-white font-bold px-6",
              "shadow-[0_4px_14px_0_rgba(2,6,23,0.3)]",
              "hover:bg-blue-900 hover:scale-[1.02] active:scale-[0.98]",
              "transition-all duration-200"
            )}
            startContent={<LogIn className="h-4 w-4" />}
          >
            Iniciar sesión
          </Button>

          {/* ✅ SOLO EL BOTÓN DEL CARRITO */}
          <div className="flex items-center gap-2 ml-2">
            <CartButton />
            <ThemeSwitch />
          </div>
        </div>
      </NavbarContent>

      {/* MOBILE CONTENT */}
      <NavbarContent className="lg:hidden flex basis-full" justify="end">
        {/* ✅ SOLO EL BOTÓN DEL CARRITO */}
        <CartButton />
        <ThemeSwitch />
        <NavbarMenuToggle className="ml-2 text-slate-700 dark:text-white" />
      </NavbarContent>

      {/* MOBILE DRAWER MENU */}
      <NavbarMenu className="pt-8 bg-white/98 dark:bg-slate-950/95 backdrop-blur-lg">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 px-4">Navegación</p>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <NextLink
                href={item.href}
                className="flex w-full items-center px-4 py-3 text-xl font-black text-blue-950 dark:text-white active:bg-slate-100 dark:active:bg-white/5 rounded-xl transition-colors"
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
          
          <hr className="my-2 border-slate-100 dark:border-white/5" />

          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 px-4">Mi Cuenta</p>
          <div className="grid grid-cols-1 gap-3 px-4">
            <Button
              as={NextLink}
              href="/iniciar-sesion"
              size="lg"
              className="bg-blue-950 text-white font-bold justify-start px-6 rounded-xl"
              startContent={<UserCircle className="h-5 w-5" />}
            >
              Iniciar sesión
            </Button>
            <Button
              as={NextLink}
              href="/mis-pedidos"
              size="lg"
              variant="flat"
              className="bg-slate-100 dark:bg-white/5 font-bold justify-start px-6 rounded-xl text-slate-900 dark:text-white"
              startContent={<PackageSearch className="h-5 w-5 text-orange-600" />}
            >
              Mis pedidos
            </Button>
          </div>

          <div className="mt-auto pb-10 px-4">
             <div className="flex gap-4">
                <Button as={Link} isIconOnly href="#" className="bg-[#1877F2] text-white rounded-full h-12 w-12 shadow-lg"><Facebook /></Button>
                <Button as={Link} isIconOnly href="#" className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full h-12 w-12 shadow-lg"><Instagram /></Button>
             </div>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};