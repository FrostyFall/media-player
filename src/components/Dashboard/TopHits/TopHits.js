import TopHit from "../TopHit/TopHit"
import { UserData } from "../../../Application"
import { useContext } from "react";

const TopHits = ({ setPlayingSong, usersFavSongs }) => {
  const { data, isLoading, error } = useContext(UserData); 
  
  return (
    <section className='top-hits'>
      <h2>Today's Top Hits</h2>
      {isLoading && (
        <div className='top-hits-container'>
          <TopHit isLoading={true}/>
      </div>
      )}
      {!isLoading && !error && (
        <div className='top-hits-container'>
          {data && data.topHits.map((hit) => (
            <TopHit setPlayingSong={setPlayingSong} id={hit.id} artist={hit.artist} name={hit.name} imgURL={hit.imgURL} songURL={hit.songURL} album={hit.album} key={hit.id} usersFavSongs={usersFavSongs} />
          ))}
        </div>
      )}
      {error && (
        <div className='top-hits-container'>
          <TopHit error={true}/>
        </div>
      )}
    </section>
  )
}

export default TopHits