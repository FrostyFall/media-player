import { useContext } from 'react'
import Header from '../Header/Header'
import Content from '../Content/Content'
import { UserData } from '../../../Application'

const Main = ({ currentSection, setPlayingSong }) => {
  const { data } = useContext(UserData);

  return (
    <main>
      <Header setPlayingSong={setPlayingSong} usersFavSongs={data && data.users[0].favoriteSongs} />
      <Content currentSection={currentSection} setPlayingSong={setPlayingSong} usersFavSongs={data && data.users[0].favoriteSongs} />
    </main>
  )
}

export default Main