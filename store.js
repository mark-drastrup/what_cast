import { createStore } from 'redux';

const fetchPodcastData = data => {
  const newAction = {
    type: "FETCH_PODCASTDATA",
    data: data
  }
  return newAction;
}

const fetchFeatured = data => {
  const newAction = {
    type: "FETCH_FEATURED",
    data: data
  }
  return newAction;
}

const updateQuery = data => {
  const newAction = {
    type: "UPDATE_QUERY",
    data: data
  }
  return newAction
}

const fetchEpisodes = data => {
  const newAction = {
    type: "FETCH_EPISODES",
    data: data
  }
  return newAction
}

const playEpisode = data => {
  const newAction = {
    type: "PLAY_EPISODE",
    data: data
  }
  return newAction;
}

const setEpisode = data => {
  const newAction = {
    type: "SET_EPISODE",
    data: data
  }
  return newAction;
}

const updateEpisodeData = data => {
  const newAction = {
    type: "UPDATE_EPISODE_DATA",
    data: data
  }
  return newAction;
}

const playPause = () => {
  const newAction = {
    type: "PLAY_PAUSE"
  }
  return newAction;
}

const sliderValueChange = () => {
  const newAction = {
    type: "SLIDER_VALUE_CHANGE"
  }
  return newAction;
}

const sliderSlidingComplete = () => {
  const newAction = {
    type: "SLIDER_VALUE_COMPLETE"
  }
  return newAction;
}

const fetchRandomEpisode = data => {
  const newAction = {
    type: "FETCH_RANDOM_EPISODE",
    data: data
  }
  return newAction;
}

const changeActiveView = data => {
  const newAction = {
    type: "CHANGE_ACTIVE_VIEW",
    data: data
  }
  return newAction;
}

const initialState = {
  podcastData: [],
  query: "",
  episodes: [],
  firstFeatured: {
    name: "",
    podcasts: []
  },
  secondFeatured: {
    name: "",
    podcasts: []
  },
  thirdFeatured: {
    name: "",
    podcasts: []
  },
  fourthFeatured: {
    name: "",
    podcasts: []
  },
  activeView: "Random",
  randomEpisode: {},
  episodeURI: "",
  podcastName: "",
  currentlyPlaying: "",
  selectedPodcastImage: "",
  selectedPodcastDescription: "",
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
  showPlayMenu: false,
  hasRandomEpisode: false,
  hasFeatured: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PODCASTDATA": {
      const copiedState = Object.assign({}, state);
      copiedState.podcastData = [...action.data.results];
      return copiedState;
    }
    case "UPDATE_QUERY": {
      const copiedState = Object.assign({}, state);
      copiedState.query = action.data;
      return copiedState;
    }
    case "FETCH_EPISODES": {
      const copiedState = Object.assign({}, state);
      copiedState.episodes = [...action.data.episodes];
      copiedState.selectedPodcastImage = action.data.image;
      copiedState.selectedPodcastDescription = action.data.description;
      copiedState.podcastName = action.data.title
      return copiedState;
    }
    case "FETCH_RANDOM_EPISODE": {
      const copiedState = Object.assign({}, state);
      copiedState.randomEpisode = [action.data];
      copiedState.hasRandomEpisode = true;
      return copiedState;
    }
    case "FETCH_FEATURED": {
      const copiedState = Object.assign({}, state);
      copiedState.firstFeatured.name = action.data.firstFeature.data.name;
      copiedState.firstFeatured.podcasts = [...action.data.firstFeature.data.podcasts];
      copiedState.secondFeatured.name = action.data.secondFeature.data.name;
      copiedState.secondFeatured.podcasts = [...action.data.secondFeature.data.podcasts];
      copiedState.thirdFeatured.name = action.data.thirdFeature.data.name;
      copiedState.thirdFeatured.podcasts = [...action.data.thirdFeature.data.podcasts];
      copiedState.fourthFeatured.name = action.data.fourthFeature.data.name;
      copiedState.fourthFeatured.podcasts = [...action.data.fourthFeature.data.podcasts];
      copiedState.hasFeatured = true;
      return copiedState;
    }
    case "PLAY_EPISODE": {
      const copiedState = Object.assign({}, state);
      copiedState.showPlayMenu = true;
      copiedState.episodeURI = action.data.uri;
      copiedState.currentlyPlaying = action.data.id
      return copiedState;
    }
    case "SET_EPISODE": {
      const copiedState = Object.assign({}, state);
      copiedState.playbackInstance = action.data;
      copiedState.isPlaying = true;
      return copiedState;
    }
    case "UPDATE_EPISODE_DATA": {
      let copiedState = Object.assign({}, state);
      copiedState = Object.assign(copiedState, action.data);
      return copiedState;
    }
    case "PLAY_PAUSE": {
      const copiedState = Object.assign({}, state);
      copiedState.isPlaying = !copiedState.isPlaying;
      return copiedState;
    }
    case "SLIDER_VALUE_CHANGE": {
      const copiedState = Object.assign({}, state);
      copiedState.isSeeking = true;
      copiedState.shouldPlayAtEndOfSeek = copiedState.shouldPlay;
      return copiedState;
    }
    case "SLIDER_VALUE_COMPLETE": {
      const copiedState = Object.assign({}, state);
      copiedState.isSeeking = false;
      return copiedState;
    }
    case "CHANGE_ACTIVE_VIEW": {
      const copiedState = Object.assign({}, state);
      copiedState.activeView = action.data;
      return copiedState;
    }
    default: {
      return state;
    }
  }
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;