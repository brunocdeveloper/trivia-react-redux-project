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
      redirect: false,
    };

    this.answer = this.answer.bind(this);
    this.timer = this.timer.bind(this);
    this.counter = this.counter.bind(this);
    this.nextAsk = this.nextAsk.bind(this);
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

  nextButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextAsk }
      >
        próxima pergunta
      </button>);
  }

  nextAsk() {
    const { asks, indexQuestion } = this.state;
    this.setState((state) => ({
      indexQuestion: state.indexQuestion + 1,
      answer: false,
      countDown: 30,
      disable: false,
    }));
    if (asks.length - 1 === indexQuestion) {
      this.setState({ redirect: true });
    }
  }

  render() {
    const { indexQuestion,
      loading, asks, answer, countDown, disable, redirect } = this.state;
    if (loading) return <Loading />;
    if (redirect) return <br />;
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
        {(answer || disable) && this.nextButton()}
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
