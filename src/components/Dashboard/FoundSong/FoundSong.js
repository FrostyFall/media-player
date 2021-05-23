import { useState, useEffect, useContext } from 'react'
import { Theme } from '../../../Application'

const FoundSong = ({ id, artist, name, imgURL, songURL, setPlayingSong, usersFavSongs }) => {
  const { theme } = useContext(Theme);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setPlayingSong({ artist, name, imgURL, songURL });
  }

  useEffect(() => {
    {usersFavSongs && usersFavSongs.forEach(favSong => {
      if (favSong.name === name && favSong.artist === artist) {
        setIsFavorite(true);
      }
    })}
  }, [usersFavSongs])

  return (
    <div className='found-song-result' onClick={handleClick} >
      <span>{id < 10 ? `0${id}.` : id + '.'}</span>
      <h3>{artist} - {name}</h3>
      <button>
        <img src={`./assets/icons/${theme}/lyrics.svg`} />
      </button>
      <button>
        <img src={isFavorite ? './assets/icons/general/liked.svg' : `./assets/icons/${theme}/like.svg`} />
      </button>
    </div>
  )
}

export default FoundSong