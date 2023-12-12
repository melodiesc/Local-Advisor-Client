import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PostedCard.css";

const LocationList = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/locations');
                setLocations(response.data.locations);
                console.log(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchData();
    }, []);

    return (
      <div className='parentFiche'>
       
          {locations && locations.map((location) => (
              <div key={location.id} className="fiche">
                <img className="imageFiche" src={location.image_path} />
                <h5><u>{location.category}</u></h5>
                <p className="titre">{location.name}</p>
                <p>Propriétaire : {location.owner_lastname} {location.owner_firstname}</p>
              </div>
          ))}
        
      </div>
    );
};

export default LocationList;
