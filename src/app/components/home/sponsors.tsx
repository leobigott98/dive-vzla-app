// components/Sponsors.tsx
import Image from 'next/image';

const sponsors = [
  { src: '/images/sponsors/scubatec.webp', href: 'https://www.instagram.com/scubatec_/?hl=es' },
  { src: '/images/sponsors/vip_diving.webp', href: 'https://www.instagram.com/vipdiving_ptocabello/' },
  { src: '/images/sponsors/la_casa_del_buceo.webp', href: 'https://www.instagram.com/lacasadelbuceo_vzla/?hl=es' },
  { src: '/images/sponsors/besa_los_roques.png', href: 'https://besalosroques.com/', main: true },
];

export default function Sponsors() {
  return (
    <section className="px-4 py-8 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sponsors.map((sponsor, idx) => (
          <a
            key={idx}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sponsor.main ? 'col-span-3' : ''} block hover:scale-105 transition-transform`}
          >
            <Image
              src={sponsor.src}
              alt={`Sponsor ${idx}`}
              width={400}
              height={200}
              className="w-full h-auto object-contain"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
