import axios from 'axios';
import "./PostedCard.css";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate(); 
    const apiUrl = import.meta.env.VITE_API_URL;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/locations`);
                setLocations(response.data.locations);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };
        fetchData();
    }, []);

    const handleLocationClick = (locationId) => {
        navigate(`/${locationId}`);
    };

    return (
        <div className='parentFiche'>
            {locations && locations.map((location) => (
                <div key={location.id} className="fiche" >
                    <img onClick={() => handleLocationClick(location.id)} className="imageFiche" src={location.image_path} alt={location.name} />
                    <h5 ><u>{location.category}</u></h5>
                    <p onClick={() => handleLocationClick(location.id)} className="titre">{location.name}</p>
                    <p>Propriétaire : {location.owner_lastname} {location.owner_firstname}</p>
                </div>
            ))}
        </div>
    );
};

export default LocationList;