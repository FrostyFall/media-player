import React, { useState, useEffect, useRef } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
import AudioPlayer from './AudioPlayer/AudioPlayer'
import CopyrightWarn from './CopyrightWarn/CopyrightWarn'
import SignOutWarn from './SignOutWarn/SignOutWarn'

export const SetShowSOWarn = React.createContext();
export const SetShowHeaderMobile = React.createContext();
export const PlayingMediaElems = React.createContext();
export const MediaElems = React.createContext();

const Dashboard = () => {
  const [showSOWarn, setShowSOWarn] = useState(false);
  const [showCRWarn, setShowCRWarn] = useState(false);
  const [showHeadMob, setShowHeadMob] = useState(false);
  const [currentSection, setCurSection] = useState('Home');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playingSong, setPlayingSong] = useState(null);
  const [prevPlayedSong, setPlayedSong] = useState(false);
  const [playedSongs, setPlayedSongs] = useState([]);
  const audio = useRef(null);
  const topVideo = useRef(null);
  const playingVideo = useRef(null);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isTopVideoActive, setIsTopVideoActive] = useState(false);
  const [isPlayingVideoActive, setIsPlayingVideoActive] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('cr-warn-shown')) {
      setTimeout(() => {
        setShowCRWarn(true);
      }, 1000);
    }
    document.title = "Youtify | Media Player | Dashboard";
  }, [])

  useEffect(() => {
    setPlayedSong(false);
    {playingSong && !prevPlayedSong && setPlayedSongs(prevSongs => [...prevSongs, playingSong])}
  }, [playingSong])

  useEffect(() => {
    if (playedSongs.length > 1) {
      const preLastSongInArr = playedSongs.length - 1;
      for (let i = 0; i < preLastSongInArr; i++) {
        if (playedSongs[i].name === playedSongs[i + 1].name && playedSongs[i].artist === playedSongs[i + 1].artist) {
          playedSongs.splice(i, 1);
        }
      }
    }
    setCurrentSongIndex(playedSongs.length - 1);
  }, [playedSongs])

  return (
    <>
      {showSOWarn && <SignOutWarn setShowSOWarn={setShowSOWarn} />}
      {showCRWarn && <CopyrightWarn setShowCRWarn={setShowCRWarn} />}
      <MediaElems.Provider value={{ audio, topVideo, playingVideo }}>
        <PlayingMediaElems.Provider value={{ isAudioActive, setIsAudioActive, isTopVideoActive, setIsTopVideoActive, isPlayingVideoActive, setIsPlayingVideoActive }}>
            <SetShowHeaderMobile.Provider value={{ showHeadMob, setShowHeadMob }}>
              <Sidebar setActiveSection={setCurSection} currentSection={currentSection} />
              <SetShowSOWarn.Provider value={{ setShowSOWarn }}>
                <Main currentSection={currentSection} setPlayingSong={setPlayingSong} />
              </SetShowSOWarn.Provider>
            </SetShowHeaderMobile.Provider>
            <AudioPlayer playingSong={playingSong} playedSongs={playedSongs} setPlayingSong={setPlayingSong} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} setPlayedSong={setPlayedSong} />
        </PlayingMediaElems.Provider>
      </MediaElems.Provider>
    </>
  )
}

export default Dashboard