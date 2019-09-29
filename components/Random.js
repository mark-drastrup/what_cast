import React, { Component } from "react";
import { connect } from "react-redux";
import Constants from "expo-constants";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import RandomEpisode from "./RandomEpisode";
import axios from "axios";

class Random extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Random",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "black"
      },
      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        flex: 1
      }
    };
  };

  componentDidMount() {
    if (!this.props.hasRandomEpisode) {
      this.props.fetchEpisode();
    }
  }

  render() {
    if (this.props.hasRandomEpisode) {
      return (
        <View style={{ flex: 1 }}>
          <RandomEpisode></RandomEpisode>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#36aee3" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#1a1a1a"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

const mapStateToProps = state => {
  return {
    hasRandomEpisode: state.hasRandomEpisode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEpisode: async () => {
      const episodes = await axios(
        `https://listen-api.listennotes.com/api/v2/just_listen`,
        { headers: { "X-ListenAPI-Key": Constants.manifest.extra.apiKey } }
      );
      dispatch({
        type: "FETCH_RANDOM_EPISODE",
        data: episodes.data
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Random);
