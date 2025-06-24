'use client';

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

      {/* Dot Indicators */}
      <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={clsx(
              'w-3 h-3 rounded-full border border-yellow-300',
              selectedIndex === i ? 'bg-yellow-300' : 'bg-transparent'
            )}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>

      {/* Overlay Content */}
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
}

