const RecVideo = ({ title, artist, videoURL, imgURL, views, duration, setPlayingVideo, isLoading, error }) => {
  const handleClick = () => {
    setPlayingVideo({ title, artist, videoURL, imgURL });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {isLoading && (
        <div className="rec-video loading">
          <span>--:--</span>
          <video id="video"></video>
          <div className="video-info">
            <h3>Loading title...</h3>
            <h4>Loading views...</h4>  
          </div>
        </div>
      )}
      {!isLoading && !error && (
        <div className="rec-video" onClick={handleClick}>
          <span>{duration}</span>
          <video id="video" src={videoURL} poster={imgURL} preload="metadata"></video>
          <div className="video-info">
            <h3>{artist} - {title}</h3>
            <h4>{views} views</h4>  
          </div>
        </div>
      )}
      {error && (
        <div className="rec-video error">
          <span>--:--</span>
          <video id="video"></video>
          <div className="video-info">
            <h3>Error: Could not fetch the data</h3>
            <h4>Unknown views</h4>  
          </div>
        </div>
      )}
    </>
  )
}

RecVideo.defaultProps = {
  isLoading: false,
  error: false
}

export default RecVideo