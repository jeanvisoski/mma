import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseImpl } from '../firebase';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [motorcycles, setMotorcycles] = useState([]);
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
        const response = await axios.get(`http://localhost:8082/http://localhost:8081/api/motorcycles/users/${currentUser.uid}`);

        setMotorcycles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser) {
      fetchMotorcycles();
    }
  }, [currentUser]);
  

  return (
    <div>
      <h1>Bem-vindo à página inicial</h1>
      {currentUser && (
        <p>Você está logado como {currentUser.email}</p>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {motorcycles.map((motorcycle) => (
            <tr key={motorcycle.id}>
              <td>{motorcycle.brand}</td>
              <td>{motorcycle.model}</td>
              <td>{motorcycle.year}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
