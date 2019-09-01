import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from "react-native-slider";
import { Audio } from 'expo-av';

class PlayMenu extends Component {
  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });

    this.playTrack(this.props.episodeURI)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.episodeURI !== this.props.episodeURI) {
      this.props.playbackInstance.stopAsync();
      this.playTrack(this.props.episodeURI)
    }
  }

  playTrack = async (uri) => {
    try {
      const initialStatus = {
        shouldPlay: true,
        rate: 1.0,
        shouldCorrectPitch: true,
        volume: 1.0,
        isMuted: false,
        isLooping: 0
      };
      const { sound } = await Audio.Sound.createAsync({ uri }, initialStatus, this.props.updateEpisodeData)
      this.props.setEpisode(sound);

    } catch (error) {
      console.log(error)
    }
  }

  onPlayPause = () => {
    if (this.props.isPlaying) {
      this.props.playbackInstance.pauseAsync();
    } else {
      this.props.playbackInstance.playAsync();
    }
    this.props.playPause();
  }

  onStop = () => {
    this.props.playbackInstance.stopAsync();
  }

  getSeekSliderPosition() {
    if (
      this.props.playbackInstance != null &&
      this.props.playbackInstancePosition != null &&
      this.props.playbackInstanceDuration != null
    ) {
      return (
        this.props.playbackInstancePosition /
        this.props.playbackInstanceDuration
      );
    }
    return 0;
  }

  onSeekSliderValueChange = value => {
    if (this.props.playbackInstance != null && !this.props.isSeeking) {
      this.props.sliderValueChange();
      this.props.playbackInstance.pauseAsync();
    }
  };

  onSeekSliderSlidingComplete = async value => {
    if (this.props.playbackInstance != null) {
      this.props.sliderSlidingComplete()
      const seekPosition = value * this.props.playbackInstanceDuration;
      this.props.playbackInstance.setPositionAsync(seekPosition);
      this.props.playbackInstance.playFromPositionAsync(seekPosition);
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: "black", justifyContent: "center" }}>
        <View style={styles.buttonContainer}>
          <Ionicons name="md-rewind" size={20} color="white"></Ionicons>
          {!this.props.isPlaying ?
            <Ionicons name="md-play" size={32} color="white" onPress={this.onPlayPause} />
            :
            <Ionicons name="md-pause" size={32} color="white" onPress={this.onPlayPause} />
          }
          <Ionicons name="md-fastforward" size={20} color="white"></Ionicons>
        </View>


        <Slider
          style={styles.playbackSlider}
          value={this.getSeekSliderPosition()}
          onValueChange={this.onSeekSliderValueChange}
          onSlidingComplete={this.onSeekSliderSlidingComplete}
          disabled={this.props.isLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10
  },
  playbackSlider: {
    alignSelf: "stretch",
  }
});

const mapStateToProps = state => {
  return {
    episodeURI: state.episodeURI,
    isPlaying: state.isPlaying,
    playbackInstance: state.playbackInstance,
    playbackInstancePosition: state.playbackInstancePosition,
    playbackInstanceDuration: state.playbackInstanceDuration,
    isSeeking: state.isSeeking,
    shouldPlay: state.shouldPlay
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEpisodeData: (status) => {
      if (status.isLoaded) {
        dispatch({
          type: "UPDATE_EPISODE_DATA",
          data: {
            playbackInstancePosition: status.positionMillis,
            playbackInstanceDuration: status.durationMillis,
            shouldPlay: status.shouldPlay,
            isPlaying: status.isPlaying,
            isBuffering: status.isBuffering,
            rate: status.rate,
            muted: status.isMuted,
            volume: status.volume,
          }
        })
      }
    },
    setEpisode: (sound) => {
      dispatch({
        type: "SET_EPISODE",
        data: sound
      })
    },
    playPause: () => {
      dispatch({
        type: "PLAY_PAUSE"
      })
    },
    sliderValueChange: () => {
      dispatch({
        type: "SLIDER_VALUE_CHANGE"
      })
    },
    sliderSlidingComplete: () => {
      dispatch({
        type: "SLIDER_VALUE_COMPLETE"
      })
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayMenu);
