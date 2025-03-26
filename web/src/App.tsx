import { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map";
import camImg from "./assets/video-camera-icon.png";
function App() {
  type cameraJsonObject = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  };

  const [cameras, setCameras] = useState<cameraJsonObject[]>([]);
  useEffect(() => {
    const fetchCameras = async () => {
      setCameras(
        (await fetch("http://localhost:3000/getAllCameras").then((res) =>
          res.json()
        )) as cameraJsonObject[]
      );
    };
    fetchCameras();
  }, []);
  console.log(cameras);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        margin: "10px",
      }}
    >
      <div style={{ display: "flex", gap: "1em", alignItems: "center" }}>
        <img src={camImg} style={{ height: "48px" }}></img>
        <p style={{ fontSize: 48 }}>
          <b>Security Cams Utrecht</b>
        </p>
      </div>
      <Map
        position={{ latitude: 52.0914, longitude: 5.1115 }}
        zoom={11}
        style={{ width: "100%", height: "400px", borderRadius: "12px" }} // Set a height here
        points={cameras.map((camera) => ({
          latitude: camera.latitude,
          longitude: camera.longitude,
          name: camera.name,
        }))}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          width: "100%",
          padding: "10px",
          borderRadius: "12px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {[
          { title: "Camera's t/m 600", filter: (id: number) => id <= 600 },
          {
            title: "Camera's 601 t/m 699",
            filter: (id: number) => id >= 601 && id <= 699,
          },
          {
            title: "Camera's 700 t/m 799",
            filter: (id: number) => id >= 700 && id <= 799,
          },
          { title: "Overige camera's", filter: (id: number) => id >= 800 },
        ].map(({ title, filter }) => (
          <div
            key={title}
            style={{
              backgroundColor: "lightgrey",
              padding: "10px",
              borderRadius: "10px",
              overflowY: "auto",
            }}
          >
            <p>{title}</p>
            <table>
              <thead>
                <tr>
                  <th>Nummer</th>
                  <th>Naam</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {cameras
                  .filter((camera) => filter(camera.id))
                  .map((camera) => (
                    <tr key={camera.id}>
                      <td>{camera.id}</td>
                      <td>{camera.name}</td>
                      <td>{camera.latitude}</td>
                      <td>{camera.longitude}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
