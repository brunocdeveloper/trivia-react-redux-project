import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectTo: '',
    };

    this.redirecting = this.redirecting.bind(this);
  }

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

  redirecting({ target }) {
    const { name } = target;
    this.setState({
      redirect: true,
      redirectTo: name,
    });
  }

  render() {
    const { redirect, redirectTo } = this.state;
    const localStorageScore = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = localStorageScore;
    const { name, gravatar } = this.props;
    console.log(typeof assertions);
    if (redirect) return <Redirect to={ redirectTo } />;
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
        <button
          name="/"
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirecting }
        >
          Jogar novamente
        </button>
        <button
          name="/ranking"
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirecting }
        >
          Ver Ranking
        </button>
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
