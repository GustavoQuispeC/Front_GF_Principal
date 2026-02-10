'use client';

import { Categorias, Contactenos, Header, Marcas, Productos } from "@/components";
export default function Home() {
 
  return (
    <section className="flex flex-col gap-1 py-1 md:py-2">
      
    <Header />
   <Categorias />
    <Productos />
    <Marcas />
    <Contactenos />
    
    </section>
  );
}
