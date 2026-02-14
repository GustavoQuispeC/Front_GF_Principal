"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  useDisclosure,
  Divider, // ✅ Añadido
} from "@heroui/react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";
import { Facebook, Instagram, LogIn, PackageSearch, UserCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { CartButton } from "./Drawer/drawer";
import { LoginModal } from "./LoginModal/loginModal";


export const Navbar = () => {
  // ✅ Control del Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
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
                alt="Logo"
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
                    "relative px-4 py-2 font-bold text-[15px] uppercase tracking-wide text-slate-600 dark:text-slate-300 transition-all hover:text-orange-600 group"
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
              <Button as={Link} isIconOnly href="#" className="bg-transparent text-slate-500 hover:text-[#1877F2]"><Facebook size={20} /></Button>
              <Button as={Link} isIconOnly href="#" className="bg-transparent text-slate-500 hover:text-[#E4405F]"><Instagram size={20} /></Button>
            </div>

            <Button
              as={NextLink}
              href="/mis-pedidos"
              variant="light"
              className="font-bold text-slate-700 dark:text-slate-200"
              startContent={<PackageSearch className="h-4 w-4 text-orange-600" />}
            >
              Mis pedidos
            </Button>

            {/* ✅ BOTÓN QUE ABRE EL MODAL */}
            <Button
              onPress={onOpen}
              className={clsx(
                "bg-blue-950 text-white font-bold px-6 shadow-lg",
                "hover:bg-blue-900 hover:scale-[1.02] transition-all"
              )}
              startContent={<LogIn className="h-4 w-4" />}
            >
              Iniciar sesión
            </Button>

            <div className="flex items-center gap-2 ml-2">
              <CartButton />
              <ThemeSwitch />
            </div>
          </div>
        </NavbarContent>

        {/* MOBILE CONTENT */}
        <NavbarContent className="lg:hidden flex basis-full" justify="end">
          <CartButton />
          <ThemeSwitch />
          <NavbarMenuToggle className="ml-2" />
        </NavbarContent>

        {/* MOBILE MENU */}
        <NavbarMenu>
          <div className="flex flex-col gap-4 pt-4">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={index}>
                <NextLink href={item.href} className="text-xl font-black text-blue-950 dark:text-white">{item.label}</NextLink>
              </NavbarMenuItem>
            ))}
            <Divider />
            {/* ✅ BOTÓN LOGIN MÓVIL (TAMBIÉN ABRE EL MODAL) */}
            <Button
              onPress={onOpen}
              size="lg"
              className="bg-blue-950 text-white font-bold justify-start rounded-xl"
              startContent={<UserCircle className="h-5 w-5" />}
            >
              Iniciar sesión
            </Button>
          </div>
        </NavbarMenu>
      </HeroUINavbar>

      {/* ✅ COMPONENTE MODAL AL FINAL */}
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};