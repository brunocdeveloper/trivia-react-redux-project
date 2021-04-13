import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLogin, triviaFetching } from '../redux/actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      btnValidadeFields: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnValidadeFields = this.btnValidadeFields.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.btnValidadeFields());
  }

  btnValidadeFields() {
    const { name, email } = this.state;
    const emailValidate = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(email);
    const userValidate = /[0-9a-zA-Z$*&@#]{4}/.test(name);
    if (emailValidate && userValidate) {
      this.setState({
        btnValidadeFields: false,
      });
    } else {
      this.setState({
        btnValidadeFields: true,
      });
    }
  }

  handleClick(name, email) {
    const { dispatchUserLogin, fetchingAsks } = this.props;
    dispatchUserLogin(name, email);
    fetchingAsks();
    this.setState({
      redirect: true,
    });
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    const { name, email, btnValidadeFields, redirect } = this.state;
    if (redirect) {
      return (<Redirect to="/game" />);
    }
    return (
      <form>
        <label htmlFor="inputName">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            id="inputName"
            onChange={ this.handleChange }
            value={ name }
            name="name"
          />
        </label>
        <label htmlFor="inputEmail">
          Email
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="inputEmail"
            onChange={ this.handleChange }
            value={ email }
            name="email"
          />
        </label>
        <button
          type="button"
          disabled={ btnValidadeFields }
          onClick={ () => this.handleClick(name, email) }
          data-testid="btn-play"
        >
          JOGAR
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserLogin: (name, email, gravatar) => (
    dispatch(userLogin(name, email, gravatar))),
  fetchingAsks: () => dispatch(triviaFetching()),
});

Login.propTypes = {
  dispatchUserLogin: PropTypes.func.isRequired,
  fetchingAsks: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
