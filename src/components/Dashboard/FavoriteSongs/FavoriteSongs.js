// import useFetch from "../useFetch"
import FavoriteSong from "../FavoriteSong/FavoriteSong"
import { UserData } from "../../../Application"
import { useContext } from "react";

const FavoriteSongs = ({ setPlayingSong, usersFavSongs }) => {
  const { data, isLoading, error } = useContext(UserData); 

  return (
    <>
      <h2>{data ? data.users[0].userFirstName : 'Unknown'}'s Liked Songs</h2>
      <div className='fav-songs-container'>
        <div className="flex">
          <div className="grid-nav">
            <h3></h3>
            <h3>Title</h3>
            <h3>Artist</h3>
            <h3>Album</h3>
            <h3>Added</h3>
            <h3></h3>
          </div>
          <div className="grid-content">
            {isLoading && (
              <FavoriteSong isLoading={true}/>
            )}
            {data && data.users[0].favoriteSongs.map(favSong => (
              <FavoriteSong setPlayingSong={setPlayingSong} key={favSong.id} id={favSong.id} name={favSong.name} artist={favSong.artist} imgURL={favSong.imgURL} songURL={favSong.songURL} album={favSong.album} addedDate={favSong.addedDate} usersFavSongs={usersFavSongs} />
            ))}
            {error && (
              <FavoriteSong error={true}/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FavoriteSongs