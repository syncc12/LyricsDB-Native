import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

class Home extends React.Component {

  render() {
    const cardDeck = ['Artists','Add Lyrics'];

    return (
      <View style={styles.cardDeckStyle}>
        <Text style={styles.cardStyle}>Artists</Text>
        <Text style={styles.cardStyle}>Add Lyrics</Text>
      </View>
    );
  }
}

export default Home;


const vh = Dimensions.get('window').height;
const vw = Dimensions.get('window').width;

const width = 80;
const height = 20;
const ml = `${(100 - width)/2}%`;
const mtb = 5;
const fs = 25;
// const lh = fs * 2;
const lh = 70;

console.log(height, width);

const cWidth = `${width}%`;
const cHeight = `${height}%`;

const styles = StyleSheet.create({
  cardDeckStyle: {
    display: "flex",
    flex: 1,
    alignContent: "center",
  },
  cardStyle: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#000",
    height: cHeight,
    width: cWidth,
    marginTop: mtb,
    marginBottom: mtb,
    marginLeft: ml,
    fontSize: fs
    // lineHeight: lh
  }
});

// <Card title={title}>{childText}</Card>
// {
//   cardDeck.map((e,i) => {
//     <HomeCard key={i} title={''} childText={e} />
//   })
// }