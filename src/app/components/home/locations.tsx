'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const locations = [
  { src: '/images/locations/margarita.webp', title: 'Margarita', subtitle: 'EL CARIBE PROFUNDO TE LLAMA' },
  { src: '/images/locations/isla_larga.webp', title: 'Isla Larga', subtitle: 'EL TESORO SUBMARINO DE PUERTO CABELLO' },
  { src: '/images/locations/chichiriviche.webp', title: 'Chichiriviche', subtitle: 'EL SECRETO MEJOR GUARDADO DEL LITORAL CENTRAL' },
];

export default function Locations() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section className="px-4 py-8" ref={emblaRef}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 embla__container"  >
        {locations.map((loc, idx) => (
          <div key={idx} className="relative group overflow-hidden rounded-lg shadow-lg">
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
      {/* Add the bottom featured section if needed */}
    </section>
  );
}
