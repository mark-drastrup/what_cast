import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Menu extends Component {

  handleClick = (route) => {
    this.props.dispatchRoute(route)
    this.props.changeActiveView(route)
  }
  render() {
    return (
      <View style={styles.menu}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => this.handleClick("Random")}>
            <Ionicons name="md-help" size={20} color={this.props.activeView === "Random" ? "#36aee3" : "white"}></Ionicons>
            <Text style={[this.props.activeView === "Random" ? styles.activeButton : styles.menuText]}>Random</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => this.handleClick("Home")}>
            <Ionicons name="md-search" size={20} color={this.props.activeView === "Home" ? "#36aee3" : "white"}></Ionicons>
            <Text style={[this.props.activeView === "Home" ? styles.activeButton : styles.menuText]}>Discover</Text>
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
  },
  activeButton: {
    color: "#36aee3"
  }
});

const mapStateToProps = state => {
  return {
    activeView: state.activeView,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeActiveView: (data) => {
      dispatch({
        type: "CHANGE_ACTIVE_VIEW",
        data: data
      })
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
