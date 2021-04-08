import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

Game.propTypes = {
  asks: PropTypes.arrayOf('').isRequired,
};

export default connect(mapStateToProps)(Game);
