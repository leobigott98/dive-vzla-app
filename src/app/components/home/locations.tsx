// app/(wherever)/Locations.tsx
"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./Locations.module.css";

const locations = [
  {
    src: "/images/locations/margarita.webp",
    title: "MARGARITA",
    subtitle: "EL CARIBE PROFUNDO TE LLAMA",
  },
  {
    src: "/images/locations/isla_larga.webp",
    title: "ISLA LARGA",
    subtitle: "EL TESORO SUBMARINO DE PUERTO CABELLO",
  },
  {
    src: "/images/locations/chichiriviche.webp",
    title: "CHICHIRIVICHE",
    subtitle: "EL SECRETO MEJOR GUARDADO DEL LITORAL CENTRAL",
  },
  {
    src: "/images/locations/margarita.webp",
    title: "MARGARITA",
    subtitle: "EL CARIBE PROFUNDO TE LLAMA",
  },
  {
    src: "/images/locations/isla_larga.webp",
    title: "ISLA LARGA",
    subtitle: "EL TESORO SUBMARINO DE PUERTO CABELLO",
  },
  {
    src: "/images/locations/chichiriviche.webp",
    title: "CHICHIRIVICHE",
    subtitle: "EL SECRETO MEJOR GUARDADO DEL LITORAL CENTRAL",
  },
];

export default function Locations() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 4000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );

  return (
    <section className={`px-4 py-4 ${styles.embla}`}>
      {/* Viewport */}
      <div className="absolute z-1 -translate-y-1/2 top-1/2" onClick={()=> emblaApi?.scrollPrev()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className="size-10 hover:stroke-white transition-transform duration-300 hover:scale-120">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
      </div>
      <div ref={emblaRef}>
        {/* Container / Track */}
        <div className={`${styles.embla__container}`}>
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className={`${styles.embla__slide} relative group overflow-hidden rounded-lg shadow-lg`}
            >
              <div className="relative w-full aspect-[8/5]">
                <Image
                  src={loc.src}
                  alt={loc.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={idx < 3}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h3 className="text-xl font-bold drop-shadow">{loc.title}</h3>
                  <p className="text-sm drop-shadow">{loc.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute z-1 right-1 -translate-1/2 top-1/2" onClick={()=> emblaApi?.scrollNext()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className="size-10 transition-transform duration-300 hover:scale-120 hover:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
      </div>
    </section>
  );
}

/* 'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const locations = [
  { src: '/images/locations/margarita.webp', title: 'MARGARITA', subtitle: 'EL CARIBE PROFUNDO TE LLAMA' },
  { src: '/images/locations/isla_larga.webp', title: 'ISLA LARGA', subtitle: 'EL TESORO SUBMARINO DE PUERTO CABELLO' },
  { src: '/images/locations/chichiriviche.webp', title: 'CHICHIRIVICHE', subtitle: 'EL SECRETO MEJOR GUARDADO DEL LITORAL CENTRAL' },
  { src: '/images/locations/margarita.webp', title: 'MARGARITA', subtitle: 'EL CARIBE PROFUNDO TE LLAMA' },
  { src: '/images/locations/isla_larga.webp', title: 'ISLA LARGA', subtitle: 'EL TESORO SUBMARINO DE PUERTO CABELLO' },
  { src: '/images/locations/chichiriviche.webp', title: 'CHICHIRIVICHE', subtitle: 'EL SECRETO MEJOR GUARDADO DEL LITORAL CENTRAL' },
];

export default function Locations() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  useEffect(()=>{
    if(emblaApi){
      console.log(emblaApi.slideNodes());
    }

  }, [emblaApi])

  return (
    <section className="px-4 py-4 embla" ref={emblaRef}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 embla__container"  >
        {locations.map((loc, idx) => (
          <div key={idx} className="relative group overflow-hidden rounded-lg shadow-lg col-span-1 embla__slide">
            <Image
              src={loc.src}
              alt={loc.title}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0  flex flex-col justify-center items-center text-center text-white p-4">
              <h3 className="text-xl font-bold">{loc.title}</h3>
              <p className="text-sm">{loc.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Add the bottom featured section if needed 
    </section>
  );
}
*/
