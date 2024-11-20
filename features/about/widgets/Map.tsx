"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import MainLayout from "@/components/common/layouts/MainLayout";

const cartoonPinIcon = new L.Icon({
    iconUrl: "/images/pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const pins = [
    { id: 1, lat: -1.286389, lng: 36.817223, description: "Nairobi" },
    { id: 2, lat: -3.938333, lng: 39.664722, description: "Mombasa" },
    { id: 3, lat: -0.091702, lng: 34.767956, description: "Kisumu" },
    { id: 4, lat: 0.516667, lng: 35.283333, description: "Eldoret" },
    { id: 5, lat: -0.283333, lng: 36.066667, description: "Nakuru" },
    { id: 6, lat: -0.416667, lng: 36.95, description: "Nyeri" },
    { id: 7, lat: -0.716667, lng: 37.15, description: "Embu" },
    { id: 8, lat: -1.683333, lng: 37.233333, description: "Machakos" },
    { id: 9, lat: -0.45, lng: 39.65, description: "Malindi" },
    { id: 10, lat: -1.516667, lng: 37.266667, description: "Kitui" },
    { id: 11, lat: -1.2921, lng: 36.8219, description: "Westlands" },
    { id: 12, lat: -1.3032, lng: 36.7073, description: "Kikuyu" },
    { id: 13, lat: -1.3733, lng: 36.8219, description: "Karen" },
    { id: 14, lat: -1.2921, lng: 36.9319, description: "Ruiru" },
    { id: 15, lat: -1.2921, lng: 36.9519, description: "Thika" },
    { id: 16, lat: -1.2921, lng: 36.9919, description: "Juja" },
    { id: 17, lat: -1.2921, lng: 36.8719, description: "Kasarani" },
    { id: 18, lat: -1.2921, lng: 36.8119, description: "Langata" },
    { id: 19, lat: -1.2921, lng: 36.8419, description: "Ngong" },
    { id: 20, lat: -1.2921, lng: 36.8619, description: "Kiserian" },
];




const Map = () => {
    return (
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

                {pins.map((pin) => (
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
    );
};

export default Map;
