import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import SignupModal from './SignupModal';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Login() {
  const classes = useStyles(); //estilos do Material-UI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const [lembrarUsuario, setLembrarUsuario] = useState(false);
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setError('Email de redefinição de senha enviado');
    } catch (error) {
      setError(error.message);
    }
  };

  const alteraLembrar = e => {
    setLembrarUsuario(!lembrarUsuario);
  };


  useEffect(() => {
    if (email.trim() && password.trim()) {
      setBotaoDesabilitado(false);
    } else {
      setBotaoDesabilitado(true);
    }
  }, [email, password]);

  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const handleSignupLinkClick = () => {
    setSignupModalOpen(true);
  };

  const handleSignupModalClose = () => {
    setSignupModalOpen(false);
  };


  return (


    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Motocando Mundo Afora
        </Typography>

        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={error}
          />
          {error &&
            <Typography variant="body1" color="error" style={{ marginBottom: '1rem' }}>{error}</Typography>}
          <FormControlLabel
            control={
              <Switch
                checked={lembrarUsuario}
                onChange={alteraLembrar}
                name="lembrar"
              />
            }
            label="Lembrar o usuário"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={botaoDesabilitado}
            className={classes.submit}
          >
            Acessar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={handleResetPassword} variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={handleSignupLinkClick} variant="body2">
                {"Ainda não tem uma conta?"}
              </Link>
              {signupModalOpen &&
                <SignupModal open={signupModalOpen} onClose={handleSignupModalClose} onSignup={() => history.push('/home')} />
              }
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );


}

export default Login;

