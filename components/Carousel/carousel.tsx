'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from "@heroui/react"
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import NextLink from "next/link"
import clsx from 'clsx'

interface Props {
  images: string[]
}

export default function EcommerceCarousel({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  ])
  
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="w-full bg-white dark:bg-gray-950 py-12">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
        
        <div className="overflow-hidden rounded-3xl shadow-xl relative border border-slate-200 dark:border-white/5" ref={emblaRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div 
                className="relative min-w-0 flex-[0_0_100%] aspect-[16/9] md:aspect-[25/9]" 
                key={index}
              >
                <img
                  src={src}
                  alt={`Banner ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* BOTÓN ESTRATÉGICO: Inferior Derecha */}
                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20">
                  <Button
                    as={NextLink}
                    href="/tienda"
                    className={clsx(
                      "bg-gray-50 hover:bg-orange-600 hover:text-white text-orange-600  font-bold",
                      "px-8 py-6 rounded-2xl shadow-2xl scale-100 hover:scale-105 active:scale-95",
                      "transition-all duration-300 ease-out opacity-0 translate-y-4",
                      selectedIndex === index && "opacity-100 translate-y-0"
                    )}
                    startContent={<ShoppingCart size={20} fill="currentColor" />}
                  >
                    Ir a la tienda
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Flechas de Navegación Minimalistas */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <Button
              isIconOnly
              variant="flat"
              radius="full"
              className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-all bg-white/30 dark:bg-black/20 backdrop-blur-md border border-white/20"
              onClick={scrollPrev}
            >
              <ChevronLeft size={24} className="text-blue-950 dark:text-white" />
            </Button>

            <Button
              isIconOnly
              variant="flat"
              radius="full"
              className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-all bg-white/30 dark:bg-black/20 backdrop-blur-md border border-white/20"
              onClick={scrollNext}
            >
              <ChevronRight size={24} className="text-blue-950 dark:text-white" />
            </Button>
          </div>

          {/* Indicadores (Dots) integrados en el banner */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={clsx(
                  "h-1.5 rounded-full transition-all duration-300",
                  selectedIndex === index 
                    ? 'w-8 bg-white shadow-lg' 
                    : 'w-1.5 bg-white/40 hover:bg-white/60'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}