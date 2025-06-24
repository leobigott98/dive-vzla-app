import {useTranslations} from 'next-intl';

export default function DiscountBanner() {
    const t = useTranslations('discount');

  return (
    <section className="relative w-full h-[160px] max-h-[160px] overflow-hidden my-4">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/diver.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center font-bold text-lg sm:text-2xl px-4">
        <p>{t('headline1')}</p>
        <p className="text-4xl font-extrabold">{t('headline2')}</p>
        <p>{t('headline3')}</p>
      </div>
    </section>
  );
}
