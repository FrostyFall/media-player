import Home from '../Home/Home'
import Videos from '../Videos/Videos'
import FavoriteSongs from '../FavoriteSongs/FavoriteSongs'

const Content = ({ currentSection, setPlayingSong, usersFavSongs }) => {
  return (
    <section className='content'>
      {currentSection === 'Home' && <Home setPlayingSong={setPlayingSong} usersFavSongs={usersFavSongs} />}
      {currentSection === 'Videos' && <Videos />}
      {currentSection === 'Favorite Songs' && <FavoriteSongs setPlayingSong={setPlayingSong} usersFavSongs={usersFavSongs} />}
    </section>
  )
}

export default Content