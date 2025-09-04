"use client";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";
import { diveSpots, DiveSpot } from "@/app/data/dive-spots";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LatLngExpression } from "leaflet";
import { X } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export default function DiveMap() {
  const [selectedSpot, setSelectedSpot] = useState<DiveSpot | null>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const position = [10.5, -66.9] as LatLngExpression;

  // Snap positions
  const peekHeight = 80;
  const halfHeight = windowHeight * 0.5;
  const fullHeight = windowHeight * 0.8;
  const hiddenHeight = windowHeight + 50;

  const [spring, api] = useSpring(() => ({
    y: hiddenHeight,
    config: { tension: 300, friction: 30 },
  }));

  const bind = useDrag(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ last, movement: [, my], direction: [, dy], velocity }) => {
      if (!selectedSpot) return;

      let newY = spring.y.get() + my;

      if (newY < 0) newY = 0;
      if (newY > hiddenHeight) newY = hiddenHeight;

      if (last) {
        // Snap logic: find closest position
        const positions = [peekHeight, halfHeight, fullHeight, hiddenHeight];
        const closest = positions.reduce((prev, curr) =>
          Math.abs(curr - newY) < Math.abs(prev - newY) ? curr : prev
        );
        if (closest === hiddenHeight) setSelectedSpot(null);
        api.start({ y: closest });
      } else {
        api.start({ y: newY });
      }
    },
    { axis: "y" }
  );

  // Snap to peek when opening
  useEffect(() => {
    if (selectedSpot) {
      api.start({ y: peekHeight });
    } else {
      api.start({ y: hiddenHeight });
    }
  }, [selectedSpot, api, hiddenHeight]);

  return (
    <div className="w-full h-screen relative">
      {/* Map */}
      <LeafletMap
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {diveSpots.map((spot) => (
          <Marker
            key={spot.id}
            position={spot.coordinates}
            eventHandlers={{ click: () => setSelectedSpot(spot) }}
          />
        ))}
      </LeafletMap>

      {/* Bottom Sheet */}
      <animated.div
        {...bind()}
        style={{ y: spring.y }}
        className="fixed left-0 right-0 bottom-0 z-50 touch-none sm:touch-auto"
      >
        <div
          className="bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 overflow-y-auto"
          style={{ maxHeight: windowHeight * 0.85 }}
        >
          {/* Peek handle */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2 cursor-grab"></div>

          {/* Close button */}
          {selectedSpot && (
            <button
              onClick={() => setSelectedSpot(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              aria-label="Close panel"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Content */}
          {selectedSpot && (
            <div className="px-4 pb-6">
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
      </animated.div>
    </div>
  );
}
