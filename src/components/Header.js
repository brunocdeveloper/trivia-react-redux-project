import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { userLogin } from '../redux/actions/index';

class Header extends Component {
  constructor(props) {
    super(props);

    this.emailConverter = this.emailConverter.bind(this);
  }

  emailConverter() {
    const { name, email, dispatchUserGravatar } = this.props;
    const hash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    dispatchUserGravatar(name, email, gravatar);
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
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  name: state.loginReducer.name,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUserGravatar: (name, email, gravatar) => (
    dispatch(userLogin(name, email, gravatar))),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dispatchUserGravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
