"use client";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";
/* import type { MapContainerProps } from "react-leaflet"; */
import { diveSpots, DiveSpot } from "@/app/data/dive-spots";
import { useState } from "react";
import Image from "next/image";
import { LatLngExpression } from "leaflet";

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
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {/* <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        {diveSpots.map((spot) => (
          <Marker
            key={spot.id}
            position={spot.coordinates}
            eventHandlers={{ click: () => setSelectedSpot(spot) }}
          />
        ))}
      </LeafletMap>

      {selectedSpot && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">{selectedSpot.name}</h2>
          <p className="mt-1 text-gray-700">{selectedSpot.description}</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedSpot.images.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`${selectedSpot.name} ${idx}`}
                className="rounded w-full h-48 object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
