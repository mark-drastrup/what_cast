import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Constants from "expo-constants";
import PodcastList from "./PodcastList";
import Featured from "./Featured";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator
} from "react-native";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Discover",
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

  componentDidMount() {
    //This is a list of ids for featured podcast genres on the discover page
    const featuredID = [140, 143, 138, 104, 77, 99, 133, 127];
    const first = this.getRandomFeaturedCategory(featuredID);
    const second = this.getRandomFeaturedCategory(featuredID);
    const third = this.getRandomFeaturedCategory(featuredID);
    const fourth = this.getRandomFeaturedCategory(featuredID);
    this.props.fetchFeatured(first, second, third, fourth);
  }

  getRandomFeaturedCategory = featuredIdArray => {
    return featuredIdArray.splice(
      Math.floor(Math.random() * featuredIdArray.length),
      1
    );
  };

  retrievePodcastEpisodes = async id => {
    try {
      this.props.fetchEpisodes(id);
      this.props.navigation.navigate("Episodes");
    } catch (error) {
      console.log(error);
    }
  };

  handleOnchange = text => {
    this.props.onChange(text);
    this.props.fetchPodcastData(text);
  };

  render() {
    if (this.props.hasFeatured) {
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
          <ScrollView>
            {this.props.podcastData.length !== 0 && (
              <View>
                <PodcastList
                  fetchEpisodes={this.retrievePodcastEpisodes}
                ></PodcastList>
              </View>
            )}
            <Featured fetchEpisodes={this.retrievePodcastEpisodes}></Featured>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#36aee3" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1a1a1a"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#1a1a1a"
  },
  searchBar: {
    width: "95%"
  },
  searchInput: {
    height: 50,
    borderColor: "gray",
    color: "white",
    backgroundColor: "black",
    borderRadius: 6,
    marginTop: 10,
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return {
    query: state.query,
    podcastData: state.podcastData,
    hasFeatured: state.hasFeatured
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchPodcastData: async query => {
      const podcasts = await axios(
        `https://listen-api.listennotes.com/api/v2/search?q=${query}&type=podcast`,
        { headers: { "X-ListenAPI-Key": Constants.manifest.extra.apiKey } }
      );
      dispatch({
        type: "FETCH_PODCASTDATA",
        data: podcasts.data
      });
    },
    fetchEpisodes: async id => {
      const episodes = await axios(
        `https://listen-api.listennotes.com/api/v2/podcasts/${id}?sort=recent_first`,
        { headers: { "X-ListenAPI-Key": Constants.manifest.extra.apiKey } }
      );
      dispatch({
        type: "FETCH_EPISODES",
        data: episodes.data
      });
    },
    fetchFeatured: async (first, second, third, fourth) => {
      const firstFeature = await axios(
        `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${first}&page=2`,
        { headers: { "X-ListenAPI-Key": Constants.manifest.extra.apiKey } }
      );
      const secondFeature = await axios(
        `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${second}&page=2`,
        { headers: { "X-ListenAPI-Key": Constants.manifest.extra.apiKey } }
      );
      const thirdFeature = await axios(
        `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${third}&page=2`,
        { headers: { "X-ListenAPI-Key": Constants.manifest.extra.apiKey } }
      );
      const fourthFeature = await axios(
        `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${fourth}&page=2`,
        { headers: { "X-ListenAPI-Key": Constants.manifest.extra.apiKey } }
      );
      dispatch({
        type: "FETCH_FEATURED",
        data: { firstFeature, secondFeature, thirdFeature, fourthFeature }
      });
    },
    onChange: text => {
      dispatch({
        type: "UPDATE_QUERY",
        data: text
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
