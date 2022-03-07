import React, { useState, useEffect } from 'react';
import { useCardContext, setRemainTime } from 'context/card/index';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Timer() {
  const { state, dispatch } = useCardContext();
  const [time, setTime] = useState(
    state.gameLevel.currentStage.timeLimit * 1000
  );
  const [timerInterval, setTimerInterval] = useState(null);

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
      dispatch(setRemainTime(time / 1000));
    }
  };

  useEffect(() => {
    if (state.isInit) {
      setTimerInterval(
        setInterval(() => {
          setTime((time) => time - 10);
        }, 10)
      );
    } else if (!state.isInit && !state.isWinning) {
      setTime(state.gameLevel.currentStage.timeLimit * 1000);
    }
    return stopTimer;
  }, [state.isInit]);

  useEffect(() => {
    if (time <= 0) {
      stopTimer();
      if (!state.isWinning) {
        alert('You lose!!!');
      }
    }
  }, [time]);

  useEffect(() => {
    if (state.isWinning) {
      stopTimer();
    }
  }, [state.isWinning]);

  return (
    <TouchableOpacity style={[styles.moveCount]}>
      <Text style={[styles.textStyle]}>{Math.floor(time / 10) / 100} s</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
  },
  moveCount: {
    marginBottom: 16,
    marginTop: 16,
    width: 150,
    backgroundColor: '#841584',
    alignItems: 'center',
    padding: 10,
  },
});
