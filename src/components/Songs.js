import React from 'react';
import { Global, globalState } from '../Global';
import axios from 'axios';
import ajaxPath from '../helpers/ajax';
import { SafeAreaView, ScrollView, Text, RefreshControl, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Constants from 'expo-constants';


class Songs extends React.Component {

  constructor() {
    super();
    this.state = {
      songList: [],
      selectedSong: '',
      refreshing: false,
      songsUpdating: false
    }
  }

  toggleRefreshing = (override='') => {
    if (override === '')
      this.setState({refreshing: !this.state.refreshing});
    else {
      this.setState({refreshing: override});
    }
  }

  getSongs = () => {
    const { selectedArtist } = this.props;
    const selectedArtistID = selectedArtist['id'];
    this.setState({songsUpdating: true});
    axios.get(`${ajaxPath('artists')}/${selectedArtistID}/lyrics`)
    .then((res) => {
      this.setState({songList: res.data, songsUpdating: false});
    })
    .catch((err) => {
      this.setState({songsUpdating: false});
      console.log(err);
    });
  }

  onRefresh = () => {
    const { songsUpdating } = this.state;
    this.setState({refreshing: true});
    this.getSongs();
    while (songsUpdating) {}
    this.setState({refreshing: false});
    console.log(songsUpdating);
  }

  songSelected = (e) => {
    this.setState({selectedSong: e});
    this.props.getSelectedSong(e);
  }

  componentDidMount() {
    this.getSongs();
  }


  render() {
    const { songList, refreshing } = this.state;
    const { selectedArtist } = this.props;

    return (
      <SafeAreaView style={styles.savStyle}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}>
          {songList.map((e,i) => <ListItem onTouchEnd={(() => this.songSelected(e))} key={i} title={`${e['song_title_korean']} - ${e['song_title_english']}`} subtitle={selectedArtist['name']} bottomDivider chevron />)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Songs;

const styles = StyleSheet.create({
  savStyle: {
    flex: 1
  },
  svStyle: {
    marginLeft: 20
  }
});