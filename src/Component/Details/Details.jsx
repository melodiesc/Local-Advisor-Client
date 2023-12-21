import "./Details.css";
import NavBar from "../NavBar/NavBar";
import { IonIcon } from '@ionic/react';
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import { trash, send, create } from 'ionicons/icons';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ConfirmAlert from '../ConfirmAlert/ConfirmAlert';
import {Container,Typography,Box,CardMedia,CircularProgress,TextField,Button,Stack,Rating,} from "@mui/material";

function Details() {
  // id utilisé pour récupérer les données dans la tables locations (format string)
  const { id } = useParams();
  // passage de id de string en INT
  const numericId = parseInt(id, 10);
  const navigate = useNavigate();
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
  const [showAlertResponse, setShowAlertResponse] = useState(false);
  const [showAlertDestroy, setShowAlertDestroy] = useState(false);
  const [notices, setNotices] = useState([]);
  const [responses, setResponses] = useState([]);
  const [content, setContent] = useState([]);
  const [noticeId, setNoticeId] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const navigateToHome = () => {window.location.href = "/";};
  const navigateToEditCard = () => {navigate(`/update/${numericId}`);};

  //////////////////////////////////////* Récupération des réponses du gérant */////////////////////////////////////////

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/${id}/responses/show`);
        if (response.ok) {
          const responseData = await response.json();
          setResponses(responseData);
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
          
        // On additionne les notes récupérées dans le tableau
        const totalRating = data.data.reduce((sum, notice) => sum + notice.rate, 0);
        // On récupère le nombre total de notes dans le tableau
        const countRating = data.data.length;
        // Si il y a des notes alors on divise le total des notes par le nombre de total de note, sinon on affiche zéro
        const average = countRating > 0 ? totalRating / countRating : 0;
        // On insert la valeur de la variable average dans la variable AverageRating
        setAverageRating(average);

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
    // Mise à jour de l'état du formulaire 
    // prevContent conserve les anciennes valeurs de l'objet
    setContent((prevContent) => ({
    //...prevContent copie les nouvelles valeur de l'objet tout en conservant les anciennes
      ...prevContent,
    // met à jour content en fonction de noticeId (pour être sûr que la réponse ne soit postée que sur ce commentaire)
      [noticeId]: content,
    }));
    setNoticeId(noticeId);
  };

   //////////////////////////////////////* Gestion de l'envoie de la réponse du gérant */////////////////////////////////////////

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
        setShowAlertResponse(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
      } else {
        console.error('Erreur lors l\'envoi de la réponse.');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

   //////////////////////////////////////* Gestion de l'envoi du commentaire d'un membre */////////////////////////////////////////

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

  //////////////////////////////////////* Gestion de la suppression du lieu par le gérant */////////////////////////////////////////

  // lors du clique sur le bouton supprimer ouverture de la pop-up de confirmation
  const handleSubmitDestroy = async (e) => {
    e.preventDefault();
    setShowConfirmAlert(true);
  };

  // dans la pop-op si "confirmer" est cliqué -> déclenchement de la fonction destroy et redirection vers l'accueil
  const handleConfirmDestroy = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${apiUrl}/api/locations/${numericId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        if (response.ok) {
            console.log('Lieu supprimé avec succès');
            setShowConfirmAlert(false);
            setShowAlertDestroy(true);
            setTimeout(() => {
              navigateToHome();
            }, 1500);
        } else {
            console.error('Erreur lors de la suppression du lieu');
        }
    } catch (error) {
        console.error('Erreur', error);
    }
  };

  // dans la pop-up si "annuler" est cliqué ou si clique dans le vide -> fermeture de la pop-up, pas de lancement de la fonction destroy
  const handleCancelDestroy = () => {
    setShowConfirmAlert(false);
  };

  return (
    <div>
      <NavBar />
      <div className="center">
        <div className="parentDetails">
          <div className="details">
            <Container component="main" maxWidth="md">
                                          {/* Si showAlert === "true" alors on affiche le message */}
                {showAlertDestroy &&  (
                <Alert severity="success">
                  Lieu supprimé avec succès. Redirection vers la page d'accueil.
                </Alert>
                )}
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
                  <p className="rate">
                    {!details.rate ? (
                      <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                    <Typography component="legend">Note moyenne :</Typography>
                    <Rating
                      precision={0.5}
                      name="simple-controlled"
                      value={averageRating}
                      readOnly
                    />
                  </Box> ) : "Non spécifié"}
                  </p>
                  <p className="description">{details.description}</p>
                            {/* Vérification de l'identité du gérant pour lui permettre de suppr et modif le lieu */}
                  {userId.id === details.owner_id  && isOwner === "true" ? (
                    <div className="destroy">
                    <form onSubmit={handleSubmitDestroy}>
                      <Stack spacing={2} direction="row">
                        <Button type='submit' variant="contained" className="icon-destroy-location"><IonIcon icon={trash}/></Button>
                      </Stack>
                    </form>
                      <Stack spacing={2} direction="row">
                        <Button type='submit' variant="contained" className="icon-update-location" onClick={navigateToEditCard}><IonIcon icon={create}/></Button>
                      </Stack>
                    <ConfirmAlert
                      open={showConfirmAlert}
                      onClose={handleCancelDestroy}
                      onConfirm={handleConfirmDestroy}
                      title="Confirmation de suppression"
                      content="Êtes-vous sûr de vouloir supprimer ce lieu ?"
                    />
                    </div>
                  ) : "" }
                                                {/* Vérification si l'utilisateur est bien un membre */}
                {isOwner === "false" ? (
                <form onSubmit={handleSubmit}>
                  <div className="formNotice">
                  <input name="numericId" type='hidden' defaultValue={numericId} />
                  <input name="user_id" type='hidden' defaultValue={userId.id} />
                  <Box
                    >
                    <Typography component="legend" >Note :
                    <Rating
                      precision={0.5}
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
                    <Button type='submit' variant="contained"><IonIcon className="icon-filter-search" icon={send} /></Button>
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
              <Box>
                <Typography>Note :
                <Rating
                  value={notice.rate}
                  readOnly 
                />
                </Typography>
              </Box>
              <h4>Avis :</h4>
              <p>{notice.comment}</p>
              </div>
              <div className="responsesSection">
                  {responses && responses
                  .filter((response) => response.notice_id === notice.id)
                  .map(response => (
                      <div key={response.id}>
                          <h4>Le/La gérant(e) {response.pseudo} a répondu :</h4><br></br>
                          <p>{response.content}</p><br></br>
                      </div>
                  ))}
              </div>
                                {/* Vérification de l'identité du gérant pour lui permettre de répondre à un commentaire */}
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
                      <Button type='submit' variant="contained"><IonIcon className="icon-filter-search" icon={send} /></Button>
                    </Stack>
                    {showAlertResponse && (
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
