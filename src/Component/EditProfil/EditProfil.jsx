import "../NavBar/NavBar.css";
import "./EditProfil.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

export default function editProfil() {

  const navigateToProfil = () => {
    navigate("/profil");
  };

  return (
  <div>
    <NavBar/>
    <div className="parentProfil">
      <h1>Édition du profil</h1>
        
        <form className="profileInfo" id="profileForm">
     
          <label htmlFor="lastName">Nom:</label>
          <input type="text" id="lastName" name="lastName" required/>
          
          <label htmlFor="firstName">Prénom:</label>
          <input type="text" id="firstName" name="firstName" required/>
      
          <label htmlFor="username">Pseudo:</label>
          <input type="text" id="username" name="username" required/>

          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required/>
          
          <label htmlFor="birthdate">Date de naissance:</label>
          <input type="date" id="birthdate" name="birthdate" required/>
          
          <button className="validate-btn" onClick={navigateToProfil} type="submit">Valider</button>
        </form>
      </div>
  </div>
  );
}
