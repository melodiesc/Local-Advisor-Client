import "./Details.css";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {Container,Typography,Box,CardMedia,CircularProgress,TextField,Button,Stack,Rating,} from "@mui/material";
import { Margin } from "@mui/icons-material";

function Details() {
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const [rate, setRate] = useState(0);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [details, setDetails] = useState(null);
  const isOwner = localStorage.getItem('isOwner');
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data);
        } else {
          console.error('Erreur lors de la récupération des données de l\'utilisateur');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur', error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/${numericId}`);
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
  }, [numericId]);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('commentaire', comment);
    console.log('note', rate);
    console.log('id du lieu', numericId);
    console.log('id de l\'utilisateur', userId.id);

    try {
      const response = await fetch (`${apiUrl}/api/${numericId}/notices` , {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          comment,
          rate,
          numericId,
          user_id: userId.id,
        }),
      });

      const responseData = await response.json()
      console.log("API Response:", responseData);

      if(response.ok) {
        console.log('Commentaire posté avec succès');
      } else {
        console.error('Erreur lors de la soumission du commentaire');
      }
    } catch (error) {
      console.error('Erreur', error);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="parentDetails">
        <div className="details">
          <Container component="main" maxWidth="md">
            <Box sx={{ my: 4 }}>
                <h1 className="titre">
                  {details.category.category} {details.name}
                </h1>
              {details.image_path && (
                <CardMedia
                  component="img"
                  className="imageDetails"
                  image={details.image_path}
                  alt={`Photo du lieu ${details.name}`}
                  sx={{ width: "100%", mb: 2 }}
                />
              )}
                <p className="address">
                  <u>Adresse:</u> {details.address}, {details.zip_code}{" "}
                  {details.city}
                </p>
                <Box
                  sx={{
                    "& > legend": { mt: 2 },
                  }}
                >
                  <Typography component="legend">Note moyenne :</Typography>
                  <Rating
                    name="simple-controlled"
                    // value={averageRate}
                  />
                </Box>
                <p className="rate">
                  {details.rate ? details.rate.name : "Non spécifié"}
                </p>
                <p className="description">{details.description}</p>

              {isOwner === "false" ? (
              <form onSubmit={handleSubmit}>
                <div className="formNotice">
                <input name="numericId" type='hidden' defaultValue={numericId} />
                <input name="user_id" type='hidden' defaultValue={userId.id} />
                <Box
                  >
                  <Typography component="legend" >Note :
                  <Rating
                    name='rate'
                    value={rate}
                    onChange={(event, newRate) => {setRate(newRate)}}
                  />
                  </Typography>
                </Box>
                <Box
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "30em" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="outlined-multiline-static"
                      label="Votre commentaire"
                      name='comment'
                      multiline
                      rows={6}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                </Box>
                <Stack spacing={2} direction="row">
                  <Button type='submit' variant="contained">Commenter</Button>
                </Stack>
                </div>
              </form>
              ) : ""
              }
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Details;
