import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
//const soundObject = new Audio.Sound();


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcastData: {},
      term: "",
      episodes: {}
    }
  }

  /*  componentDidMount() {
     this.retrievePodcastData();
   } */



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
      const { term } = this.state
      const data = await fetch(`https://listen-api.listennotes.com/api/v2/search?q=${term}&type=podcast`, { headers: { 'X-ListenAPI-Key': '3a211ed493854712a4988f11318d91f0' } })
      const items = await data.json();
      this.setState({ podcastData: items });
    } catch (error) {
      console.log(error)
    }
  }

  retrievePodcastEpisodes = async (id) => {
    try {
      const data = await fetch(`https://listen-api.listennotes.com/api/v2/podcasts/${id}?sort=recent_first`, { headers: { 'X-ListenAPI-Key': '3a211ed493854712a4988f11318d91f0' } });
      const items = await data.json();
      this.setState({ episodes: items })
    } catch (error) {
      console.log(error)
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
      const { sound, status } = await Audio.Sound.createAsync({ uri: uri }, initialStatus, this._onPlaybackStatusUpdate)
      //await soundObject.loadAsync('https://f.bktrksfn.com/users/proj/79648b6c-b480-11e9-9a71-0efe278d1810/src/WhatsGoodGames-2019.07.31-EP-116-final-audio-mix.mp3');
      /* await sound.playAsync(); */
    } catch (error) {
      console.log(error)
    }
  }

  pauseTrack = () => {
    console.log("Inside pause")
    soundObject.pauseAsync();
  }



  render() {
    let results;
    if ("results" in this.state.podcastData) {
      results = this.state.podcastData.results.map(podcast => {
        return (
          <TouchableOpacity key={podcast.itunes_id} onPress={() => this.retrievePodcastEpisodes(podcast.id)}>
            <Image source={{ uri: podcast.image }} style={{ width: 100, height: 100 }}></Image>
          </TouchableOpacity>
        )
      })
    }

    let episodes
    if (Object.keys(this.state.episodes).length > 0) {
      episodes = this.state.episodes.episodes.map((episode) => {
        return (
          <Text key={episode.id} onPress={() => this.playTrack(episode.audio)}>{episode.title}</Text>
        )
      })
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(term) => this.setState({ term })}
          value={this.state.term}
        />
        <Button title="Search" onPress={this.retrievePodcastData}></Button>
        <Button title="Play" onPress={this.playTrack}></Button>
        <Button title="Pause" onPress={this.pauseTrack}></Button>
        <View style={styles.podcastImageContainer}>{results}</View>
        <View>{episodes}</View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  podcastImageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});
