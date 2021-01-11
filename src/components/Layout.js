import React from 'react';
import { View, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';

class Layout extends React.Component {

  drawerToggle = () => {
    this.props.toggleDrawer();
  }

  backPage = () => {
    const { currentPage } = this.props;
    if (currentPage === 'Lyrics') {
      this.props.changePage('Songs');
    } else if (currentPage === 'Songs') {
      this.props.changePage('Artists');
    }
  }

  render() {
    const { currentPage } = this.props;

    return (
      <View> 
        <Header>
          {
            currentPage === 'Songs' || currentPage === 'Lyrics' ? 
              <View onTouchStart={(() => this.backPage())}><Icon name="chevron-left" color="#fff" /></View>
            :
              <View onTouchStart={(() => this.drawerToggle())}><Icon name="menu" color="#fff" /></View>
          }
          
          <Text style={{color: '#fff'}}>{currentPage}</Text>
        </Header>
      </View>
    )
  }
}

export default Layout;