import DiveMapLeaflet from "@/app/components/map/diveMapLeaflet";

export default function DiveMapPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Mapa Interactivo de Buceo</h1>
      <DiveMapLeaflet />
    </main>
  );
}
