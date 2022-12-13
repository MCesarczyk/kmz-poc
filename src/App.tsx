import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Map } from "./Map";
import './App.css'

function App() {
  const [kml, setKml] = useState(null);
  const [url, setUrl] = useState<string | undefined>(undefined);

  // https://raw.githubusercontent.com/aviklai/react-leaflet-kml/master/src/assets/example1.kml
  // https://drive.google.com/file/d/1zYfH_FJmya0X8MnasPDn4HX9FvUOXL5V/view?usp=share_link
  // https://drive.google.com/file/d/1CUAu3xOUgomTZCG2eGdAigaJHsYjSlcx/view?usp=share_link

  useEffect(() => {
    if (!url){
      return;
    }

    fetch(url, {mode: 'no-cors'})
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        setKml(kml as any);
        console.log(kmlText);
        console.log(kml);
      });
  }, [url]);

  useEffect(() => {
      console.log(url);
  }, [url]);

  return (
    <div className="App">
      <Header onSubmit={setUrl} onFileUpload={setKml} />
      <Map kml={kml} />
    </div>
  );
};

export default App;
