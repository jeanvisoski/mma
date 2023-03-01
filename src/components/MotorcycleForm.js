import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseImpl } from '../firebase';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@material-ui/core';

const MotorcycleForm = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [motorcycles, setMotorcycles] = useState([]);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    motorcycleId: '',
  });
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = firebaseImpl.auth().onAuthStateChanged((user) => {
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
        const response = await axios.get('http://localhost:8082/http://localhost:8081/api/motorcycles');
        setMotorcycles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMotorcycles();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:8082/http://localhost:8080/api/users/${currentUser.uid}/motorcycles/${formData.motorcycleId}`,
      );
      history.push('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
<div className="container mt-4">
  <h2>Motorcycle Registration</h2>
  <FormControl variant="outlined" fullWidth>
    <InputLabel id="select-motorcycle-label">Select Motorcycle</InputLabel>
    <Select
      labelId="select-motorcycle-label"
      id="select-motorcycle"
      name="motorcycleId"
      value={formData.motorcycleId}
      onChange={handleInputChange}
      label="Select Motorcycle"
      required
    >
      <MenuItem value="">
        <em>Select a motorcycle</em>
      </MenuItem>
      {motorcycles.map((motorcycle) => (
        <MenuItem key={motorcycle.id} value={motorcycle.id}>
          {motorcycle.brand} {motorcycle.model} ({motorcycle.year})
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <Button variant="contained" color="primary" onClick={handleFormSubmit}>
    Submit
  </Button>
</div>
  );
};

export default MotorcycleForm;
