import "./NavBar.css";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBarHome() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isOwner = localStorage.getItem("isOwner");
  const [auth, setAuth] = React.useState(!!token);

  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToHome = () => {
    window.location.href = "/";
  };
  const navigateToProfil = () => {
    navigate("/profil");
  };
  const navigateToCreateCard = () => {
    navigate("/create_card");
  };
  const navigateToRegisterUser = () => {
    navigate("/register_user");
  };
  const navigateToRegisterOwner = () => {
    navigate("/register_owner");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isOwner");
    setAuth(false);
    navigateToHome();
  };

  return (
    <div>
      <nav>
        <div className="navbarhome">
          <div className="container nav-container">
            <input className="checkbox" type="checkbox" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="logo">
              <img
                onClick={navigateToHome}
                className="logoLocal"
                src="https://svgshare.com/i/10Y9.svg"
                alt="Logo"
              />
            </div>
            <div className="menu-items">
              <li>
                <a className="navLink" onClick={navigateToHome}>
                  Accueil
                </a>
              </li>
              {auth && (
                <>
                  <li>
                    <a className="navLink" onClick={navigateToProfil}>
                      Mon Profil
                    </a>
                  </li>
                  {auth && isOwner === "true" && (
                    <li>
                      <a className="navLink" onClick={navigateToCreateCard}>
                        Créer un post
                      </a>
                    </li>
                  )}
                  <li>
                    <a className="navLink" onClick={handleLogout}>
                      Déconnexion
                    </a>
                  </li>
                </>
              )}
              {!auth && (
                <>
                  <li>
                    <a className="navLink" onClick={navigateToLogin}>
                      Connexion
                    </a>
                  </li>
                  <li>
                    <a className="navLink" onClick={navigateToRegisterUser}>
                      Inscription membre
                    </a>
                  </li>
                  <li>
                    <a className="navLink" onClick={navigateToRegisterOwner}>
                      Inscription gérant
                    </a>
                  </li>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
