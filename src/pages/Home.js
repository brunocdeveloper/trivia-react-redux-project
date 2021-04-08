import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/login';

class Home extends Component {
  render() {
    return (
      <div>
        <Login />
        <button type="button" data-testid="btn-settings">
          <Link to="/configuration">Configurações</Link>
        </button>
      </div>
    );
  }
}

export default Home;
