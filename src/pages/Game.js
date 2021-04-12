import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { triviaFetching } from '../redux/actions/index';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../App.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: 0,
      loading: true,
      asks: [],
      answer: false,
    };

    this.answer = this.answer.bind(this);
    this.sumPoints = this.sumPoints.bind(this);
  }

  componentDidMount() {
    this.setAsksState();
  }

  async setAsksState() {
    const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await tokenResponse.json();
    localStorage.setItem('token', token.token);
    const asksResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
    const asks = await asksResponse.json();
    this.setState({
      asks: asks.results,
      loading: false,
    });
  }

  answer() {
    this.setState({
      answer: true,
    });
  }

  sumPoints() {
    const { asks } = this.props;
    const localStorageData = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = localStorageData;
    const { countDown } = this.state;
    const two = 2;
    const three = 3;
    const ten = 10;
    switch (asks.difficulty) {
    case asks.difficulty === 'hard':
      localStorageData.player.score = score + ten + (countDown * three);
      localStorageData.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(localStorageData));
      break;
    case asks.difficulty === 'medium':
      localStorageData.player.score = score + ten + (countDown * two);
      localStorageData.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(localStorageData));
      break;
    default:
      localStorageData.player.score = score + ten + (countDown * 1);
      localStorageData.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(localStorageData));
      break;
    }
  }

  render() {
    const { indexQuestion, loading, asks, answer } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <Header />
        <div>
          <p data-testid="question-category">{asks[indexQuestion].category}</p>
          <p data-testid="question-text">{asks[indexQuestion].question}</p>
          <button
            type="button"
            data-testid="correct-answer"
            className={ answer ? 'correct' : 'dunno' }
            onClick={ () => {
              this.answer();
              this.sumPoints();
            } }
          >
            {asks[indexQuestion].correct_answer}
          </button>
          {asks[indexQuestion].incorrect_answers.map((incorrect, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.answer }
              className={ answer ? 'incorrect' : 'dunno' }
            >
              {incorrect}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  asks: state.asksReducer.asks,
});

Game.propTypes = {
  asks: PropTypes.objectOf('').isRequired,
};

export default connect(mapStateToProps)(Game);
