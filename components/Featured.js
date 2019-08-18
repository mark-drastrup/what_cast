import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

class Featured extends Component {
  render() {
    let first;
    let second;
    if (this.props.firstFeature.length !== 0 && this.props.secondFeature.length !== 0) {
      first = this.props.firstFeature.map(podcast => {
        return (
          <TouchableOpacity key={podcast.itunes_id} onPress={() => this.props.fetchEpisodes(podcast.id)} style={styles.podcast}>
            <Image source={{ uri: podcast.image }} style={styles.image}></Image>
            <View style={{ width: 150, flexDirection: "row" }}>
              <Text style={[styles.description, styles.descriptionTitle]} numberOfLines={1} ellipsizeMode="clip">{podcast.title}</Text>
            </View>
            <View style={{ width: 150, flexDirection: "row" }}>
              <Text style={[styles.description, styles.descriptionPublisher]} numberOfLines={1} ellipsizeMode="clip">{podcast.publisher}</Text>
            </View>
          </TouchableOpacity>
        )
      })

      second = this.props.secondFeature.map(podcast => {
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
    }
    return (
      <>
        <View style={styles.podcastList}>
          <Text style={styles.resultText}>{this.props.firstFeatureTitle}</Text>
          <ScrollView style={styles.podcastImageContainer} horizontal="true">
            {first}
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
        <View style={styles.podcastList}>
          <Text style={styles.resultText}>{this.props.secondFeatureTitle}</Text>
          <ScrollView style={styles.podcastImageContainer} horizontal="true">
            {second}
          </ScrollView>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  podcastList: {
    marginTop: 10,
    marginLeft: 10,
    flex: 1
  },
  podcast: {
    marginRight: 15,
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
    firstFeature: state.firstFeatured.podcasts,
    firstFeatureTitle: state.firstFeatured.name,
    secondFeature: state.secondFeatured.podcasts,
    secondFeatureTitle: state.secondFeatured.name
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
)(Featured);