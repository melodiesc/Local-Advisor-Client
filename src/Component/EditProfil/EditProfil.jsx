import "./EditProfil.css";
import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

export default function EditProfil() {
  const token = localStorage.getItem('token');
  const isOwner = localStorage.getItem('isOwner');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({firstname: '',lastname: '',birth_date: '',pseudo: '',email: '',password: '',});
  const apiUrl = import.meta.env.VITE_API_URL;
  let userType;
  if (isOwner === "true") {
    userType = "owner";
  } else {
    userType = "user";
  }
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/api/${userType}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });

        if (response.ok) {
          const profileData = await response.json();
          setFormData(profileData);
        } else {
          console.error('Error fetching profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/updateprofil/${userType}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/profil');
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="parentProfil">
        <h1>Édition du profil</h1>
        <form className="profileInfo" onSubmit={handleSubmit}>
          <label htmlFor="lastname">Nom:</label>
          <input type="text" id="lastname" name="lastname" value={formData.lastname || ''} required onChange={handleChange}/>
          
          <label htmlFor="firstname">Prénom:</label>
          <input type="text" id="firstname" name="firstname" value={formData.firstname || ''} required onChange={handleChange}/>
      
          <label htmlFor="pseudo">Pseudo:</label>
          <input type="text" id="pseudo" name="pseudo" value={formData.pseudo || ''} required onChange={handleChange}/>

          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" value={formData.email || ''} required onChange={handleChange}/>
          
          <label htmlFor="birth_date">Date de naissance:</label>
          <input type="date" id="birth_date" name="birth_date" value={formData.birth_date || ''} required onChange={handleChange}/>
          
          <button className="validate-btn" type="submit">Valider</button>
        </form>
      </div>
    </div>
  );
}
