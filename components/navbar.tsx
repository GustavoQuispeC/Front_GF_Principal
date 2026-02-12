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
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import clsx from "clsx";
import { ShoppingCart } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import DrawerComponent from "./Drawer/drawer";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper:
          "bg-default-100/80 dark:bg-default-100/10 backdrop-blur-md border border-black/5 dark:border-white/10",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Buscar..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
   <HeroUINavbar
  maxWidth="2xl"
  position="sticky"
  className={clsx(
    "fixed top-0 left-0 right-0 z-50",

    // ✅ más alto
    "min-h-[80px] py-3",

    "bg-white/80 dark:bg-black/40 backdrop-blur-md",
    "border-b border-black/5 dark:border-white/10",
    "shadow-sm"
  )}
>
      {/* LEFT SIDE */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center gap-2" href="/">
            <img
              src="/LogoFamet2.png"
              alt="Grupo Famet S.A.C. Logo"
              className="h-12 w-auto"
            />
          </NextLink>
        </NavbarBrand>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center gap-7 justify-start ml-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                className={clsx(
                  // base
                  "relative px-1 py-2 font-semibold",
                  "text-[17px] xl:text-[18px]", // ✅ un poquito más grande
                  "text-slate-800 dark:text-white/90",
                  "transition-colors duration-200",
                  // hover brand
                  "hover:text-orange-600",
                  // active (si HeroUI setea data-active)
                  "data-[active=true]:text-blue-900 dark:data-[active=true]:text-white",
                  // underline naranja en hover/active
                  "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-600 after:transition-all after:duration-200",
                  "hover:after:w-full data-[active=true]:after:w-full"
                )}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* RIGHT SIDE DESKTOP */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-3 items-center">
          <DrawerComponent />

          {/* Carrito extra opcional: si quieres solo Drawer, borra esto
          <Button
            isIconOnly
            variant="light"
            aria-label="Carrito"
            as={NextLink}
            href="/cart"
            className={clsx(
              "text-slate-700 dark:text-white/80",
              "hover:text-orange-600"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button> */}

          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      {/* MOBILE RIGHT SIDE */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <DrawerComponent />

        {/* <Button
          isIconOnly
          variant="light"
          aria-label="Carrito"
          as={NextLink}
          href="/cart"
          className="text-slate-700 dark:text-white/80 hover:text-orange-600"
        >
          <ShoppingCart className="h-5 w-5" />
        </Button> */}

        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu className="bg-white/95 dark:bg-black/70 backdrop-blur-md">
        <div className="px-4 pt-2">{searchInput}</div>

        <div className="mx-4 mt-4 flex flex-col gap-1">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                href={item.href}
                className={clsx(
                  "w-full rounded-2xl px-4 py-3",
                  "text-[18px] font-semibold", // ✅ un poquito más grande en mobile
                  "text-slate-900 dark:text-white",
                  "transition",
                  "hover:bg-orange-500/10 hover:text-orange-600",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                )}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
