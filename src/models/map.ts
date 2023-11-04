export type Coordinates = [number, number];

export interface MapZoom {
  coordinates: Coordinates;
  zoom: number;
}

export type MapZoomIndicator = "full" | "north" | "central" | "south";

export type MapZoomIndicators = { [key in MapZoomIndicator]: MapZoom };

export interface Location {
  id: number;
  name: string;
  coordinates: Coordinates;
  description: string;
  links: string[];
  otherSources: string[];
}
