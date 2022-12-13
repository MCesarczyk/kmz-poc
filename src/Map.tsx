import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";

interface BasemapProps {
  kml?: any;
};

export const Map = ({ kml }: BasemapProps) => {
  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      zoom={15}
      center={[-29.770, 25.425]}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {kml && <ReactLeafletKml kml={kml} />}
    </MapContainer>
  );
};
