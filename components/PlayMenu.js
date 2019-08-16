import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from "react-native-slider";

export default class PlayMenu extends Component {
  render() {
    /* let episodes;
    const { navigation } = this.props;

    const playTrack = navigation.getParam("playTrack");
    const onPlayPause = navigation.getParam("onPlayPause");
    const onStop = navigation.getParam("onStop");
    const getSeekSliderPosition = navigation.getParam("getSeekSliderPosition");
    const onSeekSliderValueChange = navigation.getParam("onSeekSliderValueChange");
    const onSeekSliderSlidingComplete = navigation.getParam("onSeekSliderSlidingComplete"); */
    return (
      <View>

        <Button title="Play Pause"></Button>
        <Button title="Stop"></Button>

        <Slider
          style={styles.playbackSlider}
          disabled={false} />
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
