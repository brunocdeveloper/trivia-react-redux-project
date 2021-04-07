import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.validadeFields = this.validadeFields.bind(this);

    this.state = {
      name: '',
      email: '',
      btnValidadeFields: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validadeFields());
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

  render() {
    const { name, email, btnValidadeFields } = this.state;
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
          onClick=""
          data-testid="btn-play"
        >
          JOGAR
        </button>
      </form>
    );
  }
}

export default Login;
