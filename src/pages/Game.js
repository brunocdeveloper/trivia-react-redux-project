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
    };

    this.answer = this.answer.bind(this);
  }

  componentDidMount() {
    // const { fetchingAsks } = this.props;
    // fetchingAsks();
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

  render() {
    const { indexQuestion, loading, asks, answer } = this.state;
    console.log(asks);
    if (loading) return <Loading />;
    return (
      <div>
        <Header />
        <div>
          <p data-testid="question-category">{ asks[indexQuestion].category }</p>
          <p data-testid="question-text">{ asks[indexQuestion].question }</p>
          <button
            type="button"
            data-testid="correct-answer"
            className={ answer ? 'correct' : 'dunno' }
            onClick={ this.answer }
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
