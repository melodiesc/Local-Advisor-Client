import "./Profil.css";
import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function RenderProfil() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    birth_date: "",
    pseudo: "",
    email: "",
    password: "",
  });

  const navigateToEditProfil = () => {
    navigate("/editprofil");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isOwner = JSON.parse(localStorage.getItem("isOwner"));
        const token = localStorage.getItem("token");

        let endpoint = isOwner
          ? `${apiUrl}/api/owner/profile`
          : `${apiUrl}/api/user/profile`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error(
            "Erreur lors de la récupération des données de l'utilisateur"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="parentProfil">
        <h1>Mon Profil</h1>
        <div className="profileInfo" id="profileInfo">
          <label htmlFor="lastName">Nom:</label>
          <span id="lastName">{profileData.lastname}</span>

          <label htmlFor="firstName">Prénom:</label>
          <span id="firstName">{profileData.firstname}</span>

          <label htmlFor="username">Pseudo:</label>
          <span id="username">{profileData.pseudo}</span>

          <label htmlFor="birthdate">Date de naissance:</label>
          <span id="birthdate">{profileData.birth_date}</span>

          <label htmlFor="email">Email:</label>
          <span id="email">{profileData.email}</span>

          {/* <label htmlFor="password">Mot de passe:</label>
          <span id="password">{profileData.password}</span> */}
          <br></br>
          <button className="editprofil-btn" onClick={navigateToEditProfil}>
            Modifier vos données
          </button>
        </div>
      </div>
    </div>
  );
}
