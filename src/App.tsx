import "./App.css";
import { MapContainer } from "react-leaflet";
import { Map } from "./components/Map";
import { Location, MapZoomIndicator } from "./models/map";
import { useEffect, useState } from "react";
import { getLocations } from "./utils/locations";
import { LocationsTable } from "./components/LocationsTable";

function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [view, setView] = useState<MapZoomIndicator | undefined>("full");
  const [viewLocationId, setViewLocationId] = useState<number>();

  useEffect(() => {
    const fetchLocations = async () => {
      const newLocations = await getLocations();
      setLocations(newLocations);
    };
    fetchLocations();
  }, []);

  const viewButtons: { label: string; value: MapZoomIndicator }[] = [
    { label: "Full", value: "full" },
    { label: "North", value: "north" },
    { label: "Central", value: "central" },
    { label: "South", value: "south" },
  ];

  const changeView = (newView: MapZoomIndicator) => {
    setViewLocationId(undefined);
    setView(newView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewLocation = (locationId: number) => {
    setView(undefined);
    setViewLocationId(locationId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header>
        <h1>LocatioNZ</h1>
      </header>
      <main>
        <MapContainer id="map">
          <Map view={view} locations={locations} viewLocationId={viewLocationId} />
        </MapContainer>

        <div className="view-buttons">
          {viewButtons.map((b) => (
            <button key={b.value} onClick={() => changeView(b.value)}>
              {b.label}
            </button>
          ))}
        </div>

        <LocationsTable locations={locations} onViewLocation={viewLocation} />
      </main>
    </>
  );
}

export default App;
