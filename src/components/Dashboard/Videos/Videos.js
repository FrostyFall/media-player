import { useState } from "react"
import PlayingVideo from "../PlayingVideo/PlayingVideo"
import RecommendedVideos from "../RecommendedVideos/RecommendedVideos"
import TrendingVideos from "../TrendingVideos/TrendingVideos"

const Videos = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  
  return (
    <>
      <PlayingVideo playingVideo={playingVideo} />
      <RecommendedVideos setPlayingVideo={setPlayingVideo} />
      <TrendingVideos setPlayingVideo={setPlayingVideo} />
    </>
  )
}

export default Videos