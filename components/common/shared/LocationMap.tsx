"use client";
import { Icon } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility";
import MainLayout from "@/components/common/layouts/MainLayout";
import { locations } from "@/utils/constants";

const cartoonPinIcon = new Icon({
  iconUrl: "/images/pin.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const LocationMap = () => {
  return (
    <div className="relative z-0 rounded-md overflow-hidden">
      <MainLayout>
        <MapContainer
          className="mb-24"
          center={[-1.286389, 36.817223]}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {locations.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.lat, pin.lng]}
              icon={cartoonPinIcon}
            >
              <Popup>{pin.description}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </MainLayout>
    </div>
  );
};

export default LocationMap;
