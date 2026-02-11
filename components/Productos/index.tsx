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

export default function Productos() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  const productosData: Producto[] = [
    {
      id: 1,
      nombre: "Sika Impermur",
      precio: 10,
      descripcion: "Impermeabilizante de alta resistencia para techos y muros.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FSIKA%2FSIKA%20IMPERMUR.png?alt=media&token=5bf61563-0b54-4c38-833c-6e8fcb297e66",
      badge: "Nuevo",
    },
    {
      id: 2,
      nombre: "Cemento Extraforte",
      precio: 12,
      descripcion: "Cemento de alta durabilidad ideal para estructuras.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FPACASMAYO%20EXTRAFORTE.png?alt=media&token=4924ff61-2360-40cf-b832-630912ce01ec",
      badge: "Oferta",
    },
    {
      id: 3,
      nombre: "Cemento Mochica",
      precio: 14,
      descripcion: "Excelente rendimiento y resistencia estructural.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FCEMENTO%20MOCHICA.png?alt=media&token=1344c797-d93a-4ecb-b27f-1705cfedb7e7",
    },
    {
      id: 4,
      nombre: "Cemento Tipo 1",
      precio: 12,
      descripcion: "Ideal para construcciones generales.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FCEMENTO%20TIPO%201.png?alt=media&token=51630310-fee3-44bb-9d20-f5111601cef6",
    },
    {
      id: 5,
      nombre: "Tubo cuadrado 2.0*2.0mm*6mt",
      precio: 15,
      descripcion: "Perfil metálico resistente para estructuras.",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHE10nnA-l3uYYGnHWvdOEXiEnOh-hPZFwEQ&s",
    },
    {
      id: 6,
      nombre: "Calamina roja 0.3x0.8x3.60",
      precio: 16,
      descripcion: "Cobertura resistente para techos.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCALAMINA%2FCALAMINA%20ROJA.png?alt=media&token=673a3e65-be58-4b81-b013-e9235e8b4bc6",
    },
    {
      id: 7,
      nombre: "Teja Andina",
      precio: 12,
      descripcion: "Diseño moderno y alta resistencia climática.",
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FTEJA%2FTEJA%20ANDINA.png?alt=media&token=9dd5edfe-554f-4ef2-8c08-e7ed839ff796",
    },
    {
      id: 8,
      nombre: "Fierro de 1/2",
      precio: 11,
      descripcion: "Barra de acero para refuerzo estructural.",
      imagen:
        "https://media.falabella.com/sodimacPE/211230_01/w=800,h=800,fit=pad",
    },
  ];

  const handleAgregar = (producto: Producto) => {
    setProductoSeleccionado(producto);
    onOpen();
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-950 py-16 transition-colors duration-300">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">
            Catálogo de Productos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productosData.map((producto) => (
              <div
                key={producto.id}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 
          rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1
          transition-all duration-300 flex flex-col h-full relative overflow-hidden"
              >
                {producto.badge && (
                  <Chip
                    size="sm"
                    color={producto.badge === "Oferta" ? "primary" : "success"}
                    className="absolute top-3 right-3 z-10"
                  >
                    {producto.badge}
                  </Chip>
                )}

                <div className="bg-gray-100 dark:bg-gray-800 aspect-square p-6 flex items-center justify-center">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Contenido */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Bloque superior */}
                  <div>
                    <h3 className="font-semibold text-lg text-blue-900 dark:text-white">
                      {producto.nombre}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 min-h-[40px]">
                      {producto.descripcion}
                    </p>
                  </div>

                  {/* Bloque inferior alineado */}
                  <div className="mt-auto pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-500">
                        S/ {producto.precio.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      onPress={() => handleAgregar(producto)}
                      className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all"
                      startContent={<ShoppingCart size={18} />}
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 🔥 CTA GLOBAL */}
          <div className="mt-14 flex justify-center">
            <a
              href="/tienda"
              className="
      inline-flex items-center gap-2
      px-8 py-3
      rounded-full
      border-2 border-orange-600
      text-orange-600 font-semibold text-lg
      hover:bg-orange-600 hover:text-white
      shadow-sm hover:shadow-md
      transition-all duration-300
      focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70
    "
            >
              Ver todos los productos →
            </a>
          </div>
        </div>
      </section>

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

  useEffect(() => {
    setCantidad(1);
  }, [producto]);

  const incrementar = () => setCantidad((prev) => prev + 1);
  const disminuir = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const handleChange = (value: string) => {
    const numero = Number(value);
    if (!isNaN(numero) && numero >= 1) {
      setCantidad(numero);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" radius="lg">
      <ModalContent className="bg-white dark:bg-gray-900">
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-2 text-gray-800 dark:text-white">
              <CheckCircle className="text-green-500" size={20} />
              Producto agregado al carrito
            </ModalHeader>

            <ModalBody>
              <div className="flex gap-6 items-center">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-24 h-24 object-contain"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {producto.nombre}
                  </p>
                  <p className="text-lg font-bold text-orange-500 mt-1">
                    S/ {producto.precio.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <button
                    onClick={disminuir}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <Minus size={16} />
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-16 text-center bg-transparent outline-none text-gray-800 dark:text-white"
                  />

                  <button
                    onClick={incrementar}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="justify-between">
              <Button variant="light" onPress={onClose}>
                Seguir comprando
              </Button>

              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onPress={onClose}
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
