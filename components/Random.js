import React, { Component } from 'react';
import { connect } from "react-redux";
import Constants from 'expo-constants';
import { ScrollView, Button, ActivityIndicator, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RandomEpisode from "./RandomEpisode";
import axios from "axios";

class Random extends Component {
  componentDidMount() {
    if (!this.props.hasRandomEpisode) {
      this.props.fetchEpisode();
    }
  }

  render() {
    if (this.props.hasRandomEpisode) {
      return (
        <ScrollView>
          <RandomEpisode></RandomEpisode>
          <Button title="Randomize" onPress={this.props.fetchEpisode}></Button>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

const mapStateToProps = state => {
  return {
    hasRandomEpisode: state.hasRandomEpisode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEpisode: async () => {
      const episodes = await axios(`https://listen-api.listennotes.com/api/v2/just_listen`, { headers: { 'X-ListenAPI-Key': Constants.manifest.extra.apiKey } });
      dispatch({
        type: "FETCH_RANDOM_EPISODE",
        data: episodes.data
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Random);
