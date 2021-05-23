import { useEffect, useState, useContext } from 'react'
import { AreMenusOpened } from '../../../Application'
import SearchField from '../SearchField/SearchField'
import SearchResults from '../SearchResults/SearchResults'
import User from '../User/User'
import UserMenu from '../UserMenu/UserMenu'

const Header = ({ setPlayingSong, usersFavSongs }) => {
  const [searchValue, setSearchValue] = useState('');
  const { setAreResultsOpened } = useContext(AreMenusOpened)

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    if (searchValue === '') {
      setAreResultsOpened(false);
    } else {
      setAreResultsOpened(true);
    }
  }, [searchValue])

  return (
    <header className="header">
      <SearchField value={searchValue} handleChange={handleChange}/>
      <SearchResults value={searchValue} setPlayingSong={setPlayingSong} usersFavSongs={usersFavSongs} />
      <User />
      <UserMenu />
    </header>
  )
}

export default Header