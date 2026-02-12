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

import { ShoppingCart, CheckCircle, Plus, Minus } from "lucide-react";

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
      precio: 33.20,
      descripcion: "Excelente rendimiento y resistencia estructural.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FCEMENTO%20MOCHICA.png?alt=media&token=1344c797-d93a-4ecb-b27f-1705cfedb7e7",
    },
    {
      id: 4,
      nombre: "Cemento Tipo 1",
      precio: 37.50,
      descripcion: "Ideal para construcciones generales.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FCEMENTO%20TIPO%201.png?alt=media&token=51630310-fee3-44bb-9d20-f5111601cef6",
    },
    {
      id: 5,
      nombre: "Tubo cuadrado 2.0*2.0mm*6mt",
      precio: 45.00,
      descripcion: "Perfil metálico resistente para estructuras.",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHE10nnA-l3uYYGnHWvdOEXiEnOh-hPZFwEQ&s",
    },
    {
      id: 6,
      nombre: "Calamina roja 0.3x0.8x3.60",
      precio: 25.00,
      descripcion: "Cobertura resistente para techos.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCALAMINA%2FCALAMINA%20ROJA.png?alt=media&token=673a3e65-be58-4b81-b013-e9235e8b4bc6",
    },
    {
      id: 7,
      nombre: "Teja Andina",
      precio: 44.00,
      descripcion: "Diseño moderno y alta resistencia climática.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FTEJA%2FTEJA%20ANDINA.png?alt=media&token=9dd5edfe-554f-4ef2-8c08-e7ed839ff796",
    },
    {
      id: 8,
      nombre: "Fierro de 1/2",
      precio: 28.00,
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
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">
            Catálogo de Productos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productosData.map((producto) => (
              <div
                key={producto.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden"
              >
                {producto.badge && (
                  <Chip
                    size="sm"
                    color={producto.badge === "Oferta" ? "primary" : "success"}
                    className="absolute top-3 right-3"
                  >
                    {producto.badge}
                  </Chip>
                )}

                <div className="aspect-square bg-gray-100 flex justify-center items-center p-6">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-blue-900 dark:text-white">
                    {producto.nombre}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {producto.descripcion}
                  </p>

                  <p className="text-xl font-extrabold text-orange-500 mt-4">
                    S/ {producto.precio.toFixed(2)}
                  </p>

                  <Button
                    onPress={() => handleAgregar(producto)}
                    className="w-full mt-4 bg-orange-500 text-white"
                    startContent={<ShoppingCart size={18} />}
                  >
                    Agregar al carrito
                  </Button>
                </div>
              </div>
            ))}
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

/* ================= MODAL ================= */

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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-2">
              <CheckCircle className="text-green-500" />
              Producto agregado
            </ModalHeader>

            <ModalBody>
              <div className="flex items-center gap-6">
                <img
                  src={producto.imagen}
                  className="w-20 h-20 object-contain"
                />

                <div className="flex-1">
                  <p className="font-bold">{producto.nombre}</p>
                  <p className="text-orange-500 font-extrabold">
                    S/ {producto.precio.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center border rounded-xl overflow-hidden">
                  <button onClick={disminuir} className="px-3 py-2">
                    <Minus size={16} />
                  </button>

                  <input
                    type="number"
                    min={0}
                    value={cantidad}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-14 text-center outline-none"
                  />

                  <button onClick={incrementar} className="px-3 py-2">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Seguir comprando
              </Button>

              <Button
  className="bg-orange-500 text-white"
  onPress={() => {
    onClose(); // cierra modal

    // ✅ abre drawer
    window.dispatchEvent(new Event("drawer:open"));
  }}
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
