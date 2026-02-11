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

type CartItem = {
  id: number;
  title: string;
  img: string;
  price: number;
  qty: number;
};

const CART_ITEMS: CartItem[] = [
  {
    id: 1,
    title: "Sunscreen",
    img: "https://readymadeui.com/images/sunscreen-img-1.webp",
    price: 18.5,
    qty: 1,
  },
  {
    id: 2,
    title: "Aloederm Cream",
    img: "https://readymadeui.com/images/aloederm-cream-img-1.webp",
    price: 18,
    qty: 1,
  },
  {
    id: 3,
    title: "Face Body Cream",
    img: "https://readymadeui.com/images/face-body-cream-img-1.webp",
    price: 15.5,
    qty: 1,
  },
];

export default function DrawerComponent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // ✅ Drawer responsive: móvil full, desktop 4xl
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // (demo state) reemplaza por tu store real
  const [items, setItems] = useState<CartItem[]>(CART_ITEMS);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.qty, 0),
    [items]
  );
  const shipping = subtotal > 0 ? 4 : 0;
  const tax = subtotal > 0 ? 4 : 0;
  const total = subtotal + shipping + tax;

  const inc = (id: number) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );
  const dec = (id: number) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    );
  const remove = (id: number) => setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        aria-label="Carrito"
        onPress={onOpen}
        className="bg-transparent border-none shadow-none text-default-500 hover:text-orange-600"
      >
        <ShoppingCart className="h-6 w-6 text-orange-500" />
      </Button>

      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={isMobile ? "full" : "4xl"}
        classNames={{
          // look premium
          base: "bg-white dark:bg-slate-950",
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              {/* Header fijo */}
              <DrawerHeader className="sticky top-0 z-10 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-black/5 dark:border-white/10">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-blue-900 dark:text-white font-extrabold text-lg">
                      Tu carrito
                    </p>
                    <p className="text-xs text-slate-500 dark:text-white/60">
                      {items.length} {items.length === 1 ? "producto" : "productos"}
                    </p>
                  </div>

                  <Button variant="light" onPress={onClose} className="text-slate-600 dark:text-white/70">
                    Cerrar
                  </Button>
                </div>
              </DrawerHeader>

              <DrawerBody className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* LISTA */}
                  <div className="lg:col-span-8 p-4 sm:p-6">
                    {items.length === 0 ? (
                      <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-8 text-center">
                        <p className="text-slate-700 dark:text-white/80 font-semibold">
                          Tu carrito está vacío
                        </p>
                        <p className="mt-2 text-sm text-slate-500 dark:text-white/60">
                          Agrega productos para continuar.
                        </p>
                        <Button
                          className="mt-5 bg-orange-600 text-white hover:bg-orange-700"
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
                            className="rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 p-4"
                          >
                            <div className="flex items-center gap-4">
                              {/* ✅ imagen más pequeña */}
                              <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 overflow-hidden flex items-center justify-center">
                                <img
                                  src={it.img}
                                  alt={it.title}
                                  className="h-full w-full object-contain p-2"
                                  loading="lazy"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-slate-900 dark:text-white truncate">
                                  {it.title}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-white/60">
                                  S/ {it.price.toFixed(2)}
                                </p>

                                {/* acciones */}
                                <div className="mt-3 flex flex-wrap items-center gap-3">
                                  <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-slate-50 dark:bg-white/5 px-2 py-1">
                                    <button
                                      type="button"
                                      onClick={() => dec(it.id)}
                                      className="h-8 w-8 grid place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                                      aria-label="Disminuir"
                                    >
                                      <Minus className="h-4 w-4 text-slate-700 dark:text-white/80" />
                                    </button>

                                    <span className="px-2 text-sm font-bold text-slate-900 dark:text-white">
                                      {it.qty}
                                    </span>

                                    <button
                                      type="button"
                                      onClick={() => inc(it.id)}
                                      className="h-8 w-8 grid place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                                      aria-label="Aumentar"
                                    >
                                      <Plus className="h-4 w-4 text-slate-700 dark:text-white/80" />
                                    </button>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => remove(it.id)}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Quitar
                                  </button>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-slate-500 dark:text-white/60">Total</p>
                                <p className="font-extrabold text-slate-900 dark:text-white">
                                  S/ {(it.price * it.qty).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* RESUMEN (móvil abajo, desktop sticky a la derecha) */}
                  <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 sm:p-6 lg:sticky lg:top-0 lg:h-[calc(100vh-64px)]">
                    <h3 className="text-base font-extrabold text-blue-900 dark:text-white">
                      Resumen de compra
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm">
                      <Row label="Subtotal" value={`S/ ${subtotal.toFixed(2)}`} />
                      <Row label="Envío" value={`S/ ${shipping.toFixed(2)}`} />
                      <Row label="Impuestos" value={`S/ ${tax.toFixed(2)}`} />
                      <div className="my-3 h-px bg-black/10 dark:bg-white/10" />
                      <Row
                        label={<span className="font-extrabold">Total</span>}
                        value={<span className="font-extrabold">S/ {total.toFixed(2)}</span>}
                      />
                    </ul>

                    <Button
                      className="mt-5 w-full rounded-full bg-orange-600 text-white hover:bg-orange-700"
                      isDisabled={items.length === 0}
                    >
                      Ir a pagar
                    </Button>

                    <Button
                      variant="light"
                      className="mt-2 w-full rounded-full text-slate-700 dark:text-white/80 hover:text-orange-600"
                      onPress={onClose}
                    >
                      Seguir comprando
                    </Button>

                    <p className="mt-4 text-xs text-slate-500 dark:text-white/60">
                      Pagos seguros y atención rápida por WhatsApp.
                    </p>
                  </div>
                </div>
              </DrawerBody>

              {/* Footer fijo (opcional, minimal) */}
              <DrawerFooter className="sticky bottom-0 z-10 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-t border-black/5 dark:border-white/10">
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm text-slate-600 dark:text-white/70">
                    {items.length > 0 ? "Listo para finalizar tu compra" : "Agrega productos para continuar"}
                  </p>

                  <Button
                    className="rounded-full bg-orange-600 text-white hover:bg-orange-700"
                    isDisabled={items.length === 0}
                  >
                    Checkout
                  </Button>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

function Row({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <li className="flex items-center justify-between text-slate-600 dark:text-white/70">
      <span>{label}</span>
      <span className="text-slate-900 dark:text-white">{value}</span>
    </li>
  );
}
