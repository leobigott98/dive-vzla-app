"use client";

// components/Sponsors.tsx
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./Locations.module.css";

const sponsors = [
  {
    src: "/images/sponsors/scubatec.webp",
    href: "https://www.instagram.com/scubatec_/?hl=es",
  },
  {
    src: "/images/sponsors/vip_diving.webp",
    href: "https://www.instagram.com/vipdiving_ptocabello/",
  },
  {
    src: "/images/sponsors/la_casa_del_buceo.webp",
    href: "https://www.instagram.com/lacasadelbuceo_vzla/?hl=es",
  },
  {
    src: "/images/sponsors/besa_los_roques.png",
    href: "https://besalosroques.com/",
    main: true,
  },
  {
    src: "/images/sponsors/scubatec.webp",
    href: "https://www.instagram.com/scubatec_/?hl=es",
  },
  {
    src: "/images/sponsors/vip_diving.webp",
    href: "https://www.instagram.com/vipdiving_ptocabello/",
  },
  {
    src: "/images/sponsors/la_casa_del_buceo.webp",
    href: "https://www.instagram.com/lacasadelbuceo_vzla/?hl=es",
  },
];

export default function Sponsors() {
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
    <section >
      <div className={`px-4 py-4 ${styles.embla}`}>
      <div
        className="absolute z-1 -translate-y-1/2 top-1/2"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={5}
          stroke="currentColor"
          className="size-10 hover:stroke-white transition-transform duration-300 hover:scale-120"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div ref={emblaRef}>
        <div className={`${styles.embla__container}`}>
          {sponsors.filter(sponsor => !sponsor.main).map((sponsor, idx) => (
            <a
              key={idx}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.embla__slide} relative group overflow-hidden rounded-lg shadow-lg`}
            >
              <Image
                src={sponsor.src}
                alt={`Sponsor ${idx}`}
                width={400}
                height={200}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </a>
          ))}
        </div>
      </div>
      <div
        className="absolute z-1 right-1 -translate-1/2 top-1/2"
        onClick={() => emblaApi?.scrollNext()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={5}
          stroke="currentColor"
          className="size-10 transition-transform duration-300 hover:scale-120 hover:stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      </div>
      <div className="px-4 py-4 overflow-hidden ">
        {sponsors
          .filter((sponsor) => sponsor.main)
          .map((sponsor, idx) => {
            return (
              <a
                key={idx}
                href={sponsor.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group overflow-hidden rounded-lg shadow-lg`}
              >
                <Image
                  src={sponsor.src}
                  alt={`Sponsor ${idx}`}
                  width={400}
                  height={200}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </a>
            );
          })}
      </div>
    </section>
  );
}
