import "../NavBar/NavBar.css";
import "./Profil.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function renderProfil () {
  const navigate = useNavigate();

  const navigateToEditProfil = () => {
    navigate("/editprofil");
  };

  return (
        <div>
          <NavBar />
        <div className="parentProfil">
          
          <h1>Mon Profil</h1>
        
            <div className="profileInfo" id="profileInfo">
                
            <label htmlFor="firstName">Prénom:</label>
            <span id="firstName">John</span>

            <label htmlFor="lastName">Nom:</label>
            <span id="lastName">Doe</span>

            <label htmlFor="email">E-mail:</label>
            <span id="email">john.doe@example.com</span>

            <label htmlFor="password">Mot de passe:</label>
            <span id="password">123456</span>

            <label htmlFor="username">Pseudo:</label>
            <span id="username">john_doe123</span>

            <label htmlFor="birthdate">Date de naissance:</label>
            <span id="birthdate">01/01/1990</span>

                <button className="editprofil-btn" onClick={navigateToEditProfil}>Modifier vos données</button>
            </div>

          </div>
          
        </div>
  )
}
