import React from 'react';
import axios from 'axios';
import ajaxPath from '../helpers/ajax';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

class AddLyrics extends React.Component {

  constructor() {
    super();
    this.state = {
      artistList: [],
      artistNames: [],
      artistIDs: {},
      inputArtist: '',
      inputData: {
        song_title_korean: '',
        song_title_english: '',
        origional_language: '',
        korean_lyrics: '',
        english_lyrics: ''
      }
    }
  }

  setDefaults = () => {
    this.setState({
      inputArtist: '',
      inputData: {
        song_title_korean: '',
        song_title_english: '',
        origional_language: '',
        korean_lyrics: '',
        english_lyrics: ''
      }});
    this.textInput1.clear();
    this.textInput2.clear();
    this.textInput3.clear();
    this.textInput4.clear();
    this.textInput5.clear();
    this.textInput6.clear();
    // document.getElementById('add-lyrics-form').reset();
  }

  addHandle = () => {
    const { inputData, inputArtist } = this.state;
    this.postRecord(inputData, inputArtist);
  }

  collectInputs = (e) => {
    e.preventDefault();
    const { artistIDs } = this.state;
    const postJSON = {};
    let thisKey, thisValue, thisArtist;

    [...Array(e.target.length-1).keys()].map(((event,i) => {
      thisKey = e['target'][event]['id'].replace('-input','');
      thisValue = e['target'][event]['value'];
      if (thisKey === 'artist') {
        thisKey = 'artist_id';
        thisArtist = thisValue;
        thisValue = artistIDs[thisArtist];
      }
      postJSON[thisKey] = thisValue;
      return null;
    }));
    // this.postRecord(postJSON, thisArtist, e);
  }

  getArtists = () => {
    axios.get(ajaxPath('artists'))
    .then((res) => {
      let nameList = [];
      let idJSON = {};
      res.data.map((e,i) => {
        idJSON[e['name'].toString()] = parseInt(e['id']);
        nameList.push(e['name']);
        return null;
      });
      this.setState({artistList: res.data, artistNames: nameList, artistIDs: idJSON});
    })
    .catch((err) => console.log(err));
  }

  postRecord = (postJSON, artistName) => {
    const { artistNames, artistIDs } = this.state;
    let postPath;
    if (artistNames.includes(artistName)) {
      const artistID = artistIDs[artistName];
      postPath = `${ajaxPath('artists')}/${artistID}/lyrics`;
      delete postJSON['artist_id'];
      axios.post(postPath, postJSON)
      .then((res) => {
        this.setDefaults();
      })
      .catch((err) => console.log(err));
    } else {
      const artistPostJSON = {name: artistName};
      postPath = ajaxPath('artists');
      axios.post(postPath, artistPostJSON)
      .then((res) => {
        const artistID =  res.data['id'];
        postPath = `${ajaxPath('artists')}/${artistID}/lyrics`;
        postJSON['artist_id'] = artistID;
        axios.post(postPath, postJSON)
        .then((res) => {
          this.newArtistPosted();
          this.setDefaults();
          this.getArtists();
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    }
  }

  newArtistPosted = () => {
    this.props.updateArtistList();
  }

  componentDidMount() {
    this.getArtists();
  }

  render() {

    return (
      <View>
        <Text></Text>
        <Input placeholder='Artist' ref={((input) => {this.textInput3 = input})} onChangeText={((text) => this.setState({inputArtist: text}))} defaultValue={''}/>
        <Input placeholder='Korean Song Title' ref={((input) => {this.textInput1 = input})} onChangeText={((text) => this.setState(prevState => ({inputData: {...prevState.inputData,song_title_korean: text}})))} defaultValue={''}/>
        <Input placeholder='English Song Title' ref={((input) => {this.textInput2 = input})} onChangeText={((text) => this.setState(prevState => ({inputData: {...prevState.inputData,song_title_english: text}})))} defaultValue={''}/>
        <Input placeholder='Origional Language' ref={((input) => {this.textInput4 = input})} onChangeText={((text) => this.setState(prevState => ({inputData: {...prevState.inputData,origional_language: text}})))} defaultValue={''}/>
        <Input placeholder='Korean Lyrics' ref={((input) => {this.textInput5 = input})} onChangeText={((text) => this.setState(prevState => ({inputData: {...prevState.inputData,korean_lyrics: text}})))} defaultValue={''}/>
        <Input placeholder='English Lyrics' ref={((input) => {this.textInput6 = input})} onChangeText={((text) => this.setState(prevState => ({inputData: {...prevState.inputData,english_lyrics: text}})))} defaultValue={''}/>
        <Text></Text>
        <Button title="Add" raised style={{padding: 15}} onPress={((e)=>this.addHandle(e))}/>
      </View>
    );
  }
}

export default AddLyrics;