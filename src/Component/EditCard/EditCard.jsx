import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect } from "react";
import { IonIcon } from '@ionic/react';
import { useNavigate } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import {Box,Button,Container,TextField,Typography,InputLabel,Select,MenuItem,FormControl,Grid,} from "@mui/material";

function CreateCard() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id, 10);
  const [ownerId, setOwnerId] = useState("");
  const [details, setDetails] = useState(null);
  const [formData, setFormData] = useState(null);
  const [userId, setUserId] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const navigateToLocation = () => {
    navigate(`/${numericId}`);
  };
   //////////////////////////////////////* Récupération des données du lieu */////////////////////////////////////////

   useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/${numericId}`);
        if (response.ok) {
          const data = await response.json();
          setDetails(data);
          setFormData({
            owner_id: data.owner_id,
            name: data.name,
            address: data.address,
            zip_code: data.zip_code,
            city: data.city,
            category_id: data.category_id,
            description: data.description,
          });
        } else {
          throw new Error(
            "Une erreur est survenue lors de la récupération des données"
          );
        }
      } catch (error) {
        console.error("Erreur:", error);
        setError(error.message);
      } 
    };
    fetchDetails();
  }, [numericId]);
  

  //////////////////////////////////////* Récupération des données utilisateurs */////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/api/owner/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOwnerId(data.id);
          setUserId((prevState) => ({
            ...prevState,
            owner_id: data.id,
          }));
        } else {
          console.error("Error fetching profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchData();
  }, []);

  //////////////////////////////////////* Gestion de l'envoie des données du formulaire */////////////////////////////////////////

  const handleLocationUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/api/locations/${numericId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          owner_id: ownerId,
          name: formData.name,
          address: formData.address,
          zip_code: formData.zip_code,
          city: formData.city,
          category_id: formData.category_id,
          description: formData.description,
        }),
      });

      if (response.ok) {
        console.log('Location mise à jour avec succès.');
        setShowAlert(true);
        setTimeout(() => {
          navigateToLocation()
        }, 1500);
      } else {
        console.error('Erreur lors de la mise à jour de la location.');
      }
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Mise à jour de l'état du formulaire 
    // prevState conserve les anciennes valeurs de l'objet
    setFormData((prevState) => ({
      //...prevState copie les nouvelles valeur de l'objet tout en conservant les anciennes
      ...prevState,
      // on assigne à name la valeur de value
      [name]: value,
    }));
  };

  return (
    <div>
      <NavBar />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Modification du lieu
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleLocationUpdate}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Nom du Lieu"
                  value={formData ? formData.name : ''}
                  name="name"
                  autoComplete="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Adresse"
                  value={formData ? formData.address : ''}
                  name="address"
                  autoComplete="address"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="zip_code"
                  label="Code Postal"
                  value={formData ? formData.zip_code : ''}
                  name="zip_code"
                  autoComplete="zip_code"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="city"
                label="Ville"
                value={formData ? formData.city : ''}
                name="city"
                autoComplete="city"
                onChange={handleChange}
              />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Catégorie</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category_id"
                    name="category_id"
                    value={formData ? formData.category_id : ''}
                    label="Catégorie"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Hôtel</MenuItem>
                    <MenuItem value={2}>Bar</MenuItem>
                    <MenuItem value={3}>Restaurant</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  value={formData ? formData.description : ''}
                  name="description"
                  multiline
                  rows={4}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Modifier<IonIcon />
            </Button>
            {showAlert && (
            <Alert severity="success">
              Succès de la modification.
            </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default CreateCard;
