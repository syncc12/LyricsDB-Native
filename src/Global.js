import React from 'react';
import { View, Text } from 'native-base';

export let globalState = {
  global: {}
};

export function setGlobalState(stateJSON) {
  <Global setGlobalState={stateJSON}/>;
}

export class Global extends React.Component {

  constructor() {
    super();
    this.state = {
      global: {}
    };
  }

  gStateSet = () => {
    for (let i of Object.entries(this.props.setGlobalState)) {
      globalState['global'][i[0]] = i[1];
    }
    let newGlobalState = [];
    for (let e of Object.entries(this.props.setGlobalState)) {
      let newJSON = {};
      newJSON[e[0]] = e[1];
      newGlobalState.push(newJSON);
    }
    this.setState(prevState => ({global: {...prevState.global, ...newGlobalState.map((e,i) => e ) }} ));
  }

  componentDidMount() {
    this.gStateSet();
  }

  render() {

    return (
      <></>
    );
  }
}