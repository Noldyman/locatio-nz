import { Location } from "../models/map";

const parseCsv = (csv: string): Location[] => {
  const delimeter = ";";
  const headerIndexes = {
    name: 0,
    coordinates: 1,
    description: 2,
    links: 3,
    otherSources: 4,
  };

  const rows = csv.split("\n");
  rows.shift();

  const parsedData = rows.map((row, index): Location => {
    const values = row.split(delimeter);
    const coordinates = values[headerIndexes.coordinates].split(",").map(Number);

    return {
      id: index + 1,
      name: values[headerIndexes.name],
      coordinates: [coordinates[0], coordinates[1]],
      description: values[headerIndexes.description],
      links: values[headerIndexes.links].split(",").filter((l) => !!l && l !== "\r"),
      otherSources: values[headerIndexes.otherSources].split(",").filter((o) => !!o && o !== "\r"),
    };
  });

  return parsedData;
};

export const getLocations = async () => {
  const response = await fetch("/data/locations.csv");
  const data = await response.text();
  const locations = parseCsv(data);
  console.log(locations);
  return locations;
};
