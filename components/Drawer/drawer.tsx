"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

const CART_KEY = "shopping_cart";
const CART_EVENT = "cart:updated";
const DRAWER_OPEN_EVENT = "drawer:open";

type CartItem = {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
};

type CartMap = Record<string, CartItem>;

function safeParseJSON<T>(value: string | null, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function readCart(): CartMap {
  if (typeof window === "undefined") return {};
  return safeParseJSON<CartMap>(localStorage.getItem(CART_KEY), {});
}

function writeCart(cart: CartMap) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_EVENT));
}

function cartToArray(cart: CartMap): CartItem[] {
  return Object.values(cart);
}

function getTotalQty(cart: CartMap): number {
  return Object.values(cart).reduce((acc, it) => acc + (it.cantidad || 0), 0);
}

function setQty(productId: number, qty: number) {
  const cart = readCart();
  const key = String(productId);

  if (qty <= 0) {
    delete cart[key];
    writeCart(cart);
    return;
  }

  if (!cart[key]) return;
  cart[key] = { ...cart[key], cantidad: qty };
  writeCart(cart);
}

function clearCart() {
  writeCart({});
}

// ✅ NUEVO: Exportar botón separado
export function CartButton() {
  const [badgeQty, setBadgeQty] = useState<number>(0);

  useEffect(() => {
    const refresh = () => {
      const cart = readCart();
      setBadgeQty(getTotalQty(cart));
    };

    refresh(); // Carga inicial

    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) refresh();
    };

    const onCartUpdated = () => refresh();

    window.addEventListener("storage", onStorage);
    window.addEventListener(CART_EVENT, onCartUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CART_EVENT, onCartUpdated);
    };
  }, []);

  const openDrawer = () => {
    window.dispatchEvent(new Event(DRAWER_OPEN_EVENT));
  };

  return (
    <Button
      isIconOnly
      variant="light"
      aria-label="Carrito"
      onPress={openDrawer}
      className="relative flex items-center justify-center h-12 w-12"
    >
      <ShoppingCart className="h-6 w-6 text-orange-500" />

      {badgeQty > 0 && (
        <span
          className="
            absolute top-[2px] right-[2px]
            min-w-[18px] h-[18px]
            px-1
            rounded-full
            bg-red-600 text-white
            text-[11px] font-extrabold
            flex items-center justify-center
          "
        >
          {badgeQty > 99 ? "99+" : badgeQty}
        </span>
      )}
    </Button>
  );
}

// ✅ Drawer principal (sin botón)
export default function DrawerComponent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [items, setItems] = useState<CartItem[]>([]);
  const [badgeQty, setBadgeQty] = useState<number>(0);

  const refresh = () => {
    const cart = readCart();
    setItems(cartToArray(cart));
    setBadgeQty(getTotalQty(cart));
  };

  useEffect(() => {
    refresh();

    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) refresh();
    };

    const onCartUpdated = () => refresh();

    const openDrawer = () => {
      onOpen();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(CART_EVENT, onCartUpdated);
    window.addEventListener(DRAWER_OPEN_EVENT, openDrawer);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CART_EVENT, onCartUpdated);
      window.removeEventListener(DRAWER_OPEN_EVENT, openDrawer);
    };
  }, [onOpen]);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.precio * it.cantidad, 0),
    [items]
  );

  const inc = (id: number) => {
    const it = items.find((x) => x.id === id);
    if (!it) return;
    setQty(id, it.cantidad + 1);
  };

  const dec = (id: number) => {
    const it = items.find((x) => x.id === id);
    if (!it) return;
    setQty(id, it.cantidad - 1);
  };

  const onManualQty = (id: number, raw: string) => {
    if (raw.trim() === "") {
      setQty(id, 0);
      return;
    }
    const n = Number(raw);
    if (!Number.isFinite(n)) return;
    setQty(id, Math.max(0, Math.floor(n)));
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="border-b border-black/5 dark:border-white/10">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="font-extrabold text-blue-900 dark:text-white">
                    Tu carrito
                  </p>
                  <p className="text-xs text-slate-500 dark:text-white/60">
                    {badgeQty} {badgeQty === 1 ? "producto" : "productos"}
                  </p>
                </div>

                <Button variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </div>
            </DrawerHeader>

            <DrawerBody className="py-4">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6 text-center">
                  <p className="font-semibold text-slate-800 dark:text-white/80">
                    Tu carrito está vacío
                  </p>
                  <Button
                    className="mt-4 bg-orange-600 text-white"
                    onPress={onClose}
                  >
                    Seguir comprando
                  </Button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((it) => (
                    <li
                      key={it.id}
                      className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 p-4"
                    >
                      <div className="flex gap-4">
                        <div className="h-16 w-16 shrink-0 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 overflow-hidden flex items-center justify-center">
                          <img
                            src={it.imagen}
                            alt={it.nombre}
                            className="h-full w-full object-contain p-2"
                            loading="lazy"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white truncate">
                            {it.nombre}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-white/60">
                            S/ {it.precio.toFixed(2)}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-slate-50 dark:bg-white/5 px-2 py-1">
                              <button
                                type="button"
                                onClick={() => dec(it.id)}
                                className="h-8 w-8 grid place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                                aria-label="Disminuir"
                              >
                                <Minus className="h-4 w-4" />
                              </button>

                              <input
                                type="number"
                                min={0}
                                value={it.cantidad}
                                onChange={(e) => onManualQty(it.id, e.target.value)}
                                className="w-14 text-center bg-transparent outline-none font-bold text-slate-900 dark:text-white"
                              />

                              <button
                                type="button"
                                onClick={() => inc(it.id)}
                                className="h-8 w-8 grid place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                                aria-label="Aumentar"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => setQty(it.id, 0)}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                              Eliminar
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-500 dark:text-white/60">
                            Total
                          </p>
                          <p className="font-extrabold text-slate-900 dark:text-white">
                            S/ {(it.precio * it.cantidad).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </DrawerBody>

            <DrawerFooter className="border-t border-black/5 dark:border-white/10">
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-white/70">
                    Subtotal
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    S/ {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="w-full bg-orange-600 text-white"
                    isDisabled={items.length === 0}
                  >
                    Ir a pagar
                  </Button>

                  <Button
                    variant="light"
                    className="w-full"
                    isDisabled={items.length === 0}
                    onPress={() => clearCart()}
                  >
                    Vaciar
                  </Button>
                </div>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}