import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import "./CreateCard.css";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Input,
  CardMedia,
} from "@mui/material";

function CreateCard({}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [ownerId, setOwnerId] = useState({ id: "" });
  const [formData, setFormData] = useState({
    owner_id: "",
    name: "",
    address: "",
    zip_code: "",
    city: "",
    category_id: "",
    description: "",
    image_path: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  //////////////////////////////////////* Récupération des informations du gérant */////////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${apiUrl}/api/owner/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOwnerId(data.id);
          // Mise à jour de l'état du formulaire 
          // prevState conserve les anciennes valeurs de l'objet
          setFormData((prevState) => ({
          //...prevState copie les nouvelles valeur de l'objet tout en conservant les anciennes
            ...prevState,
          // on assigne à owner_id la valeur de id obtenue dans la variable data
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

  // insertions des données de l'image dans formData, et récupération des données de l'image pour la preview
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
    if (name === "image_path" && files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

   //////////////////////////////////////* Gestion de l'envoi du formulaire de création du lieu  */////////////////////////////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();
    // création du nouvel objet FormData
    const data = new FormData();
    // récupère un tableau contenant les clés de l'objet FormData
    Object.keys(formData).forEach((key) => {
      // pour chaque clé -> la clé et la valeur de l'objet sont ajoutés à data
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${apiUrl}/api/create_card`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        console.log("Lieu créé avec succès");
        navigate("/");
      } else {
        console.error("Erreur lors de la création du lieu");
      }
    } catch (error) {
      console.error("Erreur", error);
    }
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
          Créer un Lieu
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          encType="multipart/form-data"
        >
          <Grid container spacing={2}>
              <input
                required
                id="owner_id"
                name="owner_id"
                type="hidden"
                value={ownerId.id}
                onChange={handleChange}></input>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Nom du Lieu"
                name="name"
                autoComplete="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="address"
                label="Adresse"
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
                  value={formData.category_id}
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
                name="description"
                multiline
                rows={4}
                onChange={handleChange}
              />
            </Grid>
                                                                {/* Ajout de la photo */}
            <Grid item xs={12}>
              <InputLabel htmlFor="image_path">Photo du Lieu</InputLabel>
              <Input
                id="image_path"
                name="image_path"
                type="file"
                onChange={handleChange}
              /><br></br><br></br>
              <p>Attention le poids de la photo ne doit pas dépasser les 2Mo.</p>
              {imagePreview && (
                <CardMedia
                  component="img"
                  image={imagePreview}
                  alt="Aperçu de l'image sélectionnée"
                />
              )}
            </Grid>
          </Grid>
          <Button
            className="create-btn"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, }}
          >
            Créer
          </Button>
        </Box>
      </Box>
    </Container>
    </div>
  );
}
export default CreateCard;
