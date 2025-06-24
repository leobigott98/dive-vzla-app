import {useTranslations} from 'next-intl';

export default function Navbar() {
  const t = useTranslations('navbar');

  return (
    <nav className="bg-transparent absolute bottom-10 w-full z-10">
      <ul className="flex justify-center flex-wrap gap-4 text-white font-semibold text-sm md:text-base">
        {[
          t('home'),
          t('about'),
          t('dive'),
          t('directory'),
          t('register'),
          t('expo'),
          t('contact'),
        ].map((text, idx) => (
          <li key={idx} className="flex items-center">
            <a href="#" className="hover:text-yellow-300">{text}</a>
            {idx < 6 && <span className="mx-2 text-yellow-300">|</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
