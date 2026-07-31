import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./MapPicker.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ position, setPosition, setAddress }) {
  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      setPosition(latlng);
      reverseGeocode(latlng.lat, latlng.lng, setAddress);
    },
  });

  return position ? (
    <Marker
      position={position}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const p = e.target.getLatLng();
          setPosition(p);
          reverseGeocode(p.lat, p.lng, setAddress);
        },
      }}
    >
      <Popup>Selected Location</Popup>
    </Marker>
  ) : null;
}

async function reverseGeocode(lat, lng, setAddress) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );

    const data = await res.json();

    setAddress(data.display_name || "");
  } catch {
    setAddress("");
  }
}

export default function MapPicker({
  onLocationSelect,
  height = "450px",
}) {
  const [position, setPosition] = useState({
    lat: 17.6868,
    lng: 83.2185,
  });

  const [address, setAddress] = useState("");

  useEffect(() => {
    reverseGeocode(position.lat, position.lng, setAddress);
  }, []);

  useEffect(() => {
    if (onLocationSelect) {
      onLocationSelect({
        latitude: position.lat,
        longitude: position.lng,
        address,
      });
    }
  }, [position, address]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((loc) => {
      const p = {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      };

      setPosition(p);
      reverseGeocode(p.lat, p.lng, setAddress);
    });
  };

  return (
    <div className="map-picker">

      <div className="map-toolbar">
        <button
          className="btn btn-success"
          onClick={getCurrentLocation}
        >
          Current Location
        </button>
      </div>

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom
        className="map-container"
        style={{ height }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          position={position}
          setPosition={setPosition}
          setAddress={setAddress}
        />
      </MapContainer>

      <div className="location-details">

        <div className="location-box">
          <label>Latitude</label>
          <input value={position.lat} readOnly />
        </div>

        <div className="location-box">
          <label>Longitude</label>
          <input value={position.lng} readOnly />
        </div>

      </div>

      <div className="address-box">

        <label>Address</label>

        <textarea
          rows="3"
          value={address}
          readOnly
        />

      </div>

    </div>
  );
}