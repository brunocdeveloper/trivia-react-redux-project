import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { asks } = this.props;
    return (
      <div>
        <Header />
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
