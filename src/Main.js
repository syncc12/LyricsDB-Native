import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import axios from 'axios';
import ajaxPath from './helpers/ajax';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Index from './components/Index';
import Artists from './components/Artists';
import Songs from './components/Songs';
import Lyrics from './components/Lyrics';
import AddLyrics from './components/AddLyrics';

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      currentPage: 'Home',
      showSidebar: false,
      selectedArtist: '',
      selectedSong: '',
      sidebarWidth: 0,
      animation: new Animated.Value(0),
      animationDuration: 300
    }
  }

  slideIn = () => {
    const { sidebarWidth, animation, animationDuration } = this.state;
    this.state.animation.setValue(-sidebarWidth);
    Animated.timing(animation, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true
    }).start(() => {
      this.state.animation.setValue(0);
    });
  }

  slideOut = () => {
    const { sidebarWidth, animation, animationDuration } = this.state;
    this.state.animation.setValue(0);
    Animated.timing(animation, {
      toValue: -sidebarWidth,
      duration: animationDuration,
      useNativeDriver: true
    }).start(() => {
      this.state.animation.setValue(-sidebarWidth);
      this.setState({showSidebar: false});
    });
  }

  closeDrawer = () => {
    this.slideOut();
  }

  openDrawer = () => {
    this.setState({showSidebar: true});
    this.slideIn();
  }

  toggleDrawer = () => {
    const { showSidebar } = this.state;
    if (showSidebar === false) {
      this.openDrawer();
    } else if (showSidebar === true) {
      this.closeDrawer();
    }
  }

  pageChange = (newPageName) => {
    this.setState({currentPage: newPageName});
    this.closeDrawer();
  }

  getSelectedArtist = (inArtist) => {
    this.setState({selectedArtist: inArtist, currentPage: 'Songs'});
  }

  getSelectedSong = (inSong) => {
    this.setState({selectedSong: inSong, currentPage: 'Lyrics'});
  }

  render() {
    const { currentPage, showSidebar, artistList, artistUpdating, selectedArtist, selectedSong, sidebarWidth } = this.state;
    const pageNamesArr = [['Home','Home'],['Artists','Artists'],['AddLyrics','Add Lyrics']];
    const pageNamesJSON = {Home:'Home',Index:'Artists',Artists:'Artists',Songs:'Songs',Lyrics:'Lyrics',AddLyrics:'Add Lyrics'};
    const slideInStyle = {
      transform: [{
        translateX: this.state.animation.interpolate({
          inputRange: [-sidebarWidth,0],
          outputRange: [-sidebarWidth,0]
        })
      }]
    };
    const slideOutStyle = {
      transform: [{
        translateX: this.state.animation.interpolate({
          inputRange: [0,sidebarWidth],
          outputRange: [0,sidebarWidth]
        })
      }]
    };

    return (
      <View style={{height: '100%'}} onLayout={(e) => {
        this.setState({sidebarWidth: Math.round(e.nativeEvent.layout['width'] * 0.8)});
      }}>
        <Layout currentPage={pageNamesJSON[currentPage]} toggleDrawer={this.toggleDrawer} changePage={this.pageChange}/>
        <Animated.View style={showSidebar ? [sidebarShow, slideInStyle] : [sidebarHide, slideOutStyle]}>
          <Sidebar pageChange={this.pageChange} pageNames={pageNamesArr} />
        </Animated.View>
        {currentPage === 'Home' && <Home />}
        {currentPage === 'Artists' && <Artists getSelectedArtist={this.getSelectedArtist}/>}
        {currentPage === 'Songs' && <Songs selectedArtist={selectedArtist} getSelectedSong={this.getSelectedSong}/>}
        {currentPage === 'Lyrics' && <Lyrics selectedArtist={selectedArtist} selectedSong={selectedSong} />}
        {currentPage === 'AddLyrics' && <AddLyrics updateArtistList={this.updateArtistList} />}
      </View>
    );
  }
}


export default Main;



const styles = StyleSheet.create({
  sidebarModal: {
    position: "relative",
    height: "100%",
    width: "80%"
  },
  sideShow: {
    display: "flex"
  },
  sideHide: {
    display: "none"
  }
});

const sidebarShow = StyleSheet.compose(styles.sidebarModal, styles.sideShow);
const sidebarHide = StyleSheet.compose(styles.sidebarModal, styles.sideHide);
