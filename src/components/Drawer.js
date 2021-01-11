import React from 'react';
import { View } from 'react-native';
import SideBar from './SideBar';

class Drawer extends React.Component {

  render() {
    const { visible } = this.props;

    return (
      <View>
        {visible && <SideBar />}
      </View>
    );
  }
}

export default Drawer;