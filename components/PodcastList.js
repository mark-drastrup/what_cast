import React, { Component } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

export default class Podcastlist extends Component {
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
      const data = await fetch(`https://listen-api.listennotes.com/api/v2/podcasts/${id}?sort=recent_first`, { headers: { 'X-ListenAPI-Key': Constants.manifest.extra.apiKey } });
      const items = await data.json();
      this.setState({ episodes: items })
      const { navigation } = this.props;
      const getEpisodeURI = navigation.getParam("getEpisodeURI");
      this.props.navigation.navigate("Episodes", {
        episodes: this.state.episodes,
        getEpisodeURI: getEpisodeURI
        /* playTrack: this.playTrack,
        onPlayPause: this.onPlayPause,
        onStop: this.onStop,
        getSeekSliderPosition: this.getSeekSliderPosition,
        onSeekSliderValueChange: this.onSeekSliderValueChange,
        onSeekSliderSlidingComplete: this.onSeekSliderSlidingComplete */
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    let results;
    let podcastData;
    const { navigation } = this.props;
    if (navigation !== undefined) {
      podcastData = navigation.getParam("podcastData");
      results = podcastData.results.map(podcast => {
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