import React from 'react';
import { Global, globalState } from '../Global';
import axios from 'axios';
import ajaxPath from '../helpers/ajax';
import { SafeAreaView, ScrollView, Text, RefreshControl, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Constants from 'expo-constants';

class Artists extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedArtist: '',
      artistList: [],
      refreshing: false,
      artistUpdating: false
    };
  }

  getArtists = () => {
    this.setState({artistUpdating: true});
    axios.get(ajaxPath('artists'))
    .then((res) => {
      this.setState({artistList: res.data, artistUpdating: false});
    })
    .catch((err) => {
      this.setState({artistUpdating: false});
      console.log(err);
    });
  }

  toggleRefreshing = (override='') => {
    if (override === '')
      this.setState({refreshing: !this.state.refreshing});
    else {
      this.setState({refreshing: override});
    }
  }

  onRefresh = () => {
    const { artistUpdating } = this.state;
    this.setState({refreshing: true});
    this.getArtists();
    while (artistUpdating) {}
    this.setState({refreshing: false});
    console.log(artistUpdating);
  }

  artistSelected = (e) => {
    this.setState({selectedArtist: e});
    this.props.getSelectedArtist(e);
  }

  componentDidMount() {
    this.getArtists();
  }


  render() {
    const { artistList, selectedArtist, refreshing } = this.state;

    return (
      <SafeAreaView style={styles.savStyle}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}>
          {artistList.map((e,i) => <ListItem onTouchEnd={(() => this.artistSelected(e))} key={i} title={e['name']} bottomDivider chevron />)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Artists;

const styles = StyleSheet.create({
  savStyle: {
    flex: 1
  },
  svStyle: {
    marginLeft: 20
  }
});