import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { AppLoading } from 'expo';
import { View, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Main from './src/Main';

const rootReducer = (state = {}, action) => {
  return state
}

const store = createStore(rootReducer)

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  render() {

    return (
      <Provider store={store}>
        <View>
          <Main />
        </View>
      </Provider>
    );
  }
}