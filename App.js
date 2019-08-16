import React, { Component } from 'react';
import HomeScreen from "./components/HomeScreen"
import Episodes from "./components/Episodes";
import PlayMenu from "./components/PlayMenu";
import PodcastList from "./components/PodcastList";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
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

export default class App extends React.Component {
  state = {
    showPlayMenu: false,
    episodeURI: ""
  }

  getEpisodeURI = (data) => {
    /* this.setState({ episodeURI: data })
    console.log(this.state.episodeURI) */
    // Current issue: Passing down the getEpisodeURI to HomeScreen, so the episode URI can come all the way from Episodes 
    // and be passed to PlayMenu. Consider using Redux
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer style={{ flex: 1 }} getEpisodeURI={this.getEpisodeURI} />
        {this.state.showPlayMenu === true &&
          <PlayMenu></PlayMenu>
        }
      </View>
    )
  }
}