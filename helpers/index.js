import Constants from "expo-constants";
import axios from "axios";

export function convertToPlaytime(seconds) {
  seconds = Number(seconds);
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);

  var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
  return hDisplay + mDisplay;
}

export const fetchFeaturedPodcasts = async ids => {
  const podcasts = [];
  for (let i = 0; i < 4; i++) {
    var index = Math.floor(Math.random() * ids.length);
    const response = await axios(
      `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${ids[index]}&page=2`,
      { headers: { "X-ListenAPI-Key": Constants.manifest.extra.apiKey } }
    );
    ids.splice(index, 1);
    podcasts.push(response);
  }
  return podcasts;
};
