import React, { Component } from 'react';
import Wrapper from "./components/Wrapper"
import Episodes from "./components/Episodes";
import PlayMenu from "./components/PlayMenu";
import PodcastList from "./components/PodcastList";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux'
import store from './store'




export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Wrapper />
      </Provider>
    )
  }
}