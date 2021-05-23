import { useState, useEffect, useContext } from 'react'
import { Theme } from '../../../Application';

const TopHit = ({ id, artist, name, imgURL, songURL, album, usersFavSongs, setPlayingSong, isLoading, error }) => {
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
    <>
      {isLoading && (
        <div className="top-hit loading">
          <span>1.</span>
          <div className="song-info">
            <h4>Loading title...</h4>
            <h3>Loading album...</h3>
          </div>
          <button>
            <img src={`./assets/icons/${theme}/like.svg`}/>
          </button>
        </div>
      )}
      {!isLoading && !error && (
        <div className="top-hit" onClick={handleClick} >
          <span>{id < 10 ? `0${id}.` : id + '.'}</span>
          <div className="song-info">
            <h4>{artist} - {name}</h4>
            <h3>{album}</h3>
          </div>
          <button>
            <img src={isFavorite ? './assets/icons/general/liked.svg' : `./assets/icons/${theme}/like.svg`} />
          </button>
        </div>
      )}
      {error && (
        <div className="top-hit error" onClick={handleClick} >
          <span>{id < 10 ? `0${id}.` : id + '.'}</span>
          <div className="song-info">
            <h4>{artist} - {name}</h4>
            <h3>{album}</h3>
          </div>
          <button>
            <img src={isFavorite ? './assets/icons/general/liked.svg' : `./assets/icons/${theme}/like.svg`} />
          </button>
        </div>
      )}
    </>
  )
}

TopHit.defaultProps = {
  isLoading: false,
  error: false
}

export default TopHit