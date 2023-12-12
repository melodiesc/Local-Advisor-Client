import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function CreateCard({ userId }) {
  const [formData, setFormData] = useState({
    name: "",
    streetNumber: "",
    street: "",
    postalCode: "",
    city: "",
    category: "",
    description: "",
    photo: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
    if (name === "photo" && files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Ajouter le user_id en hidden
    data.append("user_id", userId);

    try {
      const response = await fetch("http://localhost:8000/api/create_card", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        console.log("Lieu créé avec succès");
      } else {
        console.error("Erreur lors de la création du lieu");
      }
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  return (
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
                id="streetNumber"
                label="Numéro de Rue"
                name="streetNumber"
                autoComplete="street-number"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="street"
                label="Rue"
                name="street"
                autoComplete="street"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="zip_ode"
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Catégorie</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formData.category}
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
            <Grid item xs={12}>
              <InputLabel htmlFor="photo">Photo du Lieu</InputLabel>
              <Input
                id="photo"
                name="photo"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Créer
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default CreateCard;
