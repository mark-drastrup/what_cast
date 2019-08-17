import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class PlayMenu extends Component {

  handleClick = (route) => {
    this.props.dispatchRoute(route)
  }
  render() {
    return (
      <View style={styles.menu}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => this.handleClick("Random")}>
            <Ionicons name="md-help" size={20} color="white"></Ionicons>
            <Text style={styles.menuText}>Random</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => this.handleClick("Home")}>
            <Ionicons name="md-search" size={20} color="white"></Ionicons>
            <Text style={styles.menuText}>Discover</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "black",
    justifyContent: "center",
    paddingBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 5
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  menuText: {
    color: "#fff"
  }
});