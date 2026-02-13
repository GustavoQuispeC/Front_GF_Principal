"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
} from "@heroui/react";

import { ShoppingCart, CheckCircle, Plus, Minus, ArrowRight } from "lucide-react";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  badge?: string;
}

/* ================== LOCAL STORAGE CONFIG ================== */

const CART_KEY = "shopping_cart";
const CART_EVENT = "cart:updated";

type CartItem = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
};

function safeParseJSON<T>(value: string | null, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function readCart(): Record<string, CartItem> {
  if (typeof window === "undefined") return {};
  return safeParseJSON(localStorage.getItem(CART_KEY), {});
}

/* ✅ FIX PRINCIPAL: dispara evento siempre */
function writeCart(cart: Record<string, CartItem>) {
  if (typeof window === "undefined") return;

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  // 🔥 Notifica al Drawer y Badge
  window.dispatchEvent(new Event(CART_EVENT));
}

function upsertCartItem(producto: Producto, cantidad: number) {
  const cart = readCart();
  const key = String(producto.id);

  cart[key] = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen,
    cantidad,
  };

  writeCart(cart);
}

function removeCartItem(productId: number) {
  const cart = readCart();
  const key = String(productId);

  if (cart[key]) {
    delete cart[key];
    writeCart(cart);
  }
}

function getCartItemQuantity(productId: number): number | null {
  const cart = readCart();
  return cart[String(productId)]?.cantidad ?? null;
}

/* ========================================================= */

export default function Productos() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  const productosData: Producto[] = [
    {
      id: 1,
      nombre: "Sika Impermur",
      precio: 32,
      descripcion: "Impermeabilizante de alta resistencia para techos y muros.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FSIKA%2FSIKA%20IMPERMUR.png?alt=media&token=5bf61563-0b54-4c38-833c-6e8fcb297e66",
      badge: "Nuevo",
    },
    {
      id: 2,
      nombre: "Cemento Extraforte",
      precio: 34,
      descripcion: "Cemento de alta durabilidad ideal para estructuras.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FPACASMAYO%20EXTRAFORTE.png?alt=media&token=4924ff61-2360-40cf-b832-630912ce01ec",
      badge: "Oferta",
    },
    {
      id: 3,
      nombre: "Cemento Mochica",
      precio: 33.2,
      descripcion: "Excelente rendimiento y resistencia estructural.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FCEMENTO%20MOCHICA.png?alt=media&token=1344c797-d93a-4ecb-b27f-1705cfedb7e7",
    },
    {
      id: 4,
      nombre: "Cemento Tipo 1",
      precio: 37.5,
      descripcion: "Ideal para construcciones generales.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FCEMENTO%20TIPO%201.png?alt=media&token=51630310-fee3-44bb-9d20-f5111601cef6",
    },
    {
      id: 5,
      nombre: "Tubo cuadrado 2.0*2.0mm*6mt",
      precio: 45.0,
      descripcion: "Perfil metálico resistente para estructuras.",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHE10nnA-l3uYYGnHWvdOEXiEnOh-hPZFwEQ&s",
    },
    {
      id: 6,
      nombre: "Calamina roja 0.3x0.8x3.60",
      precio: 25.0,
      descripcion: "Cobertura resistente para techos.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCALAMINA%2FCALAMINA%20ROJA.png?alt=media&token=673a3e65-be58-4b81-b013-e9235e8b4bc6",
    },
    {
      id: 7,
      nombre: "Teja Andina",
      precio: 44.0,
      descripcion: "Diseño moderno y alta resistencia climática.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FTEJA%2FTEJA%20ANDINA.png?alt=media&token=9dd5edfe-554f-4ef2-8c08-e7ed839ff796",
    },
    {
      id: 8,
      nombre: "Fierro de 1/2",
      precio: 28.0,
      descripcion: "Barra de acero para refuerzo estructural.",
      imagen:
        "https://media.falabella.com/sodimacPE/211230_01/w=800,h=800,fit=pad",
    },
  ];
  /* ✅ Agregar al carrito */
  const handleAgregar = (producto: Producto) => {
    // guarda por defecto qty=1
    upsertCartItem(producto, 1);

    // abre modal
    setProductoSeleccionado(producto);
    onOpen();
  };

  return (
    <>
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header mejorado */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Productos destacados
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-900 dark:text-white mb-4">
              Catálogo de Productos
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Encuentra los mejores materiales de construcción con precios competitivos
            </p>
          </div>

          {/* Grid de productos mejorado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosData.map((producto) => (
              <div
                key={producto.id}
                className="
                  group
                  bg-white dark:bg-gray-800
                  rounded-2xl shadow-sm hover:shadow-2xl
                  border border-gray-200 dark:border-gray-700
                  overflow-hidden
                  flex flex-col h-full
                  relative
                  transition-all duration-500
                  hover:-translate-y-2
                "
              >
                {/* Badge mejorado */}
                {producto.badge && (
                  <Chip
                    size="sm"
                    color={producto.badge === "Oferta" ? "primary" : "success"}
                    className="absolute top-3 left-3 z-10 font-semibold shadow-lg"
                  >
                    {producto.badge}
                  </Chip>
                )}

                {/* Imagen con hover effect */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex justify-center items-center p-6 overflow-hidden">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay sutil en hover */}
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Contenido */}
                <div className="p-5 flex flex-col flex-grow bg-white dark:bg-gray-800">
                  <div className="flex-grow">
                    <h3 className="font-bold text-base text-blue-900 dark:text-white mb-2 line-clamp-2 min-h-[3rem]">
                      {producto.nombre}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[2.5rem]">
                      {producto.descripcion}
                    </p>
                  </div>

                  {/* Precio y botón */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-extrabold text-orange-500">
                        S/ {producto.precio.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        /unidad
                      </span>
                    </div>

                    <Button
                      onPress={() => handleAgregar(producto)}
                      className="
                        w-full 
                        bg-gradient-to-r from-orange-500 to-orange-600
                        hover:from-orange-600 hover:to-orange-700
                        text-white font-semibold
                        shadow-md hover:shadow-lg
                        transition-all duration-300
                      "
                      startContent={<ShoppingCart size={18} />}
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </div>

                {/* Borde decorativo en hover */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-500/0 group-hover:ring-orange-500/20 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* CTA mejorado */}
          <div className="mt-16 flex justify-center">
            <a
              href="/tienda"
              className="
                group
                inline-flex items-center justify-center gap-3
                px-8 py-4
                rounded-2xl
                bg-white dark:bg-gray-800
                hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600
                border-2 border-orange-500
                text-orange-600 hover:text-white
                dark:text-orange-400 dark:hover:text-white
                font-bold text-lg
                shadow-lg hover:shadow-2xl
                transition-all duration-500
                hover:scale-105
                focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/50
              "
            >
              Ver todos los productos
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {productoSeleccionado && (
        <AddToCartModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          producto={productoSeleccionado}
        />
      )}
    </>
  );
}

/* ================= MODAL MEJORADO ================= */

interface AddToCartModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  producto: Producto;
}

