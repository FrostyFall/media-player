import { useContext, useEffect, useState } from 'react'
import { AreMenusOpened } from '../../../Application'
import { UserData } from '../../../Application'
import FoundSong from '../FoundSong/FoundSong'

const SearchResults = ({ value, setPlayingSong }) => {
  const { areResultsOpened } = useContext(AreMenusOpened);
  const { data } = useContext(UserData);

  return (
    <>
      <div className={areResultsOpened ? 'results-container show' : 'results-container'}>
        <div className='search-input-container'>
          <h3 className='search-input'>"{value}"</h3>
        </div>
        {data && data.allSongs.filter(song => `${song.artist} - ${song.name}`.toLowerCase().match(value.toLowerCase()))
        .sort((a, b) => (a.artist > b.artist) ? 1 : ((b.artist > a.artist) ? -1 : 0))
        .map((song, index) => (<FoundSong setPlayingSong={setPlayingSong} key={song.id} id={index + 1} artist={song.artist} name={song.name} imgURL={song.imgURL} songURL={song.songURL} usersFavSongs={data.users[0].favoriteSongs} />))}
      </div>
    </>
  )
}

export default SearchResults