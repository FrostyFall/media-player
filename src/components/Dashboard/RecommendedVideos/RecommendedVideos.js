import RecVideo from "../RecVideo/RecVideo";
import { UserData } from "../../../Application"
import { useContext } from "react";

const RecommendedVideos = ({ setPlayingVideo }) => {
  const { data, isLoading, error } = useContext(UserData); 

  return (
    <div className="rec-videos-container">
      <h2>Recommended</h2>
      {isLoading && (
        <div className="rec-videos">
          <RecVideo isLoading={true}/>
        </div>
      )}
      {!isLoading && !error && (
        <div className="rec-videos">
          {data && data.recommendedVideos.map(video => {
            return <RecVideo setPlayingVideo={setPlayingVideo} key={video.id} title={video.title} artist={video.artist} videoURL={video.videoURL} imgURL={video.imgURL} views={video.views} duration={video.duration} />
          })}
        </div>
      )}
      {error && (
        <div className="rec-videos">
          <RecVideo error={true}/>
        </div>
      )}
    </div>
  )
}

export default RecommendedVideos