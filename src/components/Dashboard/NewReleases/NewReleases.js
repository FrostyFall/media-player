import NewSong from '../NewSong/NewSong'
import { UserData } from "../../../Application"
import { useContext } from "react"; 

const NewReleases = ({ setPlayingSong }) => {
  const { data, isLoading, error } = useContext(UserData); 

  return (
    <section className="new-releases">
      <h2>New Releases</h2>
      <div className="preview-container">
        {error && <NewSong error={true} />}
        {isLoading && <NewSong isLoading={true} />}
        {data && data.newReleases.map((song) => (
          <NewSong setPlayingSong={setPlayingSong} key={song.id} artist={song.artist} name={song.name} imgURL={song.imgURL} songURL={song.songURL}/>
        ))}
      </div>
    </section>
  )
}

export default NewReleases