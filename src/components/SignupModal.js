import React, { useState } from 'react';
import { Modal, TextField, Button, Typography } from '@material-ui/core';
import firebase from '../firebase';

import { makeStyles } from "@material-ui/core/styles";

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999,
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

function SignupModal(props) {
  const classes = useStyles(); //estilos do Material-UI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      // Cria usuário no Firebase
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Cria usuário no backend
      const response = await fetch('http://localhost:8082/http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userCredential.user.uid,
          email: userCredential.user.email
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create user on backend');
      }

      // Chama a função onSignup passada como propriedade
      props.onSignup();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal
    style={modalStyle}
     open={props.open} onClose={props.onClose}
     className={classes.modal}>
       
      <div className={classes.paper}>
        <form onSubmit={handleSignup} className={classes.form}>
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
          <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
            Criar Conta
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default SignupModal;
