"use client";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";
import { diveSpots, DiveSpot } from "@/app/data/dive-spots";
import { useState } from "react";
import Image from "next/image";
import { LatLngExpression } from "leaflet";
import { X } from "lucide-react";

export default function DiveMap() {
  const [selectedSpot, setSelectedSpot] = useState<DiveSpot | null>(null);
  const position = [10.5, -66.9] as LatLngExpression;

  return (
    <div className="w-full">
      <LeafletMap
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        />
        {diveSpots.map((spot) => (
          <Marker
            key={spot.id}
            position={spot.coordinates}
            eventHandlers={{ click: () => setSelectedSpot(spot) }}
          />
        ))}
      </LeafletMap>

      {/* Info panel */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          selectedSpot
            ? "max-h-[1500px] opacity-100 mt-6 sm:mt-6"
            : "max-h-0 opacity-0"
        }`}
      >
        {selectedSpot && (
          <div
            className={`
              relative p-6 bg-white rounded-t-2xl shadow-lg border border-gray-100
              sm:rounded-2xl sm:mt-0
              ${selectedSpot ? "translate-y-0" : "translate-y-full"}
              transition-transform duration-500 ease-in-out
              fixed bottom-0 left-0 right-0 sm:static
              max-h-[85vh] sm:max-h-none
              overflow-y-auto
            `}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedSpot(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              aria-label="Close panel"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-2xl font-bold text-blue-700">
              {selectedSpot.name}
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {selectedSpot.description}
            </p>

            {selectedSpot.providers && selectedSpot.providers.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Providers:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedSpot.providers.map((prov, idx) => (
                    <li key={idx}>{prov}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsive image grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {selectedSpot.images.slice(0, 9).map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-40 sm:h-48 md:h-56 lg:h-60 rounded-lg overflow-hidden group"
                >
                  <Image
                    src={src}
                    alt={`${selectedSpot.name} ${idx + 1}`}
                    fill
                    className="object-cover transform group-hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
