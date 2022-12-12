import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import styled from "styled-components";
import './App.css'

const Header = styled.header`
  position: absolute;
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 80%;
  margin: 1rem 2rem -4rem 4rem;
  z-index: 500;
  right: 0;
  top: 0;
`;

const Headline = styled.h1`
  position: relative;
  text-align: left;
  background: transparent;
  flex-shrink: 0;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem;
  color: white;
  background-color: green;
`;

function App() {
  const [kml, setKml] = useState(null);
  const [url, setUrl] = useState("https://raw.githubusercontent.com/aviklai/react-leaflet-kml/master/src/assets/example1.kml");
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        setKml(kml as any);
        console.log(kml);
      });
  }, [url]);

  return (
    <div className="App">
      <Header>
        <Headline>KMZ-POC</Headline>
        <Input placeholder="Enter KMZ file Url" onChange={e => setValue(e.target.value)} />
        <Button onClick={() => setUrl(value)}>Go</Button>
      </Header>
      <MapContainer
        style={{ height: "100vh", width: "100%" }}
        zoom={17}
        center={[37.422, -122.084]}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {kml && <ReactLeafletKml kml={kml} />}
      </MapContainer>
    </div>
  );
};

export default App;
