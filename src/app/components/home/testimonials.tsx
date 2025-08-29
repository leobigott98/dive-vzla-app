"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import Podcast from "./podcast";
import { clsx } from "clsx";

const testimonials = [
  {
    name: "CARLA MENDOZA",
    text: "Desde que descubrí esta comunidad, he conocido lugares increíbles para bucear que ni sabía que existían en Venezuela. ¡La buena vibra aquí es contagiosa!",
    photo: "/images/testimonials/testimonio_1.png",
  },
  {
    name: "LUIS ROJAS",
    text: "Siempre buceé solo, pero gracias a esta página he conectado con otros apasionados como yo. Ahora no me pierdo ni una inmersión grupal.",
    photo: "/images/testimonials/testimonio_2.png",
  },
  {
    name: "ANDREA VELÁSQUEZ",
    text: "Lo mejor es que no solo compartimos spots, sino consejos, historias y fotos brutales. Es más que una página, es una familia bajo el agua.",
    photo: "/images/testimonials/testimonio_3.png",
  },
];

type Testimonial = {
  name: string;
  text: string;
  photo: string;
};

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      updateButtons();
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Set initial
  }, [emblaApi, updateButtons]);

  const paddedTestimonials: Partial<Testimonial>[] = [...testimonials];

  return (
    <section
      className="relative pt-12 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/testimonials/background.webp')" }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Arrows */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2"
        >
          <Image
            src="/images/icons/left-arrow.png"
            alt="Previous"
            width={24}
            height={24}
          />
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10  p-2 "
        >
          <Image
            src="/images/icons/right-arrow.png"
            alt="Next"
            width={24}
            height={24}
          />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 justify-center embla__container">
            {paddedTestimonials.map((t, idx) => {
              const isActive = idx === selectedIndex;

              return (
                <div
                  key={idx}
                  className={clsx(
                    "flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33%] transition-transform duration-500 p-4",
                    isActive ? "scale-105 z-10" : "scale-95 opacity-70"
                  )}
                >
                  {t.photo && t.name? (
                    <div className="relative h-100">
                      <Image
                        src={t.photo}
                        alt={t.name}
                        width={250}
                        height={250}
                        className="rounded-full mx-auto object-cover"
                      />
                      {/* Overlay Card */}
                      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-11/12 bg-[#003675]/80 text-white p-4 rounded-xl backdrop-blur-md shadow-md z-20">
                        <h4 className="text-lg font-bold mb-1">{t.name}</h4>
                        <p className="italic text-sm">{t.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full opacity-0 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Podcast />
      <div className="pt-10 w-full">
        <Image
          src="/images/icons/wave.webp"
          alt="wave"
          width={1920}
          height={1080}
          className="relative -bottom-1 w-full sm:h-12 md:h-24 lg:h-48"
        />
      </div>
    </section>
  );
}
