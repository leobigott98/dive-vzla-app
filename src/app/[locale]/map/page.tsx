import DiveMap from "@/app/components/dive-map";

export default function DiveMapPage() {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mapa Interactivo de Buceo</h1>
      <DiveMap />
    </main>
  );
}
