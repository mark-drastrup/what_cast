import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { convertToPlaytime } from "../helpers";

class Episodes extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Episodes",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "black"
      },
      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        flex: 1
      },
      headerRight: <View />
    };
  };

  onPlayPause = () => {
    if (this.props.isPlaying) {
      this.props.playbackInstance.pauseAsync();
    } else {
      this.props.playbackInstance.playAsync();
    }
    this.props.playPause();
  };

  render() {
    let episodes;
    if (this.props.episodes.length !== 0) {
      episodes = this.props.episodes.map(episode => {
        const date = new Date(episode.pub_date_ms);
        const day = date.getDate();
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "Oktober",
          "November",
          "December"
        ];
        const month = date.getMonth();
        const playTime = convertToPlaytime(episode.audio_length_sec);
        return (
          <TouchableOpacity style={styles.episodesContainer} key={episode.id}>
            <View style={styles.episode}>
              <Text
                style={styles.episodeInfo}
              >{`${day} ${months[month]}`}</Text>
              <Text style={styles.episodeInfo}>{episode.title}</Text>
              <Text style={styles.episodeInfo}>{playTime}</Text>
            </View>
            {this.props.currentlyPlaying === episode.id &&
            this.props.isPlaying ? (
              <Ionicons
                name="md-pause"
                size={32}
                color="white"
                style={styles.playBtn}
                onPress={this.onPlayPause}
              ></Ionicons>
            ) : (
              <Ionicons
                name="md-play"
                size={32}
                color="white"
                style={styles.playBtn}
                onPress={() =>
                  this.props.playEpisode(episode.audio, episode.id)
                }
              ></Ionicons>
            )}
          </TouchableOpacity>
        );
      });
    }

    return (
      <>
        {this.props.episodes.length > 0 ? (
          <View style={styles.episodes}>
            <ScrollView>
              <View style={styles.descriptionContainer}>
                <Image
                  source={{ uri: this.props.image }}
                  style={styles.image}
                />
                <Text style={styles.description}>{this.props.description}</Text>
              </View>
              <View>{episodes}</View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#36aee3" />
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  episodes: {
    backgroundColor: "#1a1a1a"
  },
  descriptionContainer: {
    marginBottom: 20,
    alignItems: "stretch"
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
    borderBottomColor: "#404040",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  episode: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 15,
    paddingLeft: 5,
    flex: 10,
    color: "white"
  },
  episodeInfo: {
    color: "white"
  },
  playBtn: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#1a1a1a"
  }
});

const mapStateToProps = state => {
  return {
    episodes: state.episodes,
    image: state.selectedPodcastImage,
    description: state.selectedPodcastDescription,
    currentlyPlaying: state.currentlyPlaying,
    isPlaying: state.isPlaying,
    playbackInstance: state.playbackInstance,
    podcastName: state.podcastName
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
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Episodes);
