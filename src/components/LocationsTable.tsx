import { Location } from "../models/map";
import { SourcesList } from "./SourcesList";

interface Props {
  locations: Location[];
  onViewLocation: (locationId: number) => void;
}

export const LocationsTable = ({ locations, onViewLocation }: Props) => {
  const columns = ["Name", "Description", "Sources"];

  return (
    <table>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {locations.map((l, i) => (
          <tr key={i} onClick={() => onViewLocation(l.id)}>
            <td>{l.name}</td>
            <td>{l.description}</td>
            <td>
              <SourcesList location={l} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