function AddToCartModal({
  isOpen,
  onOpenChange,
  producto,
}: AddToCartModalProps) {
  const [cantidad, setCantidad] = useState(1);

  /* ✅ siempre carga cantidad real */
  useEffect(() => {
    const storedQty = getCartItemQuantity(producto.id);
    setCantidad(storedQty ?? 1);
  }, [producto]);

  /* ✅ sincroniza cambios */
  const syncStorage = (qty: number) => {
    if (qty <= 0) {
      removeCartItem(producto.id);
    } else {
      upsertCartItem(producto, qty);
    }
  };

  const incrementar = () => {
    const next = cantidad + 1;
    setCantidad(next);
    syncStorage(next);
  };

  const disminuir = () => {
    const next = Math.max(0, cantidad - 1);
    setCantidad(next);
    syncStorage(next);
  };

  const handleChange = (value: string) => {
    const n = Number(value);

    if (!Number.isFinite(n)) return;

    const next = Math.max(0, Math.floor(n));
    setCantidad(next);
    syncStorage(next);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-3 pb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  ¡Producto agregado!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                  Se añadió al carrito correctamente
                </p>
              </div>
            </ModalHeader>

            <ModalBody className="py-6">
              <div className="flex items-start gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                {/* Imagen del producto */}
                <div className="shrink-0 w-24 h-24 bg-white dark:bg-gray-700 rounded-lg p-2 flex items-center justify-center">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info del producto */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-blue-900 dark:text-white mb-1 line-clamp-2">
                    {producto.nombre}
                  </h4>
                  <p className="text-2xl font-extrabold text-orange-500 mb-3">
                    S/ {producto.precio.toFixed(2)}
                  </p>

                  {/* Control de cantidad mejorado */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Cantidad:
                    </span>
                    <div className="flex items-center border-2 border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-700">
                      <button
                        onClick={disminuir}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={16} className="text-gray-700 dark:text-gray-300" />
                      </button>

                      <input
                        type="number"
                        min={0}
                        value={cantidad}
                        onChange={(e) => handleChange(e.target.value)}
                        className="w-16 text-center outline-none bg-transparent font-semibold text-gray-900 dark:text-white"
                      />

                      <button
                        onClick={incrementar}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={16} className="text-gray-700 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Subtotal:
                      </span>
                      <span className="text-xl font-bold text-blue-900 dark:text-white">
                        S/ {(producto.precio * cantidad).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="gap-3">
              <Button
                variant="light"
                onPress={onClose}
                className="font-semibold text-gray-600 dark:text-gray-400"
              >
                Seguir comprando
              </Button>

              <Button
                className="
                  bg-gradient-to-r from-orange-500 to-orange-600
                  hover:from-orange-600 hover:to-orange-700
                  text-white font-bold
                  shadow-md hover:shadow-lg
                  transition-all duration-300
                "
                onPress={() => {
                  onClose();
                  window.dispatchEvent(new Event("drawer:open"));
                }}
                endContent={<ArrowRight size={18} />}
              >
                Ir al carrito
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}