import React, { Component } from 'react';
import { connect } from "react-redux";
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image, Flatlist, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

class RandomEpisode extends Component {
  convertToPlaytime = (seconds) => {
    seconds = Number(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
    return hDisplay + mDisplay;
  }

  onPlayPause = () => {
    if (this.props.isPlaying) {
      this.props.playbackInstance.pauseAsync();
    } else {
      this.props.playbackInstance.playAsync();
    }
    this.props.playPause();
  }

  render() {
    let episodes;
    if (this.props.episodes.length !== 0) {
      episodes = this.props.episodes.map((episode) => {
        const date = new Date(episode.pub_date_ms);
        const day = date.getDate();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"]
        const month = date.getMonth();
        const playTime = this.convertToPlaytime(episode.audio_length_sec);
        return (
          <TouchableOpacity style={styles.episodesContainer} key={episode.id}>
            <View style={styles.episode}>
              <Text style={styles.episodeInfo}>{`${day} ${months[month]}`}</Text>
              <Text style={styles.episodeInfo}>{episode.title}</Text>
              <Text style={styles.episodeInfo}>{playTime}</Text>
            </View>
            {this.props.currentlyPlaying === episode.id && this.props.isPlaying ?
              <Ionicons name="md-pause" size={32} color="white" style={styles.playBtn} onPress={this.onPlayPause}></Ionicons>
              :
              <Ionicons name="md-play" size={32} color="white" style={styles.playBtn} onPress={() => this.props.playEpisode(episode.audio, episode.id)}></Ionicons>
            }
          </TouchableOpacity>
        )
      })
    }

    return (
      <View style={{ backgroundColor: "#1a1a1a", flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <View style={styles.descriptionContainer}>
            <Image source={{ uri: this.props.episodes[0].image }} style={styles.image} />
            <Text style={styles.description}>{this.props.episodes[0].description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
          </View>
          <View>
            <View>
              {episodes}
            </View>
            <View>
              <Button title="Randomize" onPress={this.props.fetchEpisode} style={{ alignSelf: "flex-end" }}></Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  descriptionContainer: {
    marginBottom: 20,
    alignItems: "stretch",
  },
  image: {
    flexDirection: "row",
    height: 400
  },
  description: {
    paddingRight: 5,
    paddingLeft: 5,
    color: "white"
  },
  episodesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    borderBottomColor: '#404040',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  episode: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 15,
    paddingLeft: 5,
    flex: 10,
  },
  episodeInfo: {
    color: "white"
  },
  playBtn: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    episodes: state.randomEpisode,
    currentlyPlaying: state.currentlyPlaying,
    isPlaying: state.isPlaying,
    playbackInstance: state.playbackInstance
  };
};
const mapDispatchToProps = dispatch => {
  return {
    playEpisode: async (uri, id) => {
      dispatch({
        type: "PLAY_EPISODE",
        data: {
          uri,
          id
        }
      });
    },
    playPause: () => {
      dispatch({
        type: "PLAY_PAUSE"
      })
    },
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
)(RandomEpisode);