/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-undef */
import React from 'react';
// import {SafeAreaView, Text, View} from 'react-native';
import {View, Text, SafeAreaView} from 'react-native';
import Timer from './timer.js';
import Buttons from './buttons.js';
import ProgressBar from './progress.js';
import data from '../data.js';
import styles from '../styles.js';

class MultiPlayerGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      connected: false,
      isPlayerOne: props.isPlayerOne,
      playerOnesTurn: true,
      playerOneScore: 0,
      playerTwoScore: 0,
      received: {},
      counter: 1,
      question: 1,
      randomIndex: 0,
      photo: {},
      timer: 0,
      disabledHalf: false,
    };
    this.socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/game/${props.gameCode}/`,
    );
    this.socket.onopen = () => {
      this.setState({connected: true});
    };
    this.emit = this.emit.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  emit() {
    if (this.state.connected) {
      this.socket.send('It worked!');
      this.setState(prevState => ({open: !prevState.open}));
    }
  }

  componentDidMount() {
    // this.socket.onopen = () =>
    //   this.socket.send(
    //     JSON.stringify({type: 'message', payload: 'Hello Mr. Server!'}),
    //   );
    // this.socket.onmessage = ({data}) => console.log(data);
  }

  selectAnswer(correct) {
    if (correct && this.state.isPlayerOne) {
      this.setState({
        playerOneScore: this.state.playerOneScore + 1,
      });
    } else if (correct && !this.state.isPlayerOne) {
      this.setState({
        playerTwoScore: this.state.playerTwoScore + 1,
      });
    }
    this.nextQuestion();
  }

  nextQuestion() {
    // write a send for every 5 questions
    this.setState({
      counter: this.state.counter + 1,
      question: this.state.question + 1,
      randomIndex: Math.floor(Math.random() * 4),
      timer: this.state.timer + 1,
    });
  }
  render() {
    if (
      (this.state.isPlayerOne && this.state.playerOnesTurn) ||
      (!this.state.isPlayerOne && !this.state.playerOnesTurn)
    ) {
      return (
        <SafeAreaView style={styles.notches}>
          <Text style={styles.title}>Joey not Joey</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{margin: 15, alignItems:'center'}}>
              <Text>Player 1: {this.props.playerOne}</Text>
              <Text>{this.state.playerOneScore}</Text>
            </View>
            <View style={{margin: 15, alignItems:'center'}}>
              <Text>Player 2: {this.props.playerTwo}</Text>
              <Text>{this.state.playerTwoScore}</Text>
            </View>
          </View>
          <Timer
            overallStyle={styles.container}
            time={styles.remainingTime}
            reset={this.state.timer}
            timesUp={this.nextQuestion}
          />
          <Buttons
            containerButtons={styles.containerButtons}
            buttonCouplet={styles.buttonCouplet}
            button={styles.buttonStyle}
            buttonIcon={styles.buttonImageIconStyle}
            greyedOut={styles.greyedOut}
            images={data[this.state.question - 1]}
            randomIndex={this.state.randomIndex}
            selectAnswer={this.selectAnswer}
            omitHalf={this.state.disableHalf}
          />
          <View style={styles.bottomBar}>
            <ProgressBar
              pBarStyling={styles.progressBar}
              progress={this.state.counter}
            />
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView>
          <View>
            <Text> its not your turn</Text>
          </View>
        </SafeAreaView>
      );
    }
  }
}

export default MultiPlayerGame;