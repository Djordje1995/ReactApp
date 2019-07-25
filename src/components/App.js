import React from 'react';
import HomePage from './HomePage';
import Login from './Login';
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Route path="/" exact component={Login} />
    <Route path="/homePage" component={HomePage} />
    </>
  );
}

export default App;
