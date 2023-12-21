import "./EditProfil.css";
import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function EditProfil() {
  const token = localStorage.getItem("token");
  const isOwner = localStorage.getItem("isOwner");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birth_date: "",
    pseudo: "",
    email: "",
    password: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  let userType;
  if (isOwner === "true") {
    userType = "owner";
  } else {
    userType = "user";
  }

   //////////////////////////////////////* Récupération des informations de l'utilisateur en fonction de son type *//////////////////////////////////

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/api/${userType}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const profileData = await response.json();
          setFormData(profileData);
        } else {
          console.error("Error fetching profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    // insertion de la valeur de l'input dans la colonne correspondante au name de cet input (ex: lastname, firstname, etc...)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //////////////////////////////////////* Gestion de l'envoi des modifications du profil *//////////////////////////////////
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/updateprofil/${userType}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAlert(true);
        setTimeout(() => 
        {navigate("/profil");}, 1500);
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="parentProfil">
        <h1 className="modifierProfil">Modifier mon profil</h1>
        <form className="profileInfo" onSubmit={handleSubmit}>
          <label className="bold" htmlFor="lastname">
            Nom:
          </label>
          <input
            className="inputEditProfil"
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname || ""}
            required
            onChange={handleChange}
          />

          <label className="bold" htmlFor="firstname">
            Prénom:
          </label>
          <input
            className="inputEditProfil"
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname || ""}
            required
            onChange={handleChange}
          />

          <label className="bold" htmlFor="pseudo">
            Pseudo:
          </label>
          <input
            className="inputEditProfil"
            type="text"
            id="pseudo"
            name="pseudo"
            value={formData.pseudo || ""}
            required
            onChange={handleChange}
          />

          <label className="bold" htmlFor="email">
            E-mail:
          </label>
          <input
            className="inputEditProfil"
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            required
            onChange={handleChange}
          />

          <label className="bold" htmlFor="birth_date">
            Date de naissance:
          </label>
          <input
            className="inputEditProfil"
            type="date"
            id="birth_date"
            name="birth_date"
            value={formData.birth_date || ""}
            required
            onChange={handleChange}
          />

          <button className="validate-btn" type="submit">
            Valider
          </button>
          {showAlert && (
            <Alert severity="success">
              Profil modifié avec succès.
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
