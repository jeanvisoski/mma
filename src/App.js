import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import MotorcycleForm from './components/MotorcycleForm';

function App() {
  

  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/home" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/motorcycle" component={MotorcycleForm}/>
    </BrowserRouter>
  );
}

export default App;
