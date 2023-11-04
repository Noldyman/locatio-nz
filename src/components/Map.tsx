import { useEffect } from "react";
import { TileLayer, useMap, useMapEvents } from "react-leaflet";
import { MapZoomIndicator, MapZoomIndicators, Location } from "../models/map";
import { LocationMarker } from "./LocationMarker";

const views: MapZoomIndicators = {
  full: {
    coordinates: [-41.61211148138476, 173.4496677132401],
    zoom: 5,
  },
  north: {
    coordinates: [-40.00351376633062, 175.6457859208343],
    zoom: 7,
  },
  central: {
    coordinates: [-42.13442096657781, 172.96166715056228],
    zoom: 7,
  },
  south: {
    coordinates: [-45.17846907867191, 169.08548009783507],
    zoom: 7,
  },
};

interface Props {
  view?: MapZoomIndicator;
  locations: Location[];
  viewLocationId?: number;
}

export const Map = ({ view, locations, viewLocationId }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (!view) return;
    map.setView(views[view].coordinates, views[view].zoom);
  }, [map, view]);

  useEffect(() => {
    if (!viewLocationId) return;
    const location = locations.find((l) => l.id === viewLocationId);
    if (!location) return;
    map.flyTo([location.coordinates[0] + 0.012, location.coordinates[1]], 14);
  }, [map, viewLocationId, locations]);

  return (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((loc) => (
        <LocationMarker key={loc.id} location={loc} openPopup={loc.id === viewLocationId} />
      ))}
    </>
  );
};
