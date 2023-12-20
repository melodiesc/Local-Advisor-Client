import "./Details.css";
import NavBar from "../NavBar/NavBar";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {Container,Typography,Box,CardMedia,CircularProgress,TextField,Button,Stack,Rating,} from "@mui/material";

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
  const [showAlert, setShowAlert] = useState(false);
  const [notices, setNotices] = useState([]);

  //////////////////////////////////////* Récupération des commentaires et des notes */////////////////////////////////////////
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/${id}/notices/show`);
        if (response.ok) {
          const data = await response.json();
          setNotices(data.data);
        } else {
          console.error('Erreur lors de la récupération des commentaires et des notes.');
        }
      } catch(error){
        console.error('Erreur lors de la récupération des commentaires et des notes.', error);
      }
    };

    fetchNotices();
  }, []);

  //////////////////////////////////////* Récupération des données utilisateurs */////////////////////////////////////////
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
          console.error('Erreur lors de la récupération des données de l\'utilisateur.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur.', error);
      }
    };
    
    fetchData();
  }, []);

  //////////////////////////////////////* Récupération des données du lieu */////////////////////////////////////////
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
      const response = await fetch (`${apiUrl}/api/${numericId}/notices/store` , {
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
        setShowAlert(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
      <div className="center">
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
                  {showAlert && (
                    <Alert severity="success">
                      Commentaire posté avec succès.
                    </Alert>
                  )}
                  </div>
                </form>
                ) : ""
                }
              </Box>
            </Container>
          </div>
          <div className="renderNotice">
          {notices && notices.map((notice) => (
            <div className="noticeFiche" key={notice.id}>
              <h2>{notice.pseudo}</h2>
              <h5>Posté le : {notice.created_at}</h5>
              <p>Note : {notice.rate}/5</p>
              <p>Avis :</p>
              <p>{notice.comment}</p>
              {isOwner === "true" ? (
                <Stack spacing={2} direction="row">
                <Button type='submit' variant="contained">Répondre</Button>
              </Stack>
              ) : ""
              }
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
