import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Map } from "./Map";
import './App.css'

function App() {
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState(null);
  const [kml, setKml] = useState(null);

  useEffect(() => {
    console.log(url);
  }, [url]);

  useEffect(() => {
    console.log(file);
  }, [file]);

  useEffect(() => {
    console.log(kml);
  }, [kml]);

  const parseKml = (kmlText: string) => {
    const parser = new DOMParser();
    const kml = parser.parseFromString(kmlText, "text/xml");
    setKml(kml as any);
  };

  useEffect(() => {
    console.log(file);
    const reader = new FileReader();
    file && reader.readAsText(file);

    reader.onloadend = () => {
      const kmlText = reader.result;
      if (typeof kmlText === 'string') {
        parseKml(kmlText);
      }
    };
  }, [file]);

  useEffect(() => {
    if (!url) {
      return;
    }

    fetch(url)
      .then((res) => res.text())
      .then((kmlText) => parseKml(kmlText));
  }, [url]);

  return (
    <div className="App">
      <Header onSubmit={setUrl} onFileUpload={setFile} />
      <Map kml={kml} />
    </div>
  );
};

export default App;
