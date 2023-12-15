import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Details.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDetails(data);
        } else {
          throw new Error(
            "Une erreur est survenue lors de la récupération des données"
          );
        }
      } catch (error) {
        console.error("Erreur:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Chargement...</div>; // Remplacé CircularProgress par un div
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!details) {
    return <div>Aucune donnée disponible</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="box">
          <div className="typography">
            <h2>{details.category.category}</h2>
          </div>

          {details.image_path && (
            <img
              className="pics"
              src={details.image_path}
              alt={`Photo du lieu ${details.name}`}
            />
          )}

          <div className="typography">
            <StarIcon className="locic" fontSize="small" />{" "}
            {details.rate ? details.rate.name : "/5"}
            <StarIcon className="locic" fontSize="small" />
          </div>
          <div className="typography">
            <FmdGoodIcon className="locic" fontSize="small" /> {details.address}
            , {details.zip_code} {details.city}
          </div>
          <div className="typography">
            <InfoIcon className="locic" fontSize="small" />{" "}
            {details.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
