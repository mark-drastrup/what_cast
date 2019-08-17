import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeScreen from "./HomeScreen"
import Episodes from "./Episodes";
import PlayMenu from "./PlayMenu";
import PodcastList from "./PodcastList";
import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Results: PodcastList,
    Episodes: Episodes
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

class Wrapper extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer style={{ flex: 1 }} getEpisodeURI={this.getEpisodeURI} />
        {this.props.showPlayMenu === true &&
          <PlayMenu></PlayMenu>
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    showPlayMenu: state.showPlayMenu
  };
};
const mapDispatchToProps = dispatch => {
  return {
    playEpisode: async (uri) => {
      dispatch({
        type: "PLAY_EPISODES",
        data: uri
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper);