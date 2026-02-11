'use client';

import { ShoppingCart } from 'lucide-react';

export default function Productos() {
  const productosData = [
    {
      id: 1,
      nombre: "Sika Impermur",
      precio: "$10.00",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagen: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FSIKA%2FSIKA%20IMPERMUR.png?alt=media&token=5bf61563-0b54-4c38-833c-6e8fcb297e66"
    },
    {
      id: 2,
      nombre: "Cemento Extraforte",
      precio: "$12.00",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagen: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FPACASMAYO%20EXTRAFORTE.png?alt=media&token=4924ff61-2360-40cf-b832-630912ce01ec"
    },
    {
      id: 3,
      nombre: "Cemento mochica",
      precio: "$14.00",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagen: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FCEMENTO%20MOCHICA.png?alt=media&token=1344c797-d93a-4ecb-b27f-1705cfedb7e7"
    },
    {
      id: 4,
      nombre: "Cemento tipo 1",
      precio: "$12.00",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagen: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCEMENTO%2FCEMENTO%20TIPO%201.png?alt=media&token=51630310-fee3-44bb-9d20-f5111601cef6"
    },
    {
      id: 5,
      nombre: "Tubo cuadrado 2.0*2.0mm*6mt",
      precio: "$15.00",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHE10nnA-l3uYYGnHWvdOEXiEnOh-hPZFwEQ&s"
    },
    {
      id: 6,
      nombre: "Calamina roja 0.3x0.8x3.60",
      precio: "$16.00",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagen: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FCALAMINA%2FCALAMINA%20ROJA.png?alt=media&token=673a3e65-be58-4b81-b013-e9235e8b4bc6"
    },
    {
      id: 7,
      nombre: "Teja andina",
      precio: "$12.00",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagen: "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/productos%2FTEJA%2FTEJA%20ANDINA.png?alt=media&token=9dd5edfe-554f-4ef2-8c08-e7ed839ff796"
    },
    {
      id: 8,
      nombre: "Fierro de 1/2",
      precio: "$11.00",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imagen: "https://media.falabella.com/sodimacPE/211230_01/w=800,h=800,fit=pad"
    },
  ];

  return (
    <div className="bg-white p-4 dark:bg-gray-900">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 sm:mb-8 dark:text-white">Catálogo de productos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-xl:gap-4 gap-6">
          {productosData.map((producto) => (
            <div key={producto.id} className="bg-white shadow-sm border border-gray-200 rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700">
              <a href="javascript:void(0)" className="block">
                <div className="aspect-[12/11] bg-gray-50 rounded-lg p-4 overflow-hidden">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-110" 
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <h5 className="text-base font-semibold text-slate-900 dark:text-white">{producto.nombre}</h5>
                  <h6 className="text-base text-slate-900 font-bold ml-auto dark:text-white">{producto.precio}</h6>
                </div>
                <p className="text-slate-600 text-[13px] mt-2 dark:text-white">{producto.descripcion}</p>
              </a>
              <div className="flex items-center gap-2 mt-6">
                <button type="button" className="text-sm px-3 py-2 font-medium cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-blue-900 font-semibold tracking-wide outline-none border-none rounded-lg flex items-center justify-center gap-2 transition">
                  <ShoppingCart size={18} />
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
