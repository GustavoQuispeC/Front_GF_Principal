'use client';

import { Categorias, Header, Marcas, Productos } from "@/components";
export default function Home() {
 
  return (
    <section className="flex flex-col items-center justify-center gap-1 py-1 md:py-2">
      
    <Header />
   <Categorias />
    <Productos />
    <Marcas />
    
    </section>
  );
}
