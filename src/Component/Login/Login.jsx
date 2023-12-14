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
import axios from "axios";

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

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const navigateToHome = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
  
      if (response.status === 200) {
        const { token, isOwner } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('isOwner', isOwner);
        setShowAlert(true);
  
        setTimeout(() => {
          navigateToHome();
        }, 1000);
      } else {
        console.error('Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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
            Connexion
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Connexion
            </Button>
            {showAlert && (
              <Alert severity="success">
                Vous êtes connecté, redirection vers l'acceuil
              </Alert>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/register_user"
                  variant="body2"
                  style={{ display: "block" }}
                >
                  Créer un compte membre
                </Link>
                <Link
                  href="/register_owner"
                  variant="body2"
                  style={{ display: "block" }}
                >
                  Créer un compte gérant
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Login;
