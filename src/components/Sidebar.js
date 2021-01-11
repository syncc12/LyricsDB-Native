import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

class Sidebar extends React.Component {

  setPageName = (newPageName) => {
    this.props.pageChange(newPageName);
  }
  
  render() {
    const { pageNames } = this.props;

    return (
      <View style={styles.sidebarFormat}>
        {pageNames.map((e,i) => <ListItem style={styles.listItemFormat} key={i} onPress={(() => this.setPageName(e[0]))} title={e[1]} />)}
      </View>
    );
  }
}

export default Sidebar;

const styles = StyleSheet.create({
  sidebarFormat: {
    position: "absolute",
    height: "100%",
    width: "100%",
    // borderRightWidth: 1,
    // borderRightColor: 'black',
    // borderStyle: 'solid',
    backgroundColor: "#FFF",
    shadowOffset:{  width: 2,  height: 0,  },
    shadowColor: "#000",
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  listItemFormat: {

  }
});