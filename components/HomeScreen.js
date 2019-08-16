import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcastData: {},
      term: "",
      episodes: {},
      playbackInstance: null,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      volume: 1.0,
      rate: 1.0,
      muted: false,
      isSeeking: false,
      shouldPlayAtEndOfSeek: false,
      showPlayMenu: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerStyle: {
        backgroundColor: "black"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    };
  };


  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
  }

  retrievePodcastData = async () => {
    try {
      this.props.fetchPodcastData(this.props.query);
      this.props.navigation.navigate('Results')
    } catch (error) {
      console.log(error)
    }
  }

  onPlayPause = () => {
    if (this.state.isPlaying) {
      this.state.playbackInstance.pauseAsync();
      this.setState({ isPlaying: false })
    } else {
      this.state.playbackInstance.playAsync();
      this.setState({ isPlaying: true })
    }
  }

  onStop = () => {
    this.state.playbackInstance.stopAsync();
  }

  /*  getEpisodeURI = (data) => {
     this.playTrack(data)
   } */

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
      const { sound, status } = await Audio.Sound.createAsync({ uri: uri }, initialStatus, this._onPlaybackStatusUpdate)
      this.setState({ playbackInstance: sound, isPlaying: true })
    } catch (error) {
      console.log(error)
    }
  }

  getSeekSliderPosition() {
    if (
      this.state.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  }

  onSeekSliderValueChange = value => {
    if (this.state.playbackInstance != null && !this.state.isSeeking) {
      this.setState({ isSeeking: true, shouldPlayAtEndOfSeek: this.state.shouldPlay })
      this.state.playbackInstance.pauseAsync();
    }
  };

  onSeekSliderSlidingComplete = async value => {
    if (this.state.playbackInstance != null) {
      this.setState({ isSeeking: false })
      const seekPosition = value * this.state.playbackInstanceDuration;
      this.state.playbackInstance.setPositionAsync(seekPosition);
      this.state.playbackInstance.playFromPositionAsync(seekPosition);
    }
  };

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: "white" }}
            onChangeText={this.props.onChange}
            value={this.props.query}
          />
          <Button title="Search" color="#00cc66" onPress={this.retrievePodcastData}></Button>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  searchBar: {
    width: "50%"
  },
  podcastImageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  playbackSlider: {
    alignSelf: "stretch"
  },
});


const mapStateToProps = state => {
  return {
    query: state.query
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchPodcastData: async (query) => {
      const podcasts = await axios(`https://listen-api.listennotes.com/api/v2/search?q=${query}&type=podcast`, { headers: { 'X-ListenAPI-Key': Constants.manifest.extra.apiKey } })
      dispatch({
        type: "FETCH_PODCASTDATA",
        data: podcasts.data
      });
    },
    onChange: (text) => {
      dispatch({
        type: "UPDATE_QUERY",
        data: text
      })
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);