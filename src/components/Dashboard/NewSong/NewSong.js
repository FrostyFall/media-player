const NewSong = ({ artist, name, imgURL, songURL, isLoading, error, setPlayingSong }) => {
  const handleClick = () => {
    setPlayingSong({ artist, name, imgURL, songURL });
  }

  return (
    <>
      {isLoading && (
        <div className="song-container">
          <div className="loading-cover"></div>
          <h3>Loading...</h3>
          <h4>Loading...</h4>
        </div>
      )}
      {!isLoading && !error && (
        <div className="song-container" onClick={handleClick}>
          <div className="song-cover">
            <img src={imgURL} />
          </div>
          <h3>{name}</h3>
          <h4>{artist}</h4>
        </div>
      )}
      {error && (
        <div className="song-container">
          <div className="error-cover"></div>
          <h3>Error Occured</h3>
          <h4>Error Occured</h4>
        </div>
      )}
    </>
  )
}

NewSong.defaultProps = {
  isLoading: false,
  error: false
}

export default NewSong