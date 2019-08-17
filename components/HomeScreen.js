import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerStyle: {
        backgroundColor: "black"
      },
      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        flex: 1
      }
    };
  };


  retrievePodcastData = async () => {
    try {
      this.props.fetchPodcastData(this.props.query);
      this.props.navigation.navigate('Results')
    } catch (error) {
      console.log(error)
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