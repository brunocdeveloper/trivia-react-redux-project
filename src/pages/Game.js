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
        {asks.map((ask, index) => (
          <div key={ index }>
            <p data-testid="question-category">{ ask.category }</p>
            <p data-testid="question-text">{ ask.question }</p>
            <button
              type="button"
              data-testid="correct-answer"
            >
              { ask.correct_answer }
            </button>
            {ask.incorrect_answers.map((incorrect) => (
              <button
                key={ incorrect }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                { incorrect }
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  asks: state.asksReducer.asks,
});

Game.propTypes = {
  asks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Game);
