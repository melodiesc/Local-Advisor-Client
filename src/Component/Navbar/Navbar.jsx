import "./NavBar.css";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  // const [auth, setAuth] = React.useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToHome = () => {
    window.location.href = "/";
  };
  const navigateToProfil = () => {
    navigate("/profil");
  };
  const navigateToCard = () => {
    navigate("/post");
  };
  const navigateToRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigateToHome();
  };
  return (
    <div>
      <nav>
            <div className="navbar">
                <div className="container nav-container">
                    <input className="checkbox" type="checkbox" />
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                    <div className="logo">
                    <img className="logoLocal" src="https://svgshare.com/i/10Y9.svg" alt="Logo" />
                    </div>
                    <div className="menu-items">
                        <li><a className="navLink" onClick={navigateToHome}>Accueil</a></li>
                        <li><a className="navLink" onClick={navigateToProfil}>Mon Profil</a></li>
                        <li><a className="navLink" onClick={navigateToCard}>Créer un post</a></li>
                        <li><a className="navLink" onClick={navigateToLogin}>Connexion</a></li>
                        <li><a className="navLink" onClick={navigateToRegister}>Inscription</a></li>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  );
}
