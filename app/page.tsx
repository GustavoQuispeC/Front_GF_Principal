'use client';

import { Carousel, Categorias, Contactenos, Header, Marcas, Productos } from "@/components";

export default function Home() {
  const imagenesBanner = [
    "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Carousel%2FCAROUSEL_1.png?alt=media&token=a5218405-7e1c-4e24-a996-07d33845c113",
    "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Carousel%2FCAROUSEL_2.png?alt=media&token=399808d1-f1d3-4b5e-b1cf-bcb729467b9b",
    "https://firebasestorage.googleapis.com/v0/b/grupofamet-456604.firebasestorage.app/o/Carousel%2FCAROUSEL_3.png?alt=media&token=65e1c03d-1dfc-47b7-8ed7-9c654daff179",
  ];
 
  return (
    <section className="flex flex-col gap-1 py-1 md:py-2 ">
      
    {/* <Header /> */}
    <Carousel images={imagenesBanner} />
   <Categorias />
    <Productos />
    <Marcas />
    <Contactenos />
    
    </section>
  );
}
