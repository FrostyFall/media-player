import { useState, useEffect, useContext } from 'react'
import { Theme } from '../../../Application'

const FavoriteSong = ({ id, artist, name, imgURL, songURL, album, addedDate, setPlayingSong, usersFavSongs, isLoading, error }) => {
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
        <div className='fav-song loading'>
          <h3>1.</h3>
          <h3 className='name'>Name...</h3>
          <span>-</span>
          <h3 className='artist'>Artist...</h3>
          <h3 className='album'>Album...</h3>
          <h3>Date...</h3>
          <button>
            <img src={`./assets/icons/${theme}/like.svg`} />
          </button>
        </div>
      )}
      {!isLoading && !error && (
        <div className='fav-song' onClick={handleClick} >
          <h3>{id < 10 ? `0${id}.` : id + '.'}</h3>
          <h3 className='name'>{name}</h3>
          <span>-</span>
          <h3 className='artist'>{artist}</h3>
          <h3 className='album'>{album}</h3>
          <h3>{addedDate}</h3>
          <button>
            <img src={isFavorite ? './assets/icons/general/liked.svg' : `./assets/icons/${theme}/like.svg`} />
          </button>
        </div>
      )}
      {error && (
        <div className='fav-song error'>
          <h3>1.</h3>
          <h3 className='name'>Error</h3>
          <span>-</span>
          <h3 className='artist'>Error</h3>
          <h3 className='album'>Error</h3>
          <h3>Error</h3>
          <button>
            <img src={`./assets/icons/${theme}/like.svg`} />
          </button>
        </div>
      )}
    </>
  )
}

FavoriteSong.defaultProps = {
  isLoading: false,
  error: false
}

export default FavoriteSong