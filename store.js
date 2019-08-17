import { createStore } from 'redux';

const fetchRecipes = data => {
  const newAction = {
    type: "FETCH_RECIPES",
    data: data
  };
  return newAction;
};

const fetchPodcastData = data => {
  const newAction = {
    type: "FETCH_PODCASTDATA",
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

const initialState = {
  podcastData: [],
  query: "",
  episodes: [],
  episodeURI: "",
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
  showPlayMenu: false
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
      return copiedState;
    }
    case "PLAY_EPISODE": {
      const copiedState = Object.assign({}, state);
      copiedState.showPlayMenu = true;
      copiedState.episodeURI = action.data;
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