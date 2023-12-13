import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CardMedia,
  CircularProgress,
} from "@mui/material";

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
    return <CircularProgress />;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="body1">
          <h2> {details.category.category}</h2>
        </Typography>

        <Typography variant="body1">
          Adresse: {details.address}, {details.zip_code} {details.city}
        </Typography>
        {details.image_path && (
          <CardMedia
            component="img"
            image={details.image_path}
            alt={`Photo du lieu ${details.name}`}
            sx={{ width: "100%", mb: 2 }}
          />
        )}
        <Typography variant="body1">
          Note: {details.rate ? details.rate.name : "Non spécifié"}
        </Typography>
        {/* <Typography variant="body1">Note: {details.rate.rate}</Typography> */}

        <Typography variant="body1" sx={{ mb: 2 }}>
          Description: {details.description}
        </Typography>
      </Box>
    </Container>
  );
}

export default Details;
