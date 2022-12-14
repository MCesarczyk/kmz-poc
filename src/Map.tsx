import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet-kml';
import * as L from 'leaflet';

interface KMLLayerProps {
  kml: any
};

const KMLLayer = ({ kml }: KMLLayerProps) => {
  const map = useMap();
  // @ts-ignore
  const track = new L.KML(kml);
  console.log(track);

  useEffect(() => {
    map.addLayer(track);
    if (kml){
      // const bounds = track.getBounds();
      // map.fitBounds(bounds);
    }

    return () => {
      track.remove();
    }
  }, [kml]);

  return null;
};

interface BasemapProps {
  kml?: any;
};

export const Map = ({ kml }: BasemapProps) => (
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
    <KMLLayer kml={kml} />
  </MapContainer>
);
