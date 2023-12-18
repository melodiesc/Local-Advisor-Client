import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import "./RegisterOwner.css";

const navigateToHome = () => {
  window.location.href = "/";
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Local Advisor
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Register() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showPseudo, setShowPseudo] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const apiUrl = import.meta.env.VITE_API_URL;
    const isFormValid = () =>
      [
        "firstname",
        "lastname",
        "pseudo",
        "birth_date",
        "email",
        "password",
      ].every((input) => data.get(input));

    if (!isFormValid()) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return;
    }

    const response = await fetch(`${apiUrl}/api/register_owner`, {
      method: "POST",
      body: data,
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error(`Erreur`);
    } else {
      if (responseData.status === "false") {
        if (responseData.data.pseudo) {
          setShowPseudo(true);
        }
        if (responseData.data.email) {
          setShowEmail(true);
        }

        setTimeout(() => {
          setShowPseudo(false);
          setShowEmail(false);
        }, 3000);
      } else {
        setShowPseudo(false);
        setShowEmail(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigateToLogin();
        }, 1000);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "#1976d2", "&:hover": { cursor: "pointer" } }}
            onClick={navigateToHome}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription Gérant
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="pseudo"
                  required
                  fullWidth
                  id="pseudo"
                  label="Pseudo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <span className="labelDate">Date de naissance :</span>
                <TextField
                  required
                  fullWidth
                  name="birth_date"
                  type="date"
                  id="birth_date"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Inscription
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Vous avez déjà un compte ? Connectez-vous
                </Link>
              </Grid>
            </Grid>
            {showAlert && (
              <Alert severity="success">
                Création de compte réussie, redirection vers la page de
                connexion
              </Alert>
            )}{" "}
            {showPseudo && (
              <Alert severity="warning">Ce pseudo existe déjà !</Alert>
            )}{" "}
            {showEmail && (
              <Alert severity="warning">Cet email existe déjà !</Alert>
            )}{" "}
            {showMessage && (
              <Alert severity="warning">
                Veuillez remplir tous les champs !
              </Alert>
            )}{" "}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Register;
