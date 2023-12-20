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
  const [responses, setResponses] = useState([]);
  const [content, setContent] = useState([]);
  const [noticeId, setNoticeId] = useState(null);

  //////////////////////////////////////* Récupération des réponses du gérant */////////////////////////////////////////

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/${id}/responses/show`);
        if (response.ok) {
          const responseData = await response.json();
          setResponses(responseData);
          console.log(responseData);
        } else {
          console.error('Erreur lors de la récupération des réponses du gérant.');
        }
      } catch(error){
        console.error('Erreur lors de la récupération des réponses du gérant.', error);
      }
    };

    fetchResponses();
  }, []);

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
        let userType;
          if (isOwner === "true") {
            userType = "owner";
          } else {
            userType = "user";
          }
        const response = await fetch(`${apiUrl}/api/${userType}/profile`, {
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

   //////////////////////////////////////* Gestion de la réponse gérant */////////////////////////////////////////

  const handleContentChange = (noticeId, content) => {
    setContent((prevContent) => ({
      ...prevContent,
      [noticeId]: content,
    }));
    setNoticeId(noticeId);
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/${numericId}/responses/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          content: content[noticeId],
          owner_id: userId.id,
          notice_id: noticeId,
        }),
      });
  
      if (response.ok) {
        console.log('Réponse postée avec succès.');
      } else {
        console.error('Erreur lors l\'envoi de la réponse.');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

   //////////////////////////////////////* Gestion de l'envoi du commentaire */////////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();

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
              <div className="commentUser">
              <h2>{notice.pseudo}</h2>
              <h5>Posté le : {notice.created_at}</h5>
              <p>Note : {notice.rate}/5</p>
              <p>Avis :</p>
              <p>{notice.comment}</p>
              </div>
              <div className="responsesSection">
                  {responses && responses
                  .filter((response) => response.notice_id === notice.id)
                  .map(response => (
                      <div key={response.id}>
                          <h4>Le gérant {response.pseudo} a répondu :</h4><br></br>
                          <p>{response.content}</p><br></br>
                      </div>
                  ))}
              </div>
              {userId.id === details.owner_id  && isOwner === "true" ? (
                <form onSubmit={handleSubmitResponse}>
                  <div className="formNotice">
                  <input name="notice_id" type='hidden' defaultValue={noticeId} />
                  <input name="owner_id" type='hidden' defaultValue={userId.id} />
                  <Box
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "30em" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Votre réponse"
                      name='content'
                      multiline
                      rows={6}
                      value={content[notice.id] || ''}
                      onChange={(e) => handleContentChange(notice.id, e.target.value)}
                    />
                  </Box>
                    <Stack spacing={2} direction="row">
                      <Button type='submit' variant="contained">Répondre</Button>
                    </Stack>
                    {showAlert && (
                    <Alert severity="success">
                      Réponse postée avec succès.
                    </Alert>
                  )}
                  </div>
                </form>
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
