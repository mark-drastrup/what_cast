import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeScreen from "./HomeScreen"
import Episodes from "./Episodes";
import PlayMenu from "./PlayMenu";
import PodcastList from "./PodcastList";
import Random from "./Random";
import Menu from "./Menu";
import { View } from 'react-native';
import { createStackNavigator, createAppContainer, NavigationActions } from "react-navigation";

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Results: PodcastList,
    Episodes: Episodes,
    Random: Random
  },
  {
    initialRouteName: 'Random',
  }
);

const AppContainer = createAppContainer(RootStack);

class Wrapper extends Component {
  dispatchRoute = (route) => {
    this._navigator.dispatch({ type: NavigationActions.NAVIGATE, routeName: route })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer style={{ flex: 1 }} ref={nav => this._navigator = nav} />
        {this.props.showPlayMenu === true &&
          <PlayMenu></PlayMenu>
        }
        <Menu dispatchRoute={this.dispatchRoute}></Menu>
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