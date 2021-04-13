import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.emailConverter = this.emailConverter.bind(this);
  }

  emailConverter() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    return gravatar;
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <img
          src={ this.emailConverter() }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{ name }</h1>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  name: state.loginReducer.name,
});

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
