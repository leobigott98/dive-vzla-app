// components/Footer.tsx
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function Footer() {
    const t = useTranslations('footer');

  return (
    <footer className="bg-blue-900 text-white py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        <div>
          <Image src="/logo.png" alt="Dive Venezuela" width={100} height={100} className="mb-2" />
          <p className="mb-2">
            {t('about')}
          </p>
          <p>{t('cta')}</p>
        </div>

        <div>
          <h4 className="font-bold mb-2">{t('contact')}</h4>
          <p>+58 000-000.00.00</p>
          <p>divezla@gmail.com</p>
        </div>

        <div>
          <h4 className="font-bold mb-2">{t('links')}</h4>
          {['Inicio', 'Sobre Nosotros', 'Bucear en Venezuela', 'Directorio', 'Regístrate', 'Expo Dive', 'Contacto'].map(link => (
            <p key={link}>{link}</p>
          ))}
        </div>

        <div>
          <h4 className="font-bold mb-2">INSTAGRAM</h4>
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <Image key={i} src={`/images/instagram/ig${i + 1}.webp`} alt={`IG ${i + 1}`} width={80} height={80} className="rounded" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-gray-300 mt-8 text-xs">{t('copyright')}</p>
    </footer>
  );
}
