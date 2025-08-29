'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import Fade from 'embla-carousel-fade';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('hero');

  const slides = [
    {
      src: '/images/header/banner_01.webp',
      title: t('slide1.title'),
      tagline: t('slide1.tagline'),
      sub: t('slide1.sub'),
      logo: '/images/logo-alt.png',
      buzo: null
    },
    {
      src: '/images/header/banner_02.webp',
      title: t('slide2.title'),
      tagline: t('slide2.tagline'),
      sub: t('slide2.sub'),
      buzo: '/icons/lupa.png'
    },
    {
      src: '/images/header/banner_03.webp',
      title: t('slide3.title'),
      tagline: t('slide3.tagline'),
      sub: t('slide3.sub'),
      buzo: '/icons/mundo.png'
    },
    {
      src: '/images/header/banner_04.webp',
      title: t('slide4.title'),
      tagline: t('slide4.tagline'),
      sub: t('slide4.sub'),
      buzo: '/icons/buzo.png'
    }
  ];

  const toggleLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    router.replace(`/${newLocale}`);
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(interval);
    };
  }, [emblaApi, onSelect]);

  const currentSlide = slides[selectedIndex];

  return (
    <header className="relative h-screen text-white overflow-hidden">
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div className="flex-[0_0_100%] relative h-full" key={i}>
              <Image
                src={slide.src}
                alt={`Slide ${i + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            className={clsx(
              'w-3 h-3 rounded-full border border-[#eaff00]',
              selectedIndex === i ? 'bg-[#eaff00]' : 'bg-transparent'
            )}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <Image
          src="/logo.png"
          alt="Dive Venezuela"
          width={240}
          height={240}
          className={`mb-4 ${!currentSlide.buzo? 'sm:w-0.5 sm:h-0.5 md:w-62 md:h-24' : ''} mb-4`}
        />
        <h1 className={`${currentSlide.buzo? 'text-5xl' : 'text 2xl'} sm:text-7xl font-bold flex items-center gap-3`}>
          {currentSlide.buzo? (
            <Image src={currentSlide.buzo} alt="Buzo" width={64} height={64} />
          ): (<></>)}
          {currentSlide.title}
        </h1>
        <p className="text-xl mt-4">{currentSlide.tagline}</p>
        <p className="text-sm mt-2 text-gray-200 max-w-xl">
          {currentSlide.sub}
        </p>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={toggleLocale}
            className="border border-white px-4 py-1 rounded-full text-sm hover:bg-white hover:text-blue-900 transition"
          >
            {t('toggle')}
          </button>
          <Link
            key="login"
            href="/auth/login"
            className="border border-white px-4 py-1 rounded-full text-sm hover:bg-white hover:text-blue-900 transition"
          >
            {t('login')}
          </Link>
        </div>
      </div>
    </header>
  );
}


/* 'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import Fade from 'embla-carousel-fade'
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {useTranslations} from 'next-intl';
import Link from 'next/link';

const images = [
  '/images/header/banner_01.webp',
  '/images/header/banner_02.webp',
  '/images/header/banner_03.webp',
  '/images/header/banner_04.webp',
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true },  [Fade()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('hero');

  const toggleLocale = () => {
  const newLocale = locale === 'es' ? 'en' : 'es';
  router.replace(`/${newLocale}`);
};

  // Update selected index on change
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(interval);
    };
  }, [emblaApi, onSelect]);

  return (
    <header className="relative h-screen text-white overflow-hidden">
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, i) => (
            <div
              className="flex-[0_0_100%] relative h-full"
              key={i}
            >
              <Image src={src} alt={`Slide ${i + 1}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      </div>

      /* Dot Indicators 

      <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={clsx(
              'w-3 h-3 rounded-full border border-[#eaff00]',
              selectedIndex === i ? 'bg-[#eaff00]' : 'bg-transparent'
            )}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>

      {/* Overlay Content 
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <Image src="/logo.png" alt="Dive Venezuela" width={120} height={120} className="mb-4" />
        <h1 className="text-5xl sm:text-7xl font-bold flex items-center gap-3">
          <Image src="/buzo.png" alt="Buzo" width={64} height={64} />
          {t('title')}
        </h1>
        <p className="text-xl mt-4">
          {t('tagline')}
        </p>
        <p className="text-sm mt-2 text-gray-200 max-w-xl">
          {t('sub')}
        </p>
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={toggleLocale} className="border border-white px-4 py-1 rounded-full text-sm hover:bg-white hover:text-blue-900 transition">{t('toggle')}</button>
          <Link key="login" href='/auth/login' className="border border-white px-4 py-1 rounded-full text-sm hover:bg-white hover:text-blue-900 transition">{t('login')}</Link>
        </div>
      </div>
    </header>
  );
} */

