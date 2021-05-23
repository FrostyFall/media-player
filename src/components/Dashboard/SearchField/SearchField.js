import { useContext } from "react"
import { Theme } from "../../../Application"

const SearchField = ({ searchValue, handleChange }) => {
  const { theme } = useContext(Theme);

  return (
    <div className="search-container">
      <img src={`./assets/icons/${theme}/search.svg`} />
      <input type="text" placeholder="Search for songs and more" value={searchValue} onChange={handleChange} />
    </div>
  )
}

export default SearchField