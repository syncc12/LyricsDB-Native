import React from 'react';
import { ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';

class Lyrics2 extends React.Component {

  getJSONFromID = (inList, inID) => {
    for (let i of inList) {
      if (i['id'] === inID) {
        return i;
      }
    }
  }

  render() {
    const { songID, lyricsData, artistName } = this.props;
    const lyricsJSON = this.getJSONFromID(lyricsData, songID);

    return (
      <>
        <Text>{artistName}</Text>
        <Text></Text>
        <Text>{lyricsJSON['song_title_korean']} ({lyricsJSON['song_title_english']})</Text>
        <Text></Text>
        <Text>{lyricsJSON['korean_lyrics']}</Text>
        <Text></Text>
        <Text></Text>
        <Text>{lyricsJSON['english_lyrics']}</Text>
      </>
    );
  }
}

export default Lyrics2;