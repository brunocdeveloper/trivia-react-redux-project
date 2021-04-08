import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Configuration extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="settings-title">Configurações</h2>
        <button type="button">
          <Link to="/">Home</Link>
        </button>
        <button type="button">
          <Link to="/game">Jogar</Link>
        </button>
      </div>

    );
  }
}

export default Configuration;
