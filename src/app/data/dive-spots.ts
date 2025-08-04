export type DiveSpot = {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number]; // [lat, lng]
  images: string[];
};

export const diveSpots: DiveSpot[] = [
  {
    id: "mochima",
    name: "Mochima National Park",
    description: "Crystal clear waters, coral reefs, and diverse marine life.",
    coordinates: [10.233, -64.601],
    images: ["/images/spots/mochima1.jpg", "/images/spots/mochima2.jpg"]
  },
  {
    id: "los-roques",
    name: "Los Roques",
    description: "One of the best dive sites in the Caribbean, teeming with fish.",
    coordinates: [11.85, -66.75],
    images: ["/images/spots/roques1.jpg", "/images/spots/roques2.jpg"]
  },
  {
    id: "morrocoy",
    name: "Morrocoy National Park",
    description: "Explore caves and reefs surrounded by warm shallow waters.",
    coordinates: [10.93, -68.29],
    images: ["/images/spots/morrocoy1.jpg"]
  }
];
