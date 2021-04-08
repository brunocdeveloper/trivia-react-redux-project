import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Game from './pages/Game';
import Configuration from './pages/Configuration';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/configuration" component={ Configuration } />
          <Route path="/game" component={ Game } />
        </Switch>
      </header>
    </div>
  );
}
