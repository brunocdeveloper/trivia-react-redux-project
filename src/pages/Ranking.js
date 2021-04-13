import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.redirecting = this.redirecting.bind(this);
  }

  redirecting() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/" />;
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking</h3>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirecting }
        >
          Voltar ao início
        </button>
      </div>
    );
  }
}
export default Ranking;
