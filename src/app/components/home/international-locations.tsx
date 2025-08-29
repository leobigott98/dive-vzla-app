"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./Locations.module.css";

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
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section className="px-4 py-4" ref={emblaRef}>
      <div className="embla__container">
        <div className={`grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 ${styles.embla__slide}`}>
          {locations.map((loc, idx) => (
            <>
              {idx % 3 == 0 ? (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-lg shadow-lg sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-2"
                >
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
              ) : (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-lg shadow-lg sm:col-span-1 sm:row-span-1 md:row-span-1"
                >
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
              )}
            </>
          ))}
        </div>
      </div>
      {/* Add the bottom featured section if needed */}
    </section>
  );
}
