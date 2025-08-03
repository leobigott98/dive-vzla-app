export default function Podcast() {
  return (
    <section className="px-4 py-4 bg-white">
      <p className="text-xl font-bold mb-2">
        Suscríbete a nuestro Podcast
      </p>
      <iframe
        className="rounded-2xl h-1/2 md:h-136 w-full"
        src="https://www.youtube.com/embed/L4qM1IEhtNQ?si=Z1G6fCwScSh3hYt8"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </section>
  );
}
