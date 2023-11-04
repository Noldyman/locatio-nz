import { Location } from "../models/map";

interface Props {
  location: Location;
}

export const SourcesList = ({ location }: Props) => {
  return (
    <ul>
      {location.links.map((link, i) => (
        <li key={"l" + i}>
          <a href={link} target="_blank">
            {link}
          </a>
        </li>
      ))}
      {location.otherSources.map((source, i) => (
        <li key={"o" + i}>{source}</li>
      ))}
    </ul>
  );
};
