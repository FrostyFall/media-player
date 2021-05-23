import { useContext, useEffect, useState, useRef } from "react"
import { Theme } from "../../../Application";
import { PlayingMediaElems, MediaElems } from '../Dashboard'

const PlayingVideo = ({ playingVideo }) => {
  const { theme } = useContext(Theme);
  const { audio, playingVideo: video } = useContext(MediaElems);
  const { isAudioActive, setIsPlayingVideoActive } = useContext(PlayingMediaElems);
  const videoTitle = useRef(null);
  const videoControls = useRef(null);
  const playVideoBtn = useRef(null);
  const volumeVideoBtn = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isUnMuted, setIsUnMuted] = useState(true);

  const playVideo = () => {
    if (video.current.paused) {
      video.current.play();
      setIsPlayingVideoActive(true);
      if (isAudioActive) {
        audio.current.pause();
      }
    } else {
      video.current.pause();
      setIsPlayingVideoActive(false);
    }
  }

  const getVideoDuration = () => {
    setVideoDuration(video.current.duration);
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
    const width = document.querySelector('.video-progress-container').offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    video.current.currentTime = (clickX / width) * videoDuration;
  }

  const handleTimeUpdate = () => {
    setCurrentProgress(video.current.currentTime);
    const progressPercent = (video.current.currentTime / video.current.duration) * 100;
    document.querySelector('.video-progress').style.width = `${progressPercent}%`;
    (video.current.paused) ? playVideoBtn.current.src = `./assets/icons/${theme}/video-play-btn.svg` : playVideoBtn.current.src = `./assets/icons/${theme}/video-pause-btn.svg`;
  }

  const muteVolume = () => {
    if (isUnMuted) {
      video.current.volume = 0;
      volumeVideoBtn.current.src = `./assets/icons/${theme}/muted.svg`;
    } else {
      video.current.volume = 1;
      volumeVideoBtn.current.src = `./assets/icons/${theme}/high-volume.svg`;
    }
    setIsUnMuted(!isUnMuted);
  }

  const mouseMoveHandler = () => {
    videoTitle.current.classList.toggle('show');
    videoControls.current.classList.toggle('show');
  }

  const endingHandler = () => {
    playVideoBtn.current.src = `./assets/icons/${theme}/video-play-btn.svg`;
    setIsPlayingVideoActive(false);
  }

  useEffect(() => {
    {playingVideo && playVideo()};
  }, [playingVideo])

  useEffect(() => {
    return () => {
      setIsPlayingVideoActive(false);
    }
  }, [])

  return (
    <>
      <div className={playingVideo ? 'playing-video-container show' : 'playing-video-container'}>
      {window.innerWidth > 1366 && 
      <div className="playing-video" onMouseOver={mouseMoveHandler} onMouseOut={mouseMoveHandler}>
        <div className="video-container">
          <video ref={video} id="playing-video" src={playingVideo ? playingVideo.videoURL : ''} poster={playingVideo && playingVideo.imgURL} preload="metadata" onClick={playVideo} onLoadedMetadata={getVideoDuration} onTimeUpdate={handleTimeUpdate} onEnded={endingHandler}></video>
          <div className="video-controls" ref={videoControls}>
            <h3 className="timestamp">{formatCurrentProgress()}/{formatVideoDuration()}</h3>
            <button className="play-btn" onClick={playVideo} >
              <img className="play-video-btn" ref={playVideoBtn} src={`./assets/icons/${theme}/video-play-btn.svg`} alt="Play Button"/>
            </button>
            <div className="video-progress-container" onClick={setProgress} >
              <div className="video-progress"></div>
            </div>
            <button className="mute-btn" onClick={muteVolume} >
              <img className="video-volume-btn" ref={volumeVideoBtn} src={`./assets/icons/${theme}/high-volume.svg`} alt="Mute Button"/>
            </button>
          </div>
          <h3 ref={videoTitle} className="video-title">{playingVideo && playingVideo.artist} - {playingVideo && playingVideo.title}</h3>
        </div>
      </div>
      }
      {window.innerWidth <= 1366 && 
      <div className="playing-video">
        <div className="video-container">
          <video ref={video} id="playing-video" src={playingVideo ? playingVideo.videoURL : ''} poster={playingVideo && playingVideo.imgURL} preload="metadata" controls></video>
        </div>
      </div>
      }
    </div>
    </>
  )
}

export default PlayingVideo