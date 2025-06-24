'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import Autoplay from 'embla-carousel-autoplay';

const testimonials = [
  {
    name: 'CARLA MENDOZA',
    text: 'Desde que descubrí esta comunidad, he conocido lugares increíbles para bucear que ni sabía que existían en Venezuela. ¡La buena vibra aquí es contagiosa!',
    photo: '/images/testimonials/testimonio_1.png',
  },
  {
    name: 'LUIS ROJAS',
    text: 'Siempre buceé solo, pero gracias a esta página he conectado con otros apasionados como yo. Ahora no me pierdo ni una inmersión grupal.',
    photo: '/images/testimonials/testimonio_2.png',
  },
  {
    name: 'ANDREA VELÁSQUEZ',
    text: 'Lo mejor es que no solo compartimos spots, sino consejos, historias y fotos brutales. Es más que una página, es una familia bajo el agua.',
    photo: '/images/testimonials/testimonio_3.png',
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', updateButtons);
    updateButtons();

    /* const autoScroll = setInterval(() => emblaApi.scrollNext(), 7000);
    return () => clearInterval(autoScroll); */
  }, [emblaApi, updateButtons]);

  return (
    <section className="py-12 bg-cover bg-center" style={{ backgroundImage: "url('/images/testimonials/background.webp')" }}>
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Arrows */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-blue-900 bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full"
        >
          <Image src="/images/icons/left-arrow.png" alt="Previous" width={24} height={24} />
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-blue-900 bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full"
        >
          <Image src="/images/icons/right-arrow.png" alt="Next" width={24} height={24} />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33%] p-4">
                <div className="bg-blue-900 bg-opacity-80 rounded-xl text-white p-6 text-center h-full">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h4 className="text-lg font-bold mb-2">{t.name}</h4>
                  <p className="italic text-sm">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


