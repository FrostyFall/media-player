import TrendVideo from '../TrendVideo/TrendVideo';
import { UserData } from "../../../Application"
import { useContext } from "react";

const TrendingVideos = ({ setPlayingVideo }) => {
  const { data, isLoading, error } = useContext(UserData); 

  return (
    <div className="trend-videos-container">
      <h2>Trending</h2>
      <div className="trend-videos">
        {error && <TrendVideo error={true}></TrendVideo>}
        {isLoading && <TrendVideo isLoading={true}></TrendVideo>}
        {data && data.trendingVideos.map(video => {
          return <TrendVideo setPlayingVideo={setPlayingVideo} key={video.id} title={video.title} artist={video.artist} videoURL={video.videoURL} imgURL={video.imgURL} views={video.views} duration={video.duration} />
        })}
      </div>
    </div>
  )
}

export default TrendingVideos