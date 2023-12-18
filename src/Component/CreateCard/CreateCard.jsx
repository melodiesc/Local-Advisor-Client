import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/api/owner/profile",
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
          setOwnerId(data.id); // Assurez-vous que data contient l'ID du propriétaire
          setFormData((prevState) => ({
            ...prevState,
            owner_id: data.id, // Mettez à jour owner_id dans formData avec l'ID du propriétaire
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:8000/api/create_card", {
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
                label="Rue"
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
            <Grid item xs={12}>
              <InputLabel htmlFor="image_path">Photo du Lieu</InputLabel>
              <Input
                id="image_path"
                name="image_path"
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
    </div>
  );
}
export default CreateCard;
