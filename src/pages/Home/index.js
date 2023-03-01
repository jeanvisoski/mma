import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import firebase from '../../firebase';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { CircularProgress } from "@material-ui/core";
import MotorcycleForm from '../../components/MotorcycleForm';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menu: {
    background: '#ffde59',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  imageContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '250px',
    height: '250px',
    marginBottom: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [motorcycles, setMotorcycles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        history.push('/login');
      }
    });
    return unsubscribe;
  }, [history]);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/http://localhost:8081/api/motorcycles/users/${currentUser.uid}`);
        setMotorcycles(response.data);
      } catch (error) {
        console.error(error);
        setShowForm(true);
      }
    };
    if (motorcycles.length === 0) {
      setShowForm(true);
    }
    if (currentUser) {
      fetchMotorcycles();
    }
    
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuItemClick = (route) => {
    history.push(`/${route}`);
    setIsDrawerOpen(false);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, route: '' },
    { text: 'Piloto', icon: <PersonIcon />, route: 'piloto' },
    { text: 'Moto', icon: <MotorcycleIcon />, route: 'moto' },
    { text: 'Viagem', icon: <FlightTakeoffIcon />, route: 'viagem' },
  ];

  const renderMotorcycleForm = () => {
    if (showForm && motorcycles.length === 0) {
      return <MotorcycleForm />;
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.menu}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleToggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           Motocando Mundo Afora
          </Typography>
          {currentUser &&
            <div>
              <Button color="inherit" onClick={handleLogout}>Sair</Button>
            </div>
          }
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={() => setIsDrawerOpen(false)}
          onKeyDown={() => setIsDrawerOpen(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={() => handleMenuItemClick(item.route)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <Grid className={classes.imageContainer} container spacing={3}>
        {motorcycles.map((motorcycle) => (
          <Grid  item xs={12} md={6} lg={4} key={motorcycle.id}>
            <div className={classes.imageContainer}>
            <Avatar
              className={classes.image}
              src={motorcycles[0].imageUrl}
              alt="Descrição da imagem"
            />
              <Typography variant="h5">{motorcycle.brand} {motorcycle.model} {motorcycle.year}</Typography>
            </div>
          </Grid>
        ))}
        {renderMotorcycleForm()}
      </Grid>
      
    </div>
  );
}

export default Home;
