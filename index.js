const axios = require("axios");
const fs = require("fs");
require("dotenv").config();
const pgb = require("progress");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

async function fetchAllVideos(pageToken = "") {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&type=video&maxResults=50&pageToken=${pageToken}`;
  const response = await axios.get(url);
  return response.data;
}

async function getTotalDurations() {
  let totalDuration = 0;
  let totalLiveDuration = 0;
  let nextPageToken = "";
  let hasNextPage = true;
  let totalVideos = 0;
  let processedVideos = 0;

  const initialData = await fetchAllVideos();
  totalVideos = initialData.pageInfo.totalResults;

  const progressBar = new pgb("Progress: :etas, [:bar] :percent, :etas", {  
    complete: "=",
    incomplete: " ",
    width: 50,
    total: totalVideos,
  });

  while (hasNextPage) {
    const data = await fetchAllVideos(nextPageToken);
    const videos = data.items;

    for (let video of videos) {
      const videoId = video.id.videoId;
      const videoDetails = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,liveStreamingDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
      );
      const details = videoDetails.data.items[0];

      const duration = details.contentDetails.duration;
      const seconds = conversionISO8601Duration(duration);

      totalDuration += seconds;

      if (details.liveStreamingDetails) {
        totalLiveDuration += seconds;
      }

      processedVideos++;
      progressBar.tick();
    }

    nextPageToken = data.nextPageToken;
    hasNextPage = !!nextPageToken;
  }

  if (processedVideos < totalVideos) {
    progressBar.tick(totalVideos - processedVideos);
  }

  const totalDurationInHours = (totalDuration / 3600).toFixed(2);
  const totalLiveDurationInHours = (totalLiveDuration / 3600).toFixed(2);

  const output = `\nTotal time in hours of all videos: ${totalDurationInHours} hours.
  \nTotal time in hours of live videos recorded: ${totalLiveDurationInHours} hours.`;

  fs.writeFileSync("totaltime.txt", output);

  console.log("\nDone! Please check totaltime.txt file for the results.");
}

function conversionISO8601Duration(duration) {
  let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  let hours = parseInt(match[1]) || 0;
  let minutes = parseInt(match[2]) || 0;
  let seconds = parseInt(match[3]) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

getTotalDurations().catch(console.error);
