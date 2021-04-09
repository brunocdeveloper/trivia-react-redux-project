import React from 'react';
import loginReducer from '../redux/reducers/loginReducer';

class Feedback extends React.Component {
  render() {
    return (
      <header>
        <img data-testid="header-profile-picture" alt="" />
        <h1 data-testid="header-player-name">{ loginReducer.name }</h1>
        <h2 data-testid="header-score"></h2>
      </header>
    );
  }
}

export default Feedback;
