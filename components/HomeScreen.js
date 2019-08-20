import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import Constants from 'expo-constants';
import PodcastList from "./PodcastList";
import Featured from "./Featured";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Discover",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "black"
      },
      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        flex: 1
      },
      headerRight: (<View />)
    };
  };

  componentDidMount() {
    const featuredID = [140, 143, 138, 104, 77, 99, 133, 127];
    const first = featuredID[3];
    const second = featuredID[6]
    this.props.fetchFeatured(first, second)
  }


  retrievePodcastData = async () => {
    try {
      this.props.fetchPodcastData(this.props.query);
      this.props.navigation.navigate('Results')
    } catch (error) {
      console.log(error)
    }
  }

  retrievePodcastEpisodes = async (id) => {
    try {
      this.props.fetchEpisodes(id);
      this.props.navigation.navigate('Episodes')
    } catch (error) {
      console.log(error)
    }
  }

  handleOnchange = (text) => {
    this.props.onChange(text);
    this.props.fetchPodcastData(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            onChangeText={this.handleOnchange}
            value={this.props.query}
            placeholder="Search Podcasts"
            underlineColorAndroid="black"
          />
        </View>
        {/* <ScrollView>
          <PodcastList fetchEpisodes={this.retrievePodcastEpisodes}></PodcastList>
          <Featured fetchEpisodes={this.retrievePodcastEpisodes}></Featured>
        </ScrollView> */}
        <ScrollView>
          {this.props.podcastData.length !== 0 &&
            <View>
              <PodcastList fetchEpisodes={this.retrievePodcastEpisodes}></PodcastList>
            </View>
          }

          <Featured fetchEpisodes={this.retrievePodcastEpisodes}></Featured>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  searchBar: {
    width: "95%",
  },
  searchInput: {
    height: 50,
    borderColor: 'gray',
    color: "white",
    backgroundColor: "black",
    borderRadius: 6,
    marginTop: 10,
    textAlign: "center",
  }
});


const mapStateToProps = state => {
  return {
    query: state.query,
    podcastData: state.podcastData
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
    fetchEpisodes: async (id) => {
      const episodes = await axios(`https://listen-api.listennotes.com/api/v2/podcasts/${id}?sort=recent_first`, { headers: { 'X-ListenAPI-Key': Constants.manifest.extra.apiKey } });
      dispatch({
        type: "FETCH_EPISODES",
        data: episodes.data
      });
    },
    fetchFeatured: async (first, second) => {
      const firstFeature = await axios(`https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${first}&page=2`, { headers: { 'X-ListenAPI-Key': Constants.manifest.extra.apiKey } })
      const secondFeature = await axios(`https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${second}&page=2`, { headers: { 'X-ListenAPI-Key': Constants.manifest.extra.apiKey } })
      dispatch({
        type: "FETCH_FEATURED",
        data: { firstFeature, secondFeature }
      })
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