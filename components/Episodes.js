import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, Flatlist, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from "react-native-slider";

class Episodes extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Insert podcast name",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "black"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    };
  };

  convertToPlaytime = (seconds) => {
    seconds = Number(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
    return hDisplay + mDisplay;
  }

  render() {
    let episodes;
    if (this.props.episodes.length !== 0) {
      episodes = this.props.episodes.map((episode) => {
        const date = new Date(episode.pub_date_ms);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const playTime = this.convertToPlaytime(episode.audio_length_sec);
        return (
          <TouchableOpacity style={styles.episodesContainer} key={episode.id}>
            <View style={styles.episode}>
              <Text>{`${day} ${month}`}</Text>
              <Text>{episode.title}</Text>
              <Text>{playTime}</Text>
            </View>
            <Button title="press me" onPress={() => this.props.playEpisode(episode.audio)}></Button>
            <Ionicons name="md-play" size={32} color="black" style={styles.playBtn}></Ionicons>
          </TouchableOpacity>
        )
      })
    }

    return (
      <View>
        <ScrollView>
          <View style={styles.descriptionContainer}>
            <Image source={{ uri: this.props.image }} style={styles.image} />
            <Text style={styles.description}>{this.props.description}</Text>
          </View>
          <View>
            {episodes}
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
  },
  episodesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  episode: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 15,
    paddingLeft: 5,
    flex: 10,
  },
  playBtn: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    episodes: state.episodes,
    image: state.selectedPodcastImage,
    description: state.selectedPodcastDescription
  };
};
const mapDispatchToProps = dispatch => {
  return {
    playEpisode: async (uri) => {
      dispatch({
        type: "PLAY_EPISODE",
        data: uri
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Episodes);