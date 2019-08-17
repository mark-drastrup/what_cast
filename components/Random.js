import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class Random extends Component {


  render() {
    return (
      <View style={styles.menu}>
        <Text style={{ color: "white" }}>This is my random component</Text>
        <Text style={{ color: "black" }}>This is my random component</Text>
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