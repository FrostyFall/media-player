import NewReleases from '../NewReleases/NewReleases'
import TopVideo from '../TopVideo/TopVideo'
import TopHits from '../TopHits/TopHits'

const Home = ({ setPlayingSong, usersFavSongs }) => {
  return (
    <>
      <NewReleases setPlayingSong={setPlayingSong} />
      <div className='popular-media'>
        <TopVideo />
        <TopHits setPlayingSong={setPlayingSong} usersFavSongs={usersFavSongs} />
      </div>
    </>
  )
}

export default Home