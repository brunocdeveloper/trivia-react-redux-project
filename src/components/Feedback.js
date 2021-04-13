import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  messageFeedback() {
    const localStorageScore = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = localStorageScore;
    const three = 3;
    if (assertions < three) {
      return (<p data-testid="feedback-text">Podia ser melhor...</p>);
    }
    if (assertions >= three) {
      return (<p data-testid="feedback-text">Mandou bem!</p>);
    }
  }

  render() {
    const localStorageScore = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = localStorageScore;
    const { name, gravatar } = this.props;
    console.log(typeof assertions);
    return (
      <div>
        <img data-testid="header-profile-picture" src={ gravatar } alt="profile" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
        { this.messageFeedback() }
        <p data-testid="feedback-total-score">
          { score }
        </p>
        <p data-testid="feedback-total-question">
          { assertions }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  name: state.loginReducer.name,
  gravatar: state.loginReducer.gravatar,
});

export default connect(mapStateToProps, null)(Feedback);

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
};
