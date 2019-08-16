import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Flatlist, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from "react-native-slider";

export default class Episodes extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Insert podcast name",
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
    let episodesList
    let episodes;
    let getEpisodeURI;
    const { navigation } = this.props;
    if (navigation !== undefined) {
      getEpisodeURI = navigation.getParam("getEpisodeURI");
      episodesList = navigation.getParam("episodes");
      episodes = episodesList.episodes.map((episode) => {
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
            <Button title="press me" onPress={() => getEpisodeURI(episode.audio)}></Button>
            <Ionicons name="md-play" size={32} color="black" style={styles.playBtn}></Ionicons>
          </TouchableOpacity>
        )
      })
    }

    /* const playTrack = navigation.getParam("playTrack"); */
    /* const onPlayPause = navigation.getParam("onPlayPause");
    const onStop = navigation.getParam("onStop");
    const getSeekSliderPosition = navigation.getParam("getSeekSliderPosition");
    const onSeekSliderValueChange = navigation.getParam("onSeekSliderValueChange");
    const onSeekSliderSlidingComplete = navigation.getParam("onSeekSliderSlidingComplete"); */




    return (
      <View>
        <ScrollView>
          <View style={styles.descriptionContainer}>
            <Image source={{ uri: episodesList.image }} style={styles.image} />
            <Text style={styles.description}>{episodesList.description}</Text>
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

{/* <Button title="Play Pause" onPress={onPlayPause}></Button>
<Button title="Stop" onPress={onStop}></Button>

<Slider
  style={styles.playbackSlider}
  value={_getSeekSliderPosition()}
  onValueChange={_onSeekSliderValueChange}
  onSlidingComplete={_onSeekSliderSlidingComplete}
  disabled={false} /> */}