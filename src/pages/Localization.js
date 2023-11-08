import React from 'react';
import { Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MyContainer from '../components/MyContainer';
import MarkIcon from "../assets/location.png";
import "leaflet/dist/leaflet.css";
import axios from 'axios';
import L from 'leaflet';

// Créez un nouvel icône personnalisé
const customIcon = new L.Icon({
    iconUrl: MarkIcon, // Remplacez par le chemin de votre icône
    iconSize: [32, 32], // Définissez la taille de l'icône
    iconAnchor: [16, 32], // Définissez l'ancre de l'icône
    popupAnchor: [0, -32] // Définissez l'emplacement du popup par rapport à l'icône
  });

const Localization = () => {
    const position = [-23.354173, 43.66966];
    const [ville, setVille] = React.useState([]);

    React.useEffect(() => {
        axios.get('/api/localization/all')
                .then(response => {
                    console.log(response);
                    setVille(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
    }, [])

    function ViewMap(){
        let map = useMap();
        map.setView(position, map.getZoom());
        //Sets geographical center and zoom for the view of the map
        return null;
    }

    return (
        <MyContainer>
            <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
                contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    ville.map(elem => (
                        <Marker key={elem.city} position={[elem.latitude, elem.longitude]} icon={customIcon}>
                            <Popup>
                                { elem.city }
                            </Popup>
                        </Marker>
                    ))
                }

                <ViewMap />
            </MapContainer>
        </MyContainer>
    );
}

export default Localization;
