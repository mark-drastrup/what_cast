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
    podcast: []
  },
  activeView: "Home",
  randomEpisode: {},
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
  showPlayMenu: false,
  hasRandomEpisode: false,
  mockData: [
    {
      rss: 'https://www.listennotes.com/c/r/566ff1b0697c474283cef5a7bfc98e8a',
      description_highlighted: '...A weekly video <span class="ln-search-highlight">game</span> podcast for the nerd-inclined!',
      description_original: 'A weekly video game podcast for the nerd-inclined! Join Andrea Rene, Brittney Brombacher and Kristine Steimer as they analyze the week\'s video game news, give hands-on impressions of upcoming titles, discuss your questions, and have a little bit of "off topic" conversation. Also, what\'s a gaming podcast without some alcohol from time to time?',
      title_highlighted: 'What\'s Good <span class="ln-search-highlight">Games</span>: A Video <span class="ln-search-highlight">Game</span> Podcast',
      title_original: 'What\'s Good Games: A Video Game Podcast',
      publisher_highlighted: 'What\'s Good <span class="ln-search-highlight">Games</span>',
      publisher_original: 'What\'s Good Games',
      image: 'https://cdn-images-1.listennotes.com/podcasts/whats-good-games-a-video-game-podcast-whats-HDuobZczTxj-GoZRVBe3y-0.300x300.jpg',
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/whats-good-games-a-video-game-podcast-whats-HDuobZczTxj-GoZRVBe3y-0.300x300.jpg',
      itunes_id: 1239568910,
      latest_pub_date_ms: 1565964000000,
      earliest_pub_date_ms: 1495184398125,
      id: '566ff1b0697c474283cef5a7bfc98e8a',
      genre_ids: [
        85,
        83,
        82
      ],
      listennotes_url: 'https://www.listennotes.com/c/566ff1b0697c474283cef5a7bfc98e8a/',
      total_episodes: 130,
      email: 'contact@whatsgoodgames.com',
      explicit_content: false
    },
    {
      rss: 'https://www.listennotes.com/c/r/29eaebf141384c2a9ba3aa78fca92632',
      description_highlighted: '...Tom Vasel and Eric Summerer take a look at board <span class="ln-search-highlight">games</span>, card <span class="ln-search-highlight">games</span>, and the people who design, publish, and play them.\n\nTop ten lists, Q&amp;A, tales of horror, and more await you!',
      description_original: 'Tom Vasel and Eric Summerer take a look at board games, card games, and the people who design, publish, and play them.\n\nTop ten lists, Q&amp;A, tales of horror, and more await you!',
      title_highlighted: 'The Dice Tower',
      title_original: 'The Dice Tower',
      publisher_highlighted: 'Tom Vasel and Eric Summerer',
      publisher_original: 'Tom Vasel and Eric Summerer',
      image: 'https://cdn-images-1.listennotes.com/podcasts/the-dice-tower-tom-vasel-and-eric-summerer-I5ShUodZQEA-yFjZtnz5PI-.300x300.jpg',
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/the-dice-tower-tom-vasel-and-eric-summerer-I5ShUodZQEA-yFjZtnz5PI-.300x300.jpg',
      itunes_id: 105924375,
      latest_pub_date_ms: 1565714096000,
      earliest_pub_date_ms: 1147892400636,
      id: '29eaebf141384c2a9ba3aa78fca92632',
      genre_ids: [
        83,
        82
      ],
      listennotes_url: 'https://www.listennotes.com/c/29eaebf141384c2a9ba3aa78fca92632/',
      total_episodes: 638,
      email: 'dicetower@gmail.com',
      explicit_content: false
    },
    {
      rss: 'https://www.listennotes.com/c/r/9cf19c590ff0484d97b18b329fed0c6a',
      description_highlighted: '...Join The Ringer’s Mallory Rubin and Jason Concepcion as they take their signature deep dive on the final season of ‘<span class="ln-search-highlight">Game</span> of Thrones.’',
      description_original: '\n      Winter is here! Join The Ringer’s Mallory Rubin and Jason Concepcion as they take their signature deep dive on the final season of ‘Game of Thrones.’\n    ',
      title_highlighted: 'Binge Mode: <span class="ln-search-highlight">Game</span> of Thrones',
      title_original: 'Binge Mode: Game of Thrones',
      publisher_highlighted: 'The Ringer',
      publisher_original: 'The Ringer',
      image: 'https://cdn-images-1.listennotes.com/podcasts/binge-mode-game-of-thrones-the-ringer-QNxYJCjfL5t-BdPpshCaFDu.300x300.jpg',
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/binge-mode-game-of-thrones-the-ringer-QNxYJCjfL5t-BdPpshCaFDu.300x300.jpg',
      itunes_id: 1243247464,
      latest_pub_date_ms: 1564048800000,
      earliest_pub_date_ms: 1496277111178,
      id: '9cf19c590ff0484d97b18b329fed0c6a',
      genre_ids: [
        162,
        68
      ],
      listennotes_url: 'https://www.listennotes.com/c/9cf19c590ff0484d97b18b329fed0c6a/',
      total_episodes: 180,
      email: 'info@theringer.com',
      explicit_content: true
    },
    {
      rss: 'https://www.listennotes.com/c/r/482434b03ffc4999bd6ee95974a5d539',
      description_highlighted: '...NBA, NBA Draft and College Basketball Expert Sam Vecenie talks all levels of hoops.',
      description_original: 'NBA, NBA Draft and College Basketball Expert Sam Vecenie talks all levels of hoops.',
      title_highlighted: '<span class="ln-search-highlight">Game</span> Theory Podcast',
      title_original: 'Game Theory Podcast',
      publisher_highlighted: 'CLNS Media Network',
      publisher_original: 'CLNS Media Network',
      image: 'https://cdn-images-1.listennotes.com/podcasts/game-theory-podcast-north-station-media-llc-8aQAVIlS-OE.300x300.jpg',
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/game-theory-podcast-north-station-media-llc-8aQAVIlS-OE.300x300.jpg',
      itunes_id: 1054081827,
      latest_pub_date_ms: 1565746811000,
      earliest_pub_date_ms: 1446076800000,
      id: '482434b03ffc4999bd6ee95974a5d539',
      genre_ids: [
        77,
        78,
        80,
        122,
        137
      ],
      listennotes_url: 'https://www.listennotes.com/c/482434b03ffc4999bd6ee95974a5d539/',
      total_episodes: 331,
      email: 'info@clnsmedia.com',
      explicit_content: false
    },
    {
      rss: 'https://www.listennotes.com/c/r/ea1e451233aa4df98442965136fe0b63',
      description_highlighted: '...Stream over 400 episodes podcasting HBO\'s <span class="ln-search-highlight">Game</span> of Thrones and George R.R. Martin\'s A Song of Ice and Fire.',
      description_original: 'Stream over 400 episodes podcasting HBO\'s Game of Thrones and George R.R. Martin\'s A Song of Ice and Fire. Watch along, read along, join the show season by season, chapter by chapter, with visits from actors, artisans, and producers of the series.',
      title_highlighted: '<span class="ln-search-highlight">Game</span> of Owns - The <span class="ln-search-highlight">Game</span> of Thrones podcast',
      title_original: 'Game of Owns - The Game of Thrones podcast',
      publisher_highlighted: 'Hannah Hosking & Zack Luye',
      publisher_original: 'Hannah Hosking & Zack Luye',
      image: 'https://cdn-images-1.listennotes.com/podcasts/game-of-owns-the-game-of-thrones-podcast-lS_tIb4onLP.300x300.jpg',
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/game-of-owns-the-game-of-thrones-podcast-lS_tIb4onLP.300x300.jpg',
      itunes_id: 515824283,
      latest_pub_date_ms: 1564369932000,
      earliest_pub_date_ms: 1332889740431,
      id: 'ea1e451233aa4df98442965136fe0b63',
      genre_ids: [
        162,
        68,
        100,
        104
      ],
      listennotes_url: 'https://www.listennotes.com/c/ea1e451233aa4df98442965136fe0b63/',
      total_episodes: 434,
      email: 'contact@gameofowns.com',
      explicit_content: true
    },
    {
      rss: 'https://www.listennotes.com/c/r/acc1512a42c240c7a493bf0aa580233a',
      description_highlighted: '...Intelligent and challenging quiz <span class="ln-search-highlight">games</span> on BBC Radio 4. Featuring Round Britain Quiz, Counterpoint and Brain of Britain with Quiz Masters including Paul Gambaccini.',
      description_original: 'Intelligent and challenging quiz games on BBC Radio 4. Featuring Round Britain Quiz, Counterpoint and Brain of Britain with Quiz Masters including Paul Gambaccini.',
      title_highlighted: 'Radio 4 Quiz',
      title_original: 'Radio 4 Quiz',
      publisher_highlighted: 'BBC Radio 4',
      publisher_original: 'BBC Radio 4',
      image: 'https://cdn-images-1.listennotes.com/podcasts/radio-4-quiz-bbc-radio-4-JCORMHgFak0.300x300.jpg',
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/radio-4-quiz-bbc-radio-4-JCORMHgFak0.300x300.jpg',
      itunes_id: 456574751,
      latest_pub_date_ms: 1563201120000,
      earliest_pub_date_ms: 1546875120000,
      id: 'acc1512a42c240c7a493bf0aa580233a',
      genre_ids: [
        83,
        82
      ],
      listennotes_url: 'https://www.listennotes.com/c/acc1512a42c240c7a493bf0aa580233a/',
      total_episodes: 13,
      email: 'RadioMusic.Support@bbc.co.uk',
      explicit_content: false
    },
    {
      rss: 'https://www.listennotes.com/c/r/aca4eac37237414f98bd473dc0692a96',
      description_highlighted: '...The staff of <span class="ln-search-highlight">Game</span> Informer chat it up each week bout the latest news, previews and reviews from the <span class="ln-search-highlight">game</span> industry.',
      description_original: 'The staff of Game Informer chat it up each week bout the latest news, previews and reviews from the game industry. Each show will cover the weeks hot topics plus the games you\'re looking forward to or may not know about yet. Subscribe today!',
      title_highlighted: 'The <span class="ln-search-highlight">Game</span> Informer Show',
      title_original: 'The Game Informer Show',
      publisher_highlighted: '<span class="ln-search-highlight">Game</span> Informer',
      publisher_original: 'Game Informer',
      image: 'https://cdn-images-1.listennotes.com/podcasts/the-game-informer-show-game-informer-OU9j_foASYB.300x300.jpg',
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/the-game-informer-show-game-informer-OU9j_foASYB.300x300.jpg',
      itunes_id: 335246945,
      latest_pub_date_ms: 1565892000000,
      earliest_pub_date_ms: 1528412400000,
      id: 'aca4eac37237414f98bd473dc0692a96',
      genre_ids: [
        85,
        82
      ],
      listennotes_url: 'https://www.listennotes.com/c/aca4eac37237414f98bd473dc0692a96/',
      total_episodes: 84,
      email: 'podcast@gameinformer.com',
      explicit_content: false
    },
    {
      rss: 'https://www.listennotes.com/c/r/4e1ad633814843e08d1d5d21e6e68d11',
      description_highlighted: '...Topics include discussion of <span class="ln-search-highlight">games</span> from publishers such as Asmodee, Cool Mini or Not, Fantasy Fight <span class="ln-search-highlight">Games</span>, Wizards of the Coast, Z-Man <span class="ln-search-highlight">Games</span>, Days of Wonder, <span class="ln-search-highlight">Games</span> Workshop, Plaid Hat <span class="ln-search-highlight">Games</span> and more.',
      description_original: 'Five old friends of more than 20 years come together to produce a high quality, bi-weekly podcast about tabletop gaming of all kinds: board games, card games, miniatures, role-playing games and much more. In each episode you can expect board game reviews, gaming industry news and round-table discussions. The Founders, Jamie, Tony, Chris, Steve and Brian, each have varying tastes in gaming to provide a variety of viewpoints. Since 2011, over 100 full length episodes and now more with our new additional show, The Secret Cabal Express, The Secret Cabal has grown to one of the most successful tabletop gaming podcasts in the community. The Founders continue striving to offer irreverent entertainment, thoughtful commentary and enthusiasm about a hobby we love. Topics include discussion of games from publishers such as Asmodee, Cool Mini or Not, Fantasy Fight Games, Wizards of the Coast, Z-Man Games, Days of Wonder, Games Workshop, Plaid Hat Games and more.',
      title_highlighted: 'The Secret Cabal Gaming Podcast',
      title_original: 'The Secret Cabal Gaming Podcast',
      publisher_highlighted: 'The Secret Cabal Founders',
      publisher_original: 'The Secret Cabal Founders',
      image: 'https://cdn-images-1.listennotes.com/podcasts/the-secret-cabal-gaming-podcast-the-secret-2I18ZOscpB_.300x300.jpg',
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/the-secret-cabal-gaming-podcast-the-secret-2I18ZOscpB_.300x300.jpg',
      itunes_id: 465081916,
      latest_pub_date_ms: 1565762100000,
      earliest_pub_date_ms: 1315414800276,
      id: '4e1ad633814843e08d1d5d21e6e68d11',
      genre_ids: [
        85,
        83,
        82
      ],
      listennotes_url: 'https://www.listennotes.com/c/4e1ad633814843e08d1d5d21e6e68d11/',
      total_episodes: 285,
      email: 'jamie@thesecretcabal.com',
      explicit_content: false
    },
    {
      rss: 'https://www.listennotes.com/c/r/382055d478624f5f9a4722bfd1516d71',
      description_highlighted: '...Join Waypoint\'s Austin Walker, Danielle Riendeau, Rob Zacny, Patrick Klepek, and Natalie Watson three times a week, as they break down the biggest stories in video <span class="ln-search-highlight">games</span>, talk about their favorite media',
      description_original: 'What\'s good, Internet? Join Waypoint\'s Austin Walker, Danielle Riendeau, Rob Zacny, Patrick Klepek, and Natalie Watson three times a week, as they break down the biggest stories in video games, talk about their favorite media, and unfairly compare everything to Dark Souls.',
      title_highlighted: 'Waypoint Radio',
      title_original: 'Waypoint Radio',
      publisher_highlighted: 'VICE',
      publisher_original: 'VICE',
      image: 'https://cdn-images-1.listennotes.com/podcasts/waypoint-radio-vice-ebsnACzaO45.300x300.jpg',
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/waypoint-radio-vice-ebsnACzaO45.300x300.jpg',
      itunes_id: 1159170164,
      latest_pub_date_ms: 1565949637000,
      earliest_pub_date_ms: 1475009580367,
      id: '382055d478624f5f9a4722bfd1516d71',
      genre_ids: [
        85,
        83,
        86,
        82
      ],
      listennotes_url: 'https://www.listennotes.com/c/382055d478624f5f9a4722bfd1516d71/',
      total_episodes: 398,
      email: 'podcast@vice.com',
      explicit_content: false
    },
    {
      rss: 'https://www.listennotes.com/c/r/3371fd6ff76942868073f28640556b7e',
      description_highlighted: '...The official podcast of GamersWithJobs.com, every week the guys discuss the latest <span class="ln-search-highlight">games</span>, issues affecting the industry and more! This is THE gaming podcast for mature <span class="ln-search-highlight">gamers</span>.',
      description_original: 'The official podcast of GamersWithJobs.com, every week the guys discuss the latest games, issues affecting the industry and more! This is THE gaming podcast for mature gamers.',
      title_highlighted: '<span class="ln-search-highlight">Gamers</span> With Jobs - Conference Call',
      title_original: 'Gamers With Jobs - Conference Call',
      publisher_highlighted: '<span class="ln-search-highlight">Gamers</span> With Jobs',
      publisher_original: 'Gamers With Jobs',
      image: 'https://cdn-images-1.listennotes.com/podcasts/gamers-with-jobs-conference-call-gamers-gQMc7NaKv94.300x300.jpg',
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/gamers-with-jobs-conference-call-gamers-gQMc7NaKv94.300x300.jpg',
      itunes_id: 175107566,
      latest_pub_date_ms: 1565756161000,
      earliest_pub_date_ms: 1262743609533,
      id: '3371fd6ff76942868073f28640556b7e',
      genre_ids: [
        85,
        82
      ],
      listennotes_url: 'https://www.listennotes.com/c/3371fd6ff76942868073f28640556b7e/',
      total_episodes: 619,
      email: 'call@gamerswithjobs.com',
      explicit_content: false
    }
  ],
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
    case "FETCH_RANDOM_EPISODE": {
      const copiedState = Object.assign({}, state);
      copiedState.randomEpisode = [action.data];
      copiedState.hasRandomEpisode = true;
      return copiedState;
    }
    case "FETCH_FEATURED": {
      const copiedState = Object.assign({}, state);
      copiedState.firstFeatured.name = action.data.firstFeature.data.name
      copiedState.firstFeatured.podcasts = [...action.data.firstFeature.data.podcasts]
      copiedState.secondFeatured.name = action.data.secondFeature.data.name
      copiedState.secondFeatured.podcasts = [...action.data.secondFeature.data.podcasts]
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