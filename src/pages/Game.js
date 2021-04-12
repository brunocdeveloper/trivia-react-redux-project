import React, { Component } from 'react';
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
      countDown: 30,
      disable: false,
    };

    this.answer = this.answer.bind(this);
    this.timer = this.timer.bind(this);
    this.counter = this.counter.bind(this);
  }

  componentDidMount() {
    // const { fetchingAsks } = this.props;
    // fetchingAsks();
    this.setAsksState();
    this.counter();
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
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

  counter() {
    const oneSecond = 1000;
    this.timeInterval = setInterval(this.timer, oneSecond);
  }

  timer() {
    const { countDown } = this.state;
    if (countDown <= 0) {
      this.setState({
        countDown: 0,
      });
    } else {
      this.setState((state) => ({
        countDown: state.countDown - 1,
      }));
    }
    if (countDown === 0) {
      this.setState({
        answer: 'incorrect',
        disable: true,
      });
    }
  }

  answer() {
    this.setState({
      answer: true,
    });
  }

  render() {
    const { indexQuestion, loading, asks, answer, countDown, disable } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <Header />
        <p>{countDown}</p>
        <div>
          <p data-testid="question-category">{ asks[indexQuestion].category }</p>
          <p data-testid="question-text">{ asks[indexQuestion].question }</p>
          <button
            type="button"
            data-testid="correct-answer"
            className={ answer ? 'correct' : 'dunno' }
            onClick={ this.answer }
            disabled={ disable }
          >
            { asks[indexQuestion].correct_answer }
          </button>
          { asks[indexQuestion].incorrect_answers.map((incorrect, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.answer }
              className={ answer ? 'incorrect' : 'dunno' }
              disabled={ disable }
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
  // fetchingAsks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
