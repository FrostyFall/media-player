import { useContext, useEffect, useState, useRef } from 'react'
import { Theme } from '../../../Application'
import { PlayingMediaElems, MediaElems } from '../Dashboard'

const AudioPlayer = ({ playingSong, playedSongs, setPlayingSong, currentSongIndex, setCurrentSongIndex, setPlayedSong }) => {
  const { theme } = useContext(Theme);
  const { audio, topVideo, playingVideo } = useContext(MediaElems);
  const { setIsAudioActive, isTopVideoActive, isPlayingVideoActive } = useContext(PlayingMediaElems);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isRepeatOff, setIsRepeatOff] = useState(true);
  const [isUnMuted, setIsUnMuted] = useState(true);
  const [buffVolume, setBuffVolume] = useState(0);
  const playBtnIcon = useRef(null);
  const repeatBtnIcon = useRef(null);
  const volumeProgressBar = useRef(null);
  const volumeBtnIcon = useRef(null);

  const playSong = () => {
    if (audio.current.paused) {
      audio.current.play();
      setIsAudioActive(true);
      if (isTopVideoActive) {
        topVideo.current.pause();
      }
      if (isPlayingVideoActive) {
        playingVideo.current.pause();
      }
    } else {
      audio.current.pause();
      setIsAudioActive(false);
    }
  }

  const prevSong = () => {
    if (audio.current.currentTime < 1.5) {
      setCurrentSongIndex(currentSongIndex => {
        if (currentSongIndex === 0) {
          return playedSongs.length - 1;
        } else {
          return currentSongIndex - 1;
        }
      });
      setPlayingSong({ 
        artist: playedSongs[currentSongIndex === 0 ? playedSongs.length - 1 : currentSongIndex - 1].artist,
        name: playedSongs[currentSongIndex === 0 ? playedSongs.length - 1 : currentSongIndex - 1].name,
        imgURL: playedSongs[currentSongIndex === 0 ? playedSongs.length - 1 : currentSongIndex - 1].imgURL,
        songURL: playedSongs[currentSongIndex === 0 ? playedSongs.length - 1 : currentSongIndex - 1].songURL 
      })
      setPlayedSong(true);
    } else {
      audio.current.currentTime = 0;
    }
  }

  const nextSong = () => {
    setCurrentSongIndex(currentSongIndex => {
      if (currentSongIndex === playedSongs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
    setPlayingSong({ 
      artist: playedSongs[currentSongIndex === playedSongs.length - 1 ? 0 : currentSongIndex + 1].artist,
      name: playedSongs[currentSongIndex === playedSongs.length - 1 ? 0 : currentSongIndex + 1].name,
      imgURL: playedSongs[currentSongIndex === playedSongs.length - 1 ? 0 : currentSongIndex + 1].imgURL,
      songURL: playedSongs[currentSongIndex === playedSongs.length - 1 ? 0 : currentSongIndex + 1].songURL 
    })
    setPlayedSong(true);
  }
 
  const getAudioDuration = () => {
    setAudioDuration(audio.current.duration);
  }

  const formatAudioDuration = () => {
    let mins = Math.floor(audioDuration / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
    let secs = Math.floor(audioDuration % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }
    return `${mins}:${secs}`;
  }

  const formatCurrentTime = () => {
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
    const width = document.querySelector('.progress-container').offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    audio.current.currentTime = (clickX / width) * audioDuration;
  }

  const handleTimeUpdate = () => {
    setCurrentProgress(audio.current.currentTime);
    const progressPercent = (audio.current.currentTime / audio.current.duration) * 100;
    document.querySelector('.progress').style.width = `${progressPercent}%`;
    (audio.current.paused) ? playBtnIcon.current.src = './assets/icons/general/audio-play-btn.svg' : playBtnIcon.current.src = './assets/icons/general/audio-pause-btn.svg';
  }

  const toggleRepeat = () => {
    audio.current.loop = isRepeatOff;
    if (isRepeatOff) {
      repeatBtnIcon.current.src = './assets/icons/general/repeat-on.svg';
    } else {
      repeatBtnIcon.current.src = `./assets/icons/${theme}/repeat-off.svg`
    }
    setIsRepeatOff(!isRepeatOff);
  }

  const muteVolume = () => {
    if (isUnMuted) {
      setBuffVolume(audio.current.volume);
      audio.current.volume = 0;
      volumeProgressBar.current.style.width = '0%';
      volumeBtnIcon.current.src = `./assets/icons/${theme}/muted.svg`;
    } else {
      audio.current.volume = buffVolume;
      volumeProgressBar.current.style.width = `${buffVolume * 100}%`;
      setVolumeIcon();
    }
    setIsUnMuted(!isUnMuted);
  }

  const setVolume = (e) => {
    const width = document.querySelector('.volume-progress-container').offsetWidth;;
    const clickX = e.nativeEvent.offsetX;
    audio.current.volume = clickX / width;
    volumeProgressBar.current.style.width = `${(clickX / width) * 100}%`;
    setVolumeIcon();
  }

  const setVolumeIcon = () => {
    if (audio.current.volume >= 0.75) {
      volumeBtnIcon.current.src = `./assets/icons/${theme}/high-volume.svg`;
    } else if (audio.current.volume > 0.25 && audio.current.volume < 0.75) {
      volumeBtnIcon.current.src = `./assets/icons/${theme}/medium-volume.svg`;
    } else if (audio.current.volume <= 0.25) {
      volumeBtnIcon.current.src = `./assets/icons/${theme}/low-volume.svg`;
    }
  }

  const endingHandler = () => {
    playBtnIcon.current.src = './assets/icons/general/audio-play-btn.svg';
    setIsAudioActive(false);
  }

  useEffect(() => {
    {playingSong && playSong()}
  }, [playingSong])

  useEffect(() => {
    return () => {
      setIsAudioActive(false);
    }
  }, [])

  return (
    <section className={playingSong ? "audio-player show" : "audio-player"}>
      <div className="player-container">
        <div className="audio-song-info">
          <div className="audio-song-cover">
            <img src={playingSong && playingSong.imgURL} alt="Song Cover"/>
          </div>
          <div className="audio-song-name">
            <h3>{playingSong && playingSong.name}</h3>
            <h4>{playingSong && playingSong.artist}</h4>
          </div>
        </div>
        <div className="controls">
          <audio ref={audio} id="audio" src={playingSong ? playingSong.songURL : ''} onLoadedMetadata={getAudioDuration} onTimeUpdate={handleTimeUpdate} onEnded={endingHandler} loop={false}></audio>
          <button className="previous-btn" onClick={prevSong}>
            <img src={`./assets/icons/${theme}/previous-btn.svg`} alt="Previous Song"/>
          </button>
          <button className="play-btn" id="play-btn" onClick={playSong}>
            <img src="./assets/icons/general/audio-play-btn.svg" alt="Play Song" className="play-btn-icon" ref={playBtnIcon}/>
          </button>
          <button className="next-btn" onClick={nextSong}>
            <img src={`./assets/icons/${theme}/next-btn.svg`} alt="Next Song"/>
          </button>
        </div>
        <div className="progress-bar">
          <h3>{formatCurrentTime()}</h3>
          <div className="progress-container" onClick={setProgress}>
            <div className="progress"></div>
          </div>
          <h3>{formatAudioDuration()}</h3>
        </div>
        <div className="options">
          <button className="repeat-btn" onClick={toggleRepeat}>
            <img src={`./assets/icons/${theme}/repeat-off.svg`} alt="Repeat Song" ref={repeatBtnIcon}/>
          </button>
          <button className="volume-btn" onClick={muteVolume}>
            <img src={`./assets/icons/${theme}/high-volume.svg`} alt="Mute Song" ref={volumeBtnIcon}/>
          </button>
          <div className="volume-progress-container" onClick={setVolume}>
            <div className="volume-progress" ref={volumeProgressBar}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AudioPlayer