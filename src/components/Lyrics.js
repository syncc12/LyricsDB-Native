import React from 'react';
import { Global, globalState } from '../Global';
import { SafeAreaView, ScrollView, Text, RefreshControl, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

class Lyrics extends React.Component {

  render() {
    const { selectedArtist, selectedSong } = this.props;

    return (
      <SafeAreaView style={styles.savStyle}>
        <ScrollView style={styles.svStyle}>
          <Text></Text>
          <Text>{selectedArtist['name']}</Text>
          <Text></Text>
          <Text>{selectedSong['song_title_korean']} ({selectedSong['song_title_english']})</Text>
          <Text></Text>
          <Text>{selectedSong['korean_lyrics']}</Text>
          <Text></Text>
          <Text></Text>
          <Text>{selectedSong['english_lyrics']}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Lyrics;

const styles = StyleSheet.create({
  savStyle: {
    flex: 1
  },
  svStyle: {
    marginLeft: 20
  }
});