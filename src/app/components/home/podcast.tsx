export default function Podcast() {
  return (
    <section className="px-4 py-4">
      <p className="text-xl font-bold mb-2">Suscríbete a nuestro Podcast</p>
      <iframe
        className="rounded-2xl h-1/2 md:h-136 w-full"
        src="https://www.youtube.com/embed/LHPR-i9pci4?si=pamKoKIjSlElm3wj&amp;controls=0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </section>
  );
}
