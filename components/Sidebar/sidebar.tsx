"use client";

import React, { useState } from "react";
import {
  Home,
  LayoutGrid,
  CheckSquare,
  Users,
  Rocket,
  Briefcase,
  LineChart,
  Gift,
  Receipt,
  Settings,
  Info,
  LogOut,
  Menu,
  X,
  Plus,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Button, Avatar, Badge, ScrollShadow } from "@heroui/react";
import { ThemeSwitch } from "@/components/theme-switch";
import DatatableEmpleados from "@/components/DatatableEmpleados/datatableEmpleados";
import ClienteRegistro from "@/components/ClienteRegistro/clienteRegistro";

// Configuración de navegación
const menuGroups = {
  overview: [
    { name: "Home", icon: Home, active: true },
    {
      name: "Projects",
      icon: LayoutGrid,
      hasAction: true,
      children: [
        { name: "Active", href: "#" },
        { name: "Archived", href: "#" },
        { name: "Roadmap", href: "#" },
      ],
    },
    {
      name: "Tasks",
      icon: CheckSquare,
      hasAction: true,
      children: [
        { name: "My tasks", href: "#" },
        { name: "Team tasks", href: "#" },
      ],
    },
    { name: "Empleados", icon: Users },
    { name: "Tracker", icon: Rocket, badge: "New" },
  ],
  organization: [
    { name: "Cap Table", icon: Briefcase },
    {
      name: "Analytics",
      icon: LineChart,
      children: [
        { name: "Traffic", href: "#" },
        { name: "Retention", href: "#" },
      ],
    },
    { name: "Perks", icon: Gift, badge: "3" },
    { name: "Expenses", icon: Receipt },
    {
      name: "Settings",
      icon: Settings,
      children: [
        { name: "Profile", href: "#" },
        { name: "Billing", href: "#" },
      ],
    },
  ],
  teams: [
    { name: "HeroUI", initial: "HU" },
    { name: "Tailwind Variants", initial: "TV" },
    { name: "HeroUI Pro", initial: "HP" },
  ]
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Projects: true,
    Tasks: false,
    Analytics: false,
    Settings: false,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Clase común para los items del menú
  const itemClasses = "flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors hover:bg-default-100 dark:hover:bg-white/10 group cursor-pointer";
  const textClasses = "text-blue-900 font-medium text-sm dark:text-white";

  return (
    <>
      {/* --- BOTÓN TOGGLE (MÓVIL) --- */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          isIconOnly 
          variant="flat" 
          onPress={toggleSidebar}
          className="bg-white shadow-md dark:bg-slate-900"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* --- SIDEBAR CONTAINER --- */}
      <aside
        className={cx(
          "fixed top-0 left-0 h-full bg-white border-r border-divider z-40 dark:bg-slate-950 dark:border-white/10",
          "transition-[transform,width] duration-300 ease-in-out",
          "w-72 lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "lg:w-72",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ScrollShadow className={cx("h-full", isCollapsed ? "p-3" : "p-6")}>
          {/* Logo / Header */}
          <div className={cx("flex items-center gap-3", isCollapsed ? "justify-center mb-4" : "justify-between mb-6")}
          >
            <div className={cx("flex items-center gap-3", isCollapsed ? "justify-center" : "")}
            >
              <div className="bg-black p-2 rounded-xl text-white dark:bg-white dark:text-slate-950">
                <Rocket size={20} fill="white" />
              </div>
              {!isCollapsed && (
                <span className="text-xl font-bold text-blue-900 dark:text-white">ACME</span>
              )}
            </div>
            {!isCollapsed && (
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="hidden lg:inline-flex items-center justify-center rounded-md p-2 text-default-400 hover:bg-default-100 hover:text-blue-900 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose size={18} />
              </button>
            )}
          </div>
          {isCollapsed && (
            <div className="mb-6 flex justify-center">
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                className="hidden lg:inline-flex items-center justify-center rounded-md p-2 text-default-400 hover:bg-default-100 hover:text-blue-900 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen size={18} />
              </button>
            </div>
          )}

          {/* User Profile */}
              <div className={cx("flex items-center gap-3 mb-10", isCollapsed ? "justify-center" : "")}
          >
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              className="w-10 h-10"
            />
            {!isCollapsed && (
              <div className="flex flex-col">
                    <span className="text-blue-900 font-bold text-sm dark:text-white">John Doe</span>
                    <span className="text-default-400 text-xs font-medium">Product Designer</span>
              </div>
            )}
          </div>

          {/* Navigation Groups */}
          <nav className="space-y-8">
            {/* Overview Section */}
            <div>
              {!isCollapsed && (
                <p className="text-[10px] uppercase font-bold text-default-400 mb-3 ml-3 tracking-wider dark:text-white/50">Overview</p>
              )}
              <div className="space-y-1">
                {menuGroups.overview.map((item) => (
                  <div key={item.name}>
                    <div
                      onClick={() => setActiveMenu(item.name)}
                      className={cx(
                        itemClasses,
                        activeMenu === item.name ? "bg-default-100" : "",
                        isCollapsed ? "justify-center" : ""
                      )}
                    >
                      <div className={cx("flex items-center gap-3", isCollapsed ? "justify-center" : "")}
                      >
                        <item.icon
                          size={18}
                          className={activeMenu === item.name ? "text-blue-900" : "text-default-400"}
                        />
                        {!isCollapsed && <span className={textClasses}>{item.name}</span>}
                      </div>
                      {!isCollapsed && item.badge && (
                        <Badge
                          content={item.badge}
                          color="default"
                          size="sm"
                          variant="flat"
                          className="text-[10px] font-bold"
                        >
                          {item.badge}
                        </Badge>
                      )}
                        {!isCollapsed && item.hasAction && (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleSubmenu(item.name);
                          }}
                          className="rounded p-1 hover:bg-default-200 dark:hover:bg-white/10"
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          <Plus
                            size={14}
                            className={cx(
                              "transition-transform",
                              openMenus[item.name]
                                ? "rotate-45 text-blue-900 dark:text-white"
                                : "text-default-300"
                            )}
                          />
                        </button>
                      )}
                    </div>
                    {!isCollapsed && item.children && openMenus[item.name] && (
                      <div className="ml-9 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-default-500 hover:bg-default-100 hover:text-blue-900 dark:hover:bg-white/10 dark:hover:text-white"
                          >
                            <ChevronRight size={12} className="text-default-400" />
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Organization Section */}
            <div>
              {!isCollapsed && (
                <p className="text-[10px] uppercase font-bold text-default-400 mb-3 ml-3 tracking-wider dark:text-white/50">Organization</p>
              )}
              <div className="space-y-1">
                {menuGroups.organization.map((item) => (
                  <div key={item.name}>
                    <div className={cx(itemClasses, isCollapsed ? "justify-center" : "")}>
                      <div className={cx("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
                        <item.icon size={18} className="text-default-400" />
                        {!isCollapsed && <span className={textClasses}>{item.name}</span>}
                      </div>
                      {!isCollapsed && item.badge && (
                        <span className="text-[10px] font-bold text-default-400 bg-default-100 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {!isCollapsed && item.children && (
                        <button
                          type="button"
                          onClick={() => toggleSubmenu(item.name)}
                          className="rounded p-1 hover:bg-default-200 dark:hover:bg-white/10"
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          <Plus
                            size={14}
                            className={cx(
                              "transition-transform",
                              openMenus[item.name]
                                ? "rotate-45 text-blue-900 dark:text-white"
                                : "text-default-300"
                            )}
                          />
                        </button>
                      )}
                    </div>
                    {!isCollapsed && item.children && openMenus[item.name] && (
                      <div className="ml-9 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-default-500 hover:bg-default-100 hover:text-blue-900 dark:hover:bg-white/10 dark:hover:text-white"
                          >
                            <ChevronRight size={12} className="text-default-400" />
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Teams Section */}
            <div>
              {!isCollapsed && (
                <p className="text-[10px] uppercase font-bold text-default-400 mb-3 ml-3 tracking-wider dark:text-white/50">Your Teams</p>
              )}
              <div className="space-y-1">
                {menuGroups.teams.map((team) => (
                  <div key={team.name} className={cx(itemClasses, isCollapsed ? "justify-center" : "")}
                  >
                    <div className={cx("flex items-center gap-3", isCollapsed ? "justify-center" : "")}
                    >
                      <div className="w-6 h-6 rounded flex items-center justify-center border border-divider text-[10px] font-bold text-default-500">
                        {team.initial}
                      </div>
                      {!isCollapsed && <span className={textClasses}>{team.name}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer Section */}
          <div className="mt-12 pt-6 border-t border-divider space-y-1">
            <div className={cx(itemClasses, isCollapsed ? "justify-center" : "")}>
              <div className={cx("flex items-center gap-3 text-default-400", isCollapsed ? "justify-center" : "")}>
                <Info size={18} />
                {!isCollapsed && <span className={textClasses}>Help & Information</span>}
              </div>
            </div>
            <div className={cx(itemClasses, isCollapsed ? "justify-center" : "")}>
              <div className={cx("flex items-center gap-3 text-default-400", isCollapsed ? "justify-center" : "")}>
                <LogOut size={18} />
                {!isCollapsed && <span className={textClasses}>Log Out</span>}
              </div>
            </div>
          </div>
        </ScrollShadow>
      </aside>

      {/* --- TOP BAR (PAGE) --- */}
      <div
        className={cx(
          "fixed top-0 right-0 left-0 z-30",
          "h-14 border-b border-divider bg-white/80 backdrop-blur",
          "flex items-center justify-end px-4",
          "dark:bg-slate-950/80 dark:border-white/10",
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        )}
      >
        <ThemeSwitch />
      </div>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <section
        className={cx(
          "pt-16 transition-[margin] duration-300 ease-in-out",
          isCollapsed ? "lg:ml-20" : "lg:ml-72"
        )}
      >
        <div className="p-4 lg:p-6">
          {activeMenu === "Empleados" ? (
            <DatatableEmpleados onAddNew={() => setActiveMenu("ClienteRegistro")} />
          ) : activeMenu === "ClienteRegistro" ? (
            <ClienteRegistro />
          ) : (
            <div className="rounded-xl border border-divider bg-white p-6 dark:bg-slate-900 dark:border-white/10">
              <h1 className="text-2xl font-bold text-blue-900 dark:text-white">{activeMenu}</h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
}