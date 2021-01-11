import React from 'react';
import { SafeAreaView, ScrollView, Text, RefreshControl, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import ajaxPath from '../helpers/ajax';
import { ListItem } from 'react-native-elements';
import Lyrics2 from './Lyrics2';

class Index extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedArtist: '',
      // artistList: [],
      lyricsList: [],
      selectedArtistID: '',
      selectedSongID: '',
      showLyrics: false,
      showSongs: false,
      refreshing: false
    }
  }

  toggleRefreshing = (override='') => {
    if (override === '')
      this.setState({refreshing: !this.state.refreshing});
    else {
      this.setState({refreshing: override});
    }
  }

  onRefresh = () => {
    const { selectedArtistID } =  this.state;
    const { artistUpdateStatus } = this.props;
    this.setState({refreshing: true});
    console.log(artistUpdateStatus);
    if (selectedArtistID === '') {
      this.artistRefresh();
      while (artistUpdateStatus) {}
      this.setState({refreshing: false});
      console.log(artistUpdateStatus);
    } else {
      axios.get(`${ajaxPath('artists')}/${selectedArtistID}/lyrics`)
      .then((res) => {
        this.setState({lyricsList: res.data, refreshing: false});
        console.log(artistUpdateStatus);
      })
      .catch((err) => {
        this.setState({refreshing: false});
        console.log(artistUpdateStatus);
        console.log(err);
      });
    }
  }

  artistRefresh = () => {
    this.props.updateArtistList();
  }

  getLyrics = (artistID) => {
    axios.get(`${ajaxPath('artists')}/${artistID}/lyrics`)
    .then((res) => {
      this.setState({lyricsList: res.data});
    })
    .catch((err) => console.log(err));
  }

  getSongs = (e) => {
    const artistID = e['id'];
    const targetArtist = e['name'];
    this.setState({selectedArtist: targetArtist, selectedArtistID: artistID, showSongs: true});
    this.getLyrics(artistID);
  }

  lyricsHandle = (inSongID) => {
    this.setState({selectedSongID: inSongID, showLyrics: true});
  }


  render() {
    const { lyricsList, showSongs, selectedArtist, showLyrics, selectedSongID, refreshing } = this.state;
    const { artistList } = this.props;
    // console.log({'artistList':artistList, 'lyricsList':lyricsList, 'showSongs':showSongs, 'selectedArtist':selectedArtist});

    return (
      <SafeAreaView style={styles.savStyle}>
        {
          showLyrics === false ?
              
              showSongs === false ? 
              <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}>
                {artistList.map((e,i) => <ListItem onTouchEnd={(() => this.getSongs(e))} key={i} title={e['name']} bottomDivider chevron />)}
              </ScrollView>
            :
              <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}>
                {lyricsList.map((e,i) => <ListItem onTouchEnd={(() => this.lyricsHandle(e['id']))} key={i} title={`${e['song_title_korean']} - ${e['song_title_english']}`} subtitle={selectedArtist} bottomDivider chevron />)}
              </ScrollView>
            
          :
            <ScrollView style={styles.svStyle} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}>
              <Lyrics2 songID={selectedSongID} lyricsData={lyricsList} artistName={selectedArtist}/>
            </ScrollView>
        }
      </SafeAreaView>
    );
  }
}

export default Index;

const styles = StyleSheet.create({
  savStyle: {
    marginTop: Constants.statusBarHeight,
    height: '100%'
  },
  svStyle: {
    marginLeft: 20,
    height: '100%'
  }
});


