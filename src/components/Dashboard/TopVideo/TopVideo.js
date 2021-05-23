import { useContext, useState, useRef, useEffect } from 'react'
import { Theme } from '../../../Application';
import { UserData } from "../../../Application"
import { PlayingMediaElems, MediaElems } from '../Dashboard'

const TopVideo = () => {
  const { theme } = useContext(Theme);
  const { audio, topVideo: video } = useContext(MediaElems);
  const { isAudioActive, setIsTopVideoActive } = useContext(PlayingMediaElems);
  const videoControls = useRef(null);
  const videoVolumeBtn = useRef(null);
  const playVideoBtn = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isUnMuted, setIsUnMuted] = useState(true);
  const { data, isLoading, error } = useContext(UserData);

  const playVideo = () => {
    if (video.current.paused) {
      video.current.play();
      setIsTopVideoActive(true);
      if (isAudioActive) {
        audio.current.pause();
      }
    } else {
      video.current.pause();
      setIsTopVideoActive(false);
    }
  }

  const getVideoDuration = () => {
    {video.current && setVideoDuration(video.current.duration)};
  }

  const formatVideoDuration = () => {
    let mins = Math.floor(videoDuration / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
    let secs = Math.floor(videoDuration % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }
    return `${mins}:${secs}`;
  }

  const formatCurrentProgress = () => {
    let mins = Math.floor(currentProgress / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
    let secs = Math.floor(currentProgress % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }
    return `${mins}:${secs}`;
  }

  const setProgress = (e) => {
    const width = document.querySelector('.top-video-progress-container').offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    video.current.currentTime = (clickX / width) * videoDuration;
  }

  const handleTimeUpdate = () => {
    setCurrentProgress(video.current.currentTime);
    const progressPercent = (video.current.currentTime / video.current.duration) * 100;
    document.querySelector('.top-video-progress').style.width = `${progressPercent}%`;
    (video.current.paused) ? playVideoBtn.current.src = `./assets/icons/${theme}/video-play-btn.svg` : playVideoBtn.current.src = `./assets/icons/${theme}/video-pause-btn.svg`;
  }

  const muteVolume = () => {
    if (isUnMuted) {
      video.current.volume = 0;
      videoVolumeBtn.current.src = `./assets/icons/${theme}/muted.svg`;
    } else {
      video.current.volume = 1;
      videoVolumeBtn.current.src = `./assets/icons/${theme}/high-volume.svg`;
    }
    setIsUnMuted(!isUnMuted);
  }

  const mouseEventHandler = () => {
    videoControls.current.classList.toggle('show');
  }

  const endingHandler = () => {
    playVideoBtn.current.src = `./assets/icons/${theme}/video-play-btn.svg`;
    setIsTopVideoActive(false);
  }

  useEffect(() => {
    return () => {
      setIsTopVideoActive(false);
    }
  }, [])

  return (
    <section className="top-video-section">
      <h2>Video of the Week</h2>
      {isLoading && (
      <div className="top-video-container loading">
        <div className="top-video">
          <video id="top-video" ref={video}></video>
        </div>
        <h3 className="top-video-title">Loading title...</h3>
      </div>
      )}
      {!isLoading && !error && (
      <div className="top-video-container">
        {data && window.innerWidth > 1366 && 
          <div className="top-video" onMouseOver={mouseEventHandler} onMouseOut={mouseEventHandler}>
            <video id="top-video" ref={video} src={data.topVideo[0].videoURL} poster={data.topVideo[0].imgURL} preload="metadata" onClick={playVideo} onLoadedMetadata={getVideoDuration} onTimeUpdate={handleTimeUpdate} onEnded={endingHandler}></video>
            <div className="top-video-controls" ref={videoControls}>
              <h3 className="timestamp">{formatCurrentProgress()}/{formatVideoDuration()}</h3>
              <button className="play-btn" onClick={playVideo} >
                <img className="play-top-video-btn" ref={playVideoBtn} src={`./assets/icons/${theme}/video-play-btn.svg`} alt="Play Button"/>
              </button>
              <div className="top-video-progress-container" onClick={setProgress} >
                <div className="top-video-progress"></div>
              </div>
              <button className="mute-btn" onClick={muteVolume} >
                <img className="top-video-volume-btn" ref={videoVolumeBtn} src={`./assets/icons/${theme}/high-volume.svg`} alt="Mute Button"/>
              </button>
            </div>
          </div>
        }
        {data && window.innerWidth <= 1366 && 
          <div className="top-video">
            <video id="top-video" ref={video} controls src={data.topVideo[0].videoURL} poster={data.topVideo[0].imgURL} preload="metadata"></video>
          </div>
        }
        <h3 className="top-video-title">{data && data.topVideo[0].artist} - {data && data.topVideo[0].title}</h3>
      </div>
      )}
      {error && (
      <div className="top-video-container error">
        <div className="top-video">
          <video id="top-video" ref={video}></video>
        </div>
        <h3 className="top-video-title">Error: Could not fetch the data</h3>
      </div>
      )}
    </section>
  )
}

export default TopVideo