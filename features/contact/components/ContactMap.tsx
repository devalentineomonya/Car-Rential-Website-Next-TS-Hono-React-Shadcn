"use client"
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { locations } from '@/utils/constants'

const ContactMap = () => {
 

  const position: [number, number] = [locations[0].lat, locations[0].lng]

  return (
    <div className='flex-1 pl-12 h-[700px] rounded-lg overflow-hidden max-lg:hidden relative z-0 '>
      <MapContainer 
        center={position} 
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker 
            key={location.id} 
            position={[location.lat, location.lng]}
          >
            <Popup>
              {location.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default ContactMap