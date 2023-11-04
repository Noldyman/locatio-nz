import { useEffect, useRef } from "react";
import { Location } from "../models/map";
import { Marker, Popup } from "react-leaflet";
import { SourcesList } from "./SourcesList";

interface Props {
  location: Location;
  openPopup?: boolean;
}

export const LocationMarker = ({ location, openPopup }: Props) => {
  const markerRef = useRef<{ openPopup: () => void }>();

  useEffect(() => {
    if (openPopup && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [openPopup, markerRef]);

  const hasSources = !!location.links.length || !!location.otherSources.length;

  return (
    <Marker ref={markerRef} position={location.coordinates}>
      <Popup>
        <h3>{location.name}</h3>
        <p>{location.description}</p>

        {hasSources && (
          <>
            <strong>Sources</strong>
            <SourcesList location={location} />
          </>
        )}
      </Popup>
    </Marker>
  );
};
