import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import {Container,Typography,Box,CardMedia,CircularProgress,} from "@mui/material";
import "./Details.css";

function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/${id}`);
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
    return <CircularProgress />;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <NavBar />
        <div className="parentDetails">
          <div className="details">
            <Container component="main" maxWidth="md">
              <Box sx={{ my: 4 }}>
                <Typography variant="body1">
                  <h1 className="titre">{details.category.category} {details.name}</h1>
                </Typography>

                {details.image_path && (
                  <CardMedia
                    component="img"
                    className="imageDetails"
                    image={details.image_path}
                    alt={`Photo du lieu ${details.name}`}
                    sx={{ width: "100%", mb: 2 }}
                  />
                )}
                <Typography variant="body1">
                <p className="address"><u>Adresse:</u> {details.address}, {details.zip_code} {details.city}</p>
                </Typography>
                <Typography variant="body1">
                <p className="rate">{details.rate ? details.rate.name : "Non spécifié"}</p>
                </Typography>
                {/* <Typography variant="body1">Note: {details.rate.rate}</Typography> */}

                <Typography variant="body1" sx={{ mb: 2 }}>
                  <p className="description">{details.description}</p>
                </Typography>
              </Box>
            </Container>
          </div>
        </div>
    </div>
  );
}

export default Details;
