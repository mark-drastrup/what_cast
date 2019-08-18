import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { bold } from 'ansi-colors';


class Podcastlist extends Component {
  state = {
    episodes: {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Podcasts",
      headerStyle: {
        backgroundColor: "black"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff",
        flex: 1
      }
    };
  };

  retrievePodcastEpisodes = async (id) => {
    try {
      this.props.fetchEpisodes(id);
      this.props.navigation.navigate('Episodes')
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    let results;
    /* if (this.props.podcastData.length !== 0) {
      results = this.props.podcastData.map(podcast => {
        return (
          <TouchableOpacity key={podcast.itunes_id} onPress={() => this.props.fetchEpisodes(podcast.id)}>
            <Image source={{ uri: podcast.image }} style={{ width: 100, height: 100 }}></Image>
          </TouchableOpacity>
        )
      })
    } */

    results = this.props.mock.map(podcast => {
      return (
        <TouchableOpacity key={podcast.itunes_id} onPress={() => this.props.fetchEpisodes(podcast.id)} style={styles.podcast}>
          <Image source={{ uri: podcast.image }} style={styles.image}></Image>
          <View style={{ width: 150, flexDirection: "row" }}>
            <Text style={[styles.description, styles.descriptionTitle]} numberOfLines={1} ellipsizeMode="clip">{podcast.title_original}</Text>
          </View>
          <View style={{ width: 150, flexDirection: "row" }}>
            <Text style={[styles.description, styles.descriptionPublisher]} numberOfLines={1} ellipsizeMode="clip">{podcast.publisher_original}</Text>
          </View>
        </TouchableOpacity>
      )
    })

    return (
      <>
        <View style={styles.podcastList}>
          <Text style={styles.resultText}>Search Results</Text>
          <ScrollView style={styles.podcastImageContainer} horizontal="true">
            {results}
          </ScrollView>
        </View>
        <View
          style={{
            borderBottomColor: '#404040',
            borderBottomWidth: 1,
            width: "95%",
            alignSelf: "center",
            marginTop: 20
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  podcastList: {
    marginTop: 10,
    marginLeft: 10,
    flex: 1
  },
  podcast: {
    marginRight: 15
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 6
  },
  description: {
    color: "white"
  },
  descriptionTitle: {
    fontSize: 16,
  },
  descriptionPublisher: {
    fontSize: 14,
    color: "lightgray"
  },
  podcastImageContainer: {
    flexDirection: "row",
    flex: 1
  },
  resultText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    width: "50%",
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  return {
    podcastData: state.podcastData,
    query: state.query,
    mock: state.mockData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchEpisodes: async (id) => {
      const episodes = await axios(`https://listen-api.listennotes.com/api/v2/podcasts/${id}?sort=recent_first`, { headers: { 'X-ListenAPI-Key': Constants.manifest.extra.apiKey } });
      dispatch({
        type: "FETCH_EPISODES",
        data: episodes.data
      });
    },
  };
};
export default connect(
  mapStateToProps,
  null
)(Podcastlist);