import { ReactNode, useEffect, useState } from "react";
import { MapContainer, Pane, TileLayer, useMap } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import 'leaflet-kml';
import * as L from 'leaflet';

interface BasemapProps {
  kml?: any;
};

export const Map = ({ kml }: BasemapProps) => {
  const [kmlLayer, setKmlLayer] = useState<ReactNode | null>(null);
  const map = useMap();

  // const generateKml = (kml: any) => (
  //   <Pane name={"kml"}>
  //     <ReactLeafletKml pane="kml" kml={kml} />
  //   </Pane>
  // );

  // @ts-ignore
  const track = new L.KML(kml);

  useEffect(() => {
    map.addLayer(track);
    const bounds = track.getBounds();
    map.fitBounds(bounds);

    return () => {
      track.remove();
    }
  }, [kml]);

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
      {/* <Pane name={"kml"}>
        {kml && <ReactLeafletKml pane="kml" kml={kml} />}
      </Pane> */}
      {/* {kmlLayer} */}
    </MapContainer>
  );
};
