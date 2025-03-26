import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -30],
});
type longitudeLangitude = { longitude: number; latitude: number };
type point = { longitude: number; latitude: number; name: string };
type mapComponentProps = {
  position: longitudeLangitude;
  zoom?: number;
  points?: point[];
  style?: React.CSSProperties;
};
export default function Map({
  position,
  zoom = 1,
  points = [],
  style = {},
}: mapComponentProps) {
  console.log(points);
  return (
    <MapContainer
      center={[position.latitude, position.longitude]}
      zoom={zoom}
      scrollWheelZoom={false}
      style={style}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map(
        (point, index) =>
          point.latitude &&
          point.longitude &&
          point.name && (
            <Marker
              key={index}
              position={[point.latitude, point.longitude]}
              icon={defaultIcon}
            >
              <Popup>{point.name}</Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
}
