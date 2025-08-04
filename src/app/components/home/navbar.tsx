import {useTranslations} from 'next-intl';
import Link from 'next/link';

export default function Navbar() {
  const t = useTranslations('navbar');

  const links = [
    {
      text: t('home'),
      href: "#"
    },
    {
      text: t('about'),
      href: "#"
    },
    {
      text: t('dive'),
      href: "/map"
    },
    {
      text: t('store'),
      href: "/shop"
    },
    {
      text: t('register'),
      href: "/auth/sign-up"
    },
    {
      text: t('expo'),
      href: "#"
    },
    {
      text: t('contact'),
      href: "#"
    }
  ]


  return (
    <nav className="bg-transparent absolute bottom-10 w-full z-10">
      <ul className="flex justify-center flex-wrap gap-4 text-white font-semibold text-sm md:text-base">
        {links.map((value, idx) => (
          <li key={idx} className="flex items-center">
            <Link href={value.href} className="hover:text-[#eaff00]">
              {value.text}
            </Link>
            {idx < 6 && <span className="ml-2 text-[#eaff00]">|</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
