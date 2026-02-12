'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay' // Importamos el plugin
import { Button } from "@heroui/react"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  images: string[]
}

export default function EcommerceCarousel({ images }: Props) {
  // Configuración de Autoplay: 5 segundos entre slides
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
    <div className="w-full bg-white py-8 dark:bg-gray-900">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative group">
        
        {/* Viewport */}
        <div className="overflow-hidden rounded-2xl shadow-md border border-slate-100 dark:border-gray-800" ref={emblaRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div 
                className="relative min-w-0 flex-[0_0_100%] aspect-[16/9] md:aspect-[25/9]" 
                key={index}
              >
                <img
                  src={src}
                  alt={`Banner ${index}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Botones de navegación (estilo HeroUI) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-12 right-12 flex justify-between pointer-events-none">
          <Button
            isIconOnly
            variant="flat"
            radius="full"
            className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-all bg-white/60 dark:bg-black/40 backdrop-blur-md"
            onClick={scrollPrev}
          >
            <ChevronLeft size={24} className="text-blue-900 dark:text-white" />
          </Button>

          <Button
            isIconOnly
            variant="flat"
            radius="full"
            className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-all bg-white/60 dark:bg-black/40 backdrop-blur-md"
            onClick={scrollNext}
          >
            <ChevronRight size={24} className="text-blue-900 dark:text-white" />
          </Button>
        </div>

        {/* Indicadores (Dots) */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                selectedIndex === index 
                  ? 'w-10 bg-blue-900 dark:bg-blue-500' 
                  : 'w-2 bg-slate-300 dark:bg-gray-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}