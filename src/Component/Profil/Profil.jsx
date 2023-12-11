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
                <label for="firstName">Prénom:</label>
                <span id="firstName">John</span>
                
                <label for="lastName">Nom:</label>
                <span id="lastName">Doe</span>
                
                <label for="email">E-mail:</label>
                <span id="email">john.doe@example.com</span>
                
                <label for="password">Mot de passe:</label>
                <span id="password">123456</span>
                
                <label for="username">Pseudo:</label>
                <span id="username">john_doe123</span>
                
                <label for="birthdate">Date de naissance:</label>
                <span id="birthdate">01/01/1990</span>

                <button className="editprofil-btn" onClick={navigateToEditProfil}>Modifier vos données</button>
            </div>

          </div>
          
        </div>
  )
}
