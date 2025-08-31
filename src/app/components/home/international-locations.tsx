"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const locations = [
  {
    src: "/images/locations/curazao.webp",
    title: "Curazao",
    subtitle: "DE LOS MEJORES DESTINOS DE BUCEO EN EL MUNDO",
  },
  {
    src: "/images/locations/isla_larga.webp",
    title: "BONAIRE",
    subtitle: "",
  },
  {
    src: "/images/locations/chichiriviche.webp",
    title: "MALPELO",
    subtitle: "COLOMBIA",
  },
];

export default function InternationalLocations() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <section className="px-4 py-4 relative">
      <div className="absolute z-1 -translate-y-1/2 top-1/2" onClick={()=> emblaApi?.scrollPrev()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className="size-10 hover:stroke-white transition-transform duration-300 hover:scale-120">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
      </div>
      {/* --- Mobile Carousel --- */}
      <div className="block md:hidden relative">
        <div className="overflow-hidden relative" ref={emblaRef}>
          <div className="flex gap-4 start-0">
            {locations.map((loc, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 relative group overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={loc.src}
                  alt={loc.title}
                  width={400}
                  height={300}
                  className="w-full aspect-[8/5] object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                  <h3 className="text-xl font-bold">{loc.title}</h3>
                  <p className="text-sm">{loc.subtitle}</p>
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
      </div>

      {/* --- Desktop Grid --- */}
      <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 gap-4">
        {locations.map((loc, idx) =>
          idx === 0 ? (
            <div
              key={idx}
              className="relative overflow-hidden rounded-lg shadow-lg md:col-span-2 md:row-span-2"
            >
              <Image
                src={loc.src}
                alt={loc.title}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-3xl font-bold">{loc.title}</h3>
                <p className="text-lg">{loc.subtitle}</p>
              </div>
            </div>
          ) : (
            <div
              key={idx}
              className="relative overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={loc.src}
                alt={loc.title}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-xl font-bold">{loc.title}</h3>
                <p className="text-sm">{loc.subtitle}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
