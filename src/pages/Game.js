import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    const { asks } = this.props;
    return (
      <div>
        <Link to="/">Home</Link>
        <h1>Game</h1>
        {asks.map((item) => (<p key={ item.category }>{item.question}</p>))}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  asks: state.asksReducer.asks,
});

export default connect(mapStateToProps)(Game);
