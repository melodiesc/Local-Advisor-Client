import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  Grid,
  Input,
  CardMedia,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import "./EditCard.css";

export default function EditCard({ isEditMode, cardData }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    owner_id: "",
    name: "",
    address: "",
    zip_code: "",
    city: "",
    category_id: "",
    description: "",
    image_path: "",
    // Ajoutez d'autres champs si nécessaire
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEditMode && cardData) {
      setFormData({
        ...cardData,
        image_path: "", // Réinitialiser le chemin de l'image si vous ne l'envoyez pas à nouveau
      });
      // Si cardData contient une URL d'image, définissez-la comme imagePreview
      if (cardData.image_path) {
        setImagePreview(cardData.image_path);
      }
    }
  }, [isEditMode, cardData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image_path" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, image_path: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      // Exécutez un appel de réseau asynchrone à l'intérieur d'un bloc try pour gérer les exceptions.
      const response = await fetch(
        `http://localhost:8000/api/${formData.id}/editcard`,
        {
          method: "PUT",
          headers: {
            // Ajoutez un en-tête d'autorisation avec le token JWT récupéré du stockage local.
            // C'est nécessaire pour l'authentification et l'autorisation côté serveur.
            Authorization: `Bearer ${token}`,
          },
          body: data, // Les données du formulaire (y compris l'image) sont envoyées sous forme de FormData.
        }
      );

      if (response.ok) {
        console.log("Opération réussie");
        navigate("/");
      } else {
        console.error("Erreur lors de l'opération");
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
            Modifier
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            encType="multipart/form-data"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {
                  <a
                    required
                    fullWidth
                    id="owner_id"
                    name="owner_id"
                    type="hidden"
                    // value={ownerId.id}
                    onChange={handleChange}
                  />
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Nom du Lieu"
                  name="name"
                  value={formData.name}
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
                  value={formData.address}
                  autoComplete="address"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="zip_code"
                  label="Code Postal"
                  name="zip_code"
                  value={formData.zip_code}
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
                  value={formData.city}
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
                  value={formData.description}
                  multiline
                  rows={4}
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <InputLabel htmlFor="image_path">Photo du Lieu</InputLabel>
                <Input
                  id="image_path"
                  name="image_path"
                  value={formData.image_path}
                  type="file"
                  onChange={handleChange}
                />
                {imagePreview && (
                  <CardMedia
                    component="img"
                    image={imagePreview}
                    alt="Aperçu de l'image sélectionnée"
                  />
                )}
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Modifier les données
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
