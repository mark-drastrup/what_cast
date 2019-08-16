import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

class Podcastlist extends Component {
  state = {
    episodes: {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Podcasts",
      headerStyle: {
        backgroundColor: "black"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    };
  };

  retrievePodcastEpisodes = async (id) => {
    try {
      this.props.fetchEpisodes(id);
      this.props.navigation.navigate('Episodes')
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    let results;
    if (this.props.podcastData.length !== 0) {
      results = this.props.podcastData.map(podcast => {
        return (
          <TouchableOpacity key={podcast.itunes_id} onPress={() => this.retrievePodcastEpisodes(podcast.id)}>
            <Image source={{ uri: podcast.image }} style={{ width: 100, height: 100 }}></Image>
          </TouchableOpacity>
        )
      })
    }
    return (
      <View style={styles.podcastImageContainer}>
        {results}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  podcastImageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    podcastData: state.podcastData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchEpisodes: async (id) => {
      const episodes = await axios(`https://listen-api.listennotes.com/api/v2/podcasts/${id}?sort=recent_first`, { headers: { 'X-ListenAPI-Key': Constants.manifest.extra.apiKey } });
      dispatch({
        type: "FETCH_EPISODES",
        data: episodes.data
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Podcastlist);