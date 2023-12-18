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
} from "@mui/material";

function EditCreateCard({ isEditMode, cardData }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      setFormData(cardData);
      // Chargez l'image si disponible
    }
  }, [isEditMode, cardData]);

  const handleChange = (e) => {
    // Gestion des changements dans les champs du formulaire
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logique pour envoyer les données à l'API
  };

  // Structure du formulaire (similaire à CreateCard)

  return (
    <div>
      <NavBar />
      {/* Composants UI */}
    </div>
  );
}

export default EditCreateCard;
