"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Home,
  Users,
  Rocket,
  Info,
  LogOut,
  Menu,
  X,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  UserCog,
  LayoutDashboard,
  ListFilter,
  UserPlus,
  HelpCircle,
} from "lucide-react";
import {
  Avatar,
  ScrollShadow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Chip,
} from "@heroui/react";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { usePathname, useRouter } from "next/navigation";
import { IUserData } from "@/types/Auth/IAuth";
import { getAuthUser, logout } from "@/shared/auth/auth.service";

interface SidebarProps {
  children?: React.ReactNode;
}

type MenuChild = {
  name: string;
  href: string;
  icon: React.ElementType;
};

type MenuItem = {
  name: string;
  icon: React.ElementType;
  href?: string;
  badge?: string;
  hasAction?: boolean;
  children?: MenuChild[];
};

const menuGroups = {
  overview: [
    {
      name: "Inicio",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "Empleados",
      icon: Users,
      hasAction: true,
      children: [
        { name: "Listado", href: "/dashboard/empleados/listar", icon: ListFilter },
        { name: "Registrar", href: "/dashboard/empleados/nuevo", icon: UserPlus },
      ],
    },
    {
      name: "Usuarios",
      icon: UserCog,
      hasAction: true,
      children: [
        { name: "Listado", href: "/dashboard/usuarios/listar", icon: ListFilter },
        { name: "Registrar", href: "/dashboard/usuarios/nuevo", icon: UserPlus },
      ],
    },
  ] as MenuItem[],
  teams: [
    { name: "HeroUI", initial: "HU" },
    { name: "Tailwind Variants", initial: "TV" },
    { name: "HeroUI Pro", initial: "HP" },
  ],
};

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export default function Sidebar({ children }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Empleados: true,
    Usuarios: false,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [usuario, setUsuario] = useState<IUserData | null>(null);

  const isRouteActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const activeParents = useMemo(() => {
    const parents = new Set<string>();
    menuGroups.overview.forEach((item) => {
      if (item.children?.some((child) => isRouteActive(child.href))) {
        parents.add(item.name);
      }
    });
    return parents;
  }, [pathname]);

  useEffect(() => {
    const data = getAuthUser();
    setUsuario(data);
  }, []);

  useEffect(() => {
    if (activeParents.size === 0) return;
    setOpenMenus((prev) => {
      const next = { ...prev };
      activeParents.forEach((name) => {
        next[name] = true;
      });
      return next;
    });
  }, [activeParents]);

  const handleConfirmLogout = () => logout();

  // ── Tooltip wrapper para modo colapsado ──────────────────────────────────────
  const NavTooltip = ({ label, children }: { label: string; children: React.ReactNode }) =>
    isCollapsed ? (
      <Tooltip
        content={label}
        placement="right"
        classNames={{
          content: "bg-blue-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg",
        }}
      >
        <span className="w-full">{children}</span>
      </Tooltip>
    ) : (
      <>{children}</>
    );

  // ── Item de menú principal ────────────────────────────────────────────────────
  const NavItem = ({ item }: { item: MenuItem }) => {
    const isActive = (item.href && isRouteActive(item.href)) || activeParents.has(item.name);
    const isMenuOpen = openMenus[item.name];

    return (
      <div>
        <NavTooltip label={item.name}>
          <div
            onClick={() => {
              if (item.href) {
                router.push(item.href);
                setIsOpenSidebar(false);
              } else if (item.hasAction && !isCollapsed) {
                setOpenMenus((prev) => ({
                  ...prev,
                  [item.name]: !prev[item.name],
                }));
              }
            }}
            className={cx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer relative",
              "transition-all duration-150 group",
              isCollapsed ? "justify-center" : "justify-between",
              isActive ? "bg-blue-50 dark:bg-blue-950/50" : "hover:bg-default-100 dark:hover:bg-white/8",
            )}
          >
            {/* Indicador lateral naranja para ítem activo */}
            {isActive && !isCollapsed && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-orange-400 rounded-r-full" />
            )}

            <div className="flex items-center gap-3">
              <item.icon
                size={18}
                className={cx(
                  "shrink-0 transition-colors",
                  isActive
                    ? "text-blue-900 dark:text-blue-400"
                    : "text-default-400 group-hover:text-blue-900 dark:group-hover:text-blue-400",
                )}
              />
              {!isCollapsed && (
                <span
                  className={cx(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-blue-900 dark:text-blue-300" : "text-blue-900 dark:text-slate-200",
                  )}
                >
                  {item.name}
                </span>
              )}
            </div>

            {!isCollapsed && item.hasAction && (
              <ChevronDown
                size={14}
                className={cx(
                  "shrink-0 transition-transform duration-200",
                  isMenuOpen ? "rotate-180 text-blue-900" : "text-default-400",
                )}
              />
            )}
          </div>
        </NavTooltip>

        {/* Submenú animado */}
        {!isCollapsed && item.children && (
          <div
            className={cx(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isMenuOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0",
            )}
          >
            <div className="ml-4 pl-3 border-l-2 border-blue-100 dark:border-blue-900/50 space-y-0.5">
              {item.children.map((child) => {
                const childActive = isRouteActive(child.href);
                return (
                  <button
                    key={child.name}
                    type="button"
                    onClick={() => {
                      router.push(child.href);
                      setIsOpenSidebar(false);
                    }}
                    className={cx(
                      "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium",
                      "transition-all duration-150",
                      childActive
                        ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                        : "text-slate-500 hover:bg-slate-50 hover:text-blue-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-blue-300",
                    )}
                  >
                    <child.icon size={13} className={childActive ? "text-orange-500" : "text-slate-400"} />
                    {child.name}
                    {childActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* ── Botón hamburguesa — fijo a la IZQUIERDA, solo cuando sidebar cerrado ── */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        {!isOpenSidebar && (
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            onPress={() => setIsOpenSidebar(true)}
            className="bg-white/90 backdrop-blur shadow-md border border-slate-200 dark:bg-slate-900/90 dark:border-slate-700"
          >
            <Menu size={18} />
          </Button>
        )}
      </div>

      {/* ── Sidebar ── */}
      <aside
        className={cx(
          "fixed top-0 left-0 h-full z-40 flex flex-col",
          "bg-white border-r border-divider",
          "dark:bg-slate-950 dark:border-slate-800/60",
          "transition-[transform,width] duration-300 ease-in-out",
          "w-64 lg:translate-x-0",
          isCollapsed ? "lg:w-[72px]" : "lg:w-64",
          isOpenSidebar ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <ScrollShadow className="flex flex-col h-full overflow-y-auto">
          {/* ── Logo / Header ── */}
          <div
            className={cx(
              "flex items-center border-b border-divider dark:border-slate-800/60 shrink-0 h-14",
              isCollapsed ? "justify-center px-3" : "justify-between px-4",
            )}
          >
            {!isCollapsed && (
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl bg-blue-900 flex items-center justify-center shadow-md">
                    <Rocket size={16} className="text-white" fill="white" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-orange-400 border-2 border-white dark:border-slate-950" />
                </div>
                <div>
                  <span className="text-sm font-bold text-blue-900 dark:text-white tracking-tight">Grupo Famet</span>
                  <p className="text-[10px] text-default-400 -mt-0.5">Sistema de Gestión</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1">
              {/* Botón X — solo en móvil, dentro del sidebar a la derecha */}
              <button
                type="button"
                onClick={() => setIsOpenSidebar(false)}
                className="lg:hidden p-1.5 rounded-lg text-default-400 hover:bg-default-100 transition-colors"
                aria-label="Cerrar sidebar"
              >
                <X size={18} />
              </button>

              {/* Botones colapsar/expandir — solo en desktop */}
              {isCollapsed ? (
                <Tooltip
                  content="Expandir menú"
                  placement="right"
                  classNames={{
                    content: "bg-blue-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsCollapsed(false)}
                    className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl bg-blue-900 hover:bg-blue-800 transition-colors shadow-md"
                    aria-label="Expandir sidebar"
                  >
                    <PanelLeftOpen size={16} className="text-white" />
                  </button>
                </Tooltip>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsCollapsed(true)}
                  className="hidden lg:flex p-1.5 rounded-lg text-default-400 hover:bg-default-100 hover:text-blue-900 dark:hover:bg-white/8 transition-colors"
                  aria-label="Colapsar sidebar"
                >
                  <PanelLeftClose size={16} />
                </button>
              )}
            </div>
          </div>

          {/* ── Perfil de usuario ── */}
          <div
            className={cx(
              "mx-3 my-3 rounded-xl p-3 shrink-0",
              "bg-blue-50/60 dark:bg-blue-950/30",
              "border border-blue-100/80 dark:border-blue-900/30",
              isCollapsed ? "flex justify-center" : "flex items-center gap-3",
            )}
          >
            <div className="relative shrink-0">
              <Avatar
                src={usuario?.fotoUrl || undefined}
                className="w-9 h-9 ring-2 ring-blue-200 dark:ring-blue-800"
                fallback={
                  <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center text-white text-sm font-bold">
                    {usuario?.nombreCompleto?.charAt(0) ?? "U"}
                  </div>
                }
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-950" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-blue-900 dark:text-white truncate">
                  {usuario?.nombreCompleto ?? "Usuario"}
                </p>
                <p className="text-[10px] text-default-400 truncate">{usuario?.email ?? "Sin correo"}</p>
                {usuario?.rol && (
                  <Chip
                    size="sm"
                    variant="flat"
                    className="mt-1 h-4 text-[10px] bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400"
                  >
                    {usuario.rol}
                  </Chip>
                )}
              </div>
            )}
          </div>

          {/* ── Navegación principal ── */}
          <nav className="flex-1 px-3 pb-3 space-y-1">
            {!isCollapsed && (
              <p className="text-[10px] font-bold text-default-400 uppercase tracking-widest mb-2 px-1 dark:text-slate-600">
                Dashboard
              </p>
            )}
            {menuGroups.overview.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}

            {/* ── Sección Teams ── */}
            {!isCollapsed && (
              <p className="text-[10px] font-bold text-default-400 uppercase tracking-widest mt-6 mb-2 px-1 dark:text-slate-600">
                Your Teams
              </p>
            )}
            {isCollapsed && <div className="my-3 border-t border-divider dark:border-slate-800/60" />}
            <div className="space-y-1">
              {menuGroups.teams.map((team) => (
                <NavTooltip key={team.name} label={team.name}>
                  <div
                    className={cx(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer",
                      "hover:bg-default-100 dark:hover:bg-white/8 transition-colors group",
                      isCollapsed ? "justify-center" : "",
                    )}
                  >
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center border border-divider text-[10px] font-bold text-default-500 bg-default-50 shrink-0">
                      {team.initial}
                    </div>
                    {!isCollapsed && (
                      <span className="text-sm font-medium text-blue-900 dark:text-slate-200">{team.name}</span>
                    )}
                  </div>
                </NavTooltip>
              ))}
            </div>
          </nav>

          {/* ── Footer ── */}
          <div className="px-3 pb-4 pt-3 border-t border-divider dark:border-slate-800/60 space-y-1 shrink-0">
            <NavTooltip label="Ayuda e Información">
              <div
                className={cx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer",
                  "hover:bg-default-100 dark:hover:bg-white/8 transition-colors group",
                  isCollapsed ? "justify-center" : "",
                )}
              >
                <Info size={17} className="shrink-0 text-default-400 group-hover:text-blue-900 transition-colors" />
                {!isCollapsed && (
                  <span className="text-sm font-medium text-blue-900 dark:text-slate-300">Ayuda e Información</span>
                )}
              </div>
            </NavTooltip>

            <NavTooltip label="Cerrar Sesión">
              <div
                onClick={onOpen}
                className={cx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer",
                  "hover:bg-red-50 dark:hover:bg-red-500/8 transition-colors group",
                  isCollapsed ? "justify-center" : "",
                )}
              >
                <LogOut size={17} className="shrink-0 text-default-400 group-hover:text-red-500 transition-colors" />
                {!isCollapsed && (
                  <span className="text-sm font-medium text-blue-900 group-hover:text-red-500 dark:text-slate-300 transition-colors">
                    Cerrar Sesión
                  </span>
                )}
              </div>
            </NavTooltip>

            {/* Theme switch */}
            {!isCollapsed ? (
              <div className="flex items-center justify-between px-3 py-2 mt-1">
                <span className="text-xs text-default-400">Tema</span>
                <ThemeSwitch />
              </div>
            ) : (
              <NavTooltip label="Cambiar tema">
                <div className="flex justify-center py-1">
                  <ThemeSwitch />
                </div>
              </NavTooltip>
            )}
          </div>
        </ScrollShadow>
      </aside>

      {/* ── Modal cerrar sesión ── */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2 text-blue-900 dark:text-white">
                <div className="p-2 bg-red-50 rounded-lg dark:bg-red-500/10">
                  <LogOut size={16} className="text-red-500" />
                </div>
                Cerrar Sesión
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-default-500">
                  ¿Estás seguro de que deseas cerrar sesión? Tu sesión actual se cerrará.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button size="sm" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button size="sm" color="danger" onPress={handleConfirmLogout}>
                  Cerrar Sesión
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ── Overlay móvil ── */}
      {isOpenSidebar && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpenSidebar(false)}
        />
      )}

      {/* ── Top bar ── */}
      <div
        className={cx(
          "fixed top-0 right-0 left-0 z-30 h-14",
          "border-b border-divider bg-white/80 backdrop-blur-md",
          "flex items-center justify-end px-4 gap-3",
          "dark:bg-slate-950/80 dark:border-slate-800/60",
          "transition-[padding] duration-300 ease-in-out",
          isCollapsed ? "lg:pl-[88px]" : "lg:pl-[272px]",
        )}
      >
        <ThemeSwitch />
      </div>

      {/* ── Contenido principal ── */}
      <section
        className={cx(
          "pt-14 min-h-screen transition-[margin] duration-300 ease-in-out",
          "bg-slate-50 dark:bg-slate-900",
          isCollapsed ? "lg:ml-[72px]" : "lg:ml-64",
        )}
      >
        <div className="p-4 lg:p-6">{children}</div>
      </section>
    </>
  );
}
