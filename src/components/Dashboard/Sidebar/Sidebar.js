import { useContext } from 'react'
import { Theme } from '../../../Application'
import NavLink from '../NavLink/NavLink'

const Sidebar = ({ setActiveSection, currentSection }) => {
  const { theme } = useContext(Theme);

  const toggleSearch = () => {
    document.querySelector('.header').classList.toggle('show');
    document.querySelector('.user').classList.remove('show');
    document.querySelector('.search-container').classList.add('show');
  }

  const toggleMenu = () => {
    document.querySelector('.header').classList.toggle('show');
    document.querySelector('.user').classList.add('show');
    document.querySelector('.search-container').classList.remove('show');
  }

  return (
    <aside>
      <div className='aside-container'>
        <button className="search-icon" onClick={toggleSearch}><img src={`./assets/icons/${theme}/search-mobile.svg`} alt="Search Icon"/></button>
        <h1 className='logo'>YOUTIFY</h1>
        <button className="menu-icon" onClick={toggleMenu}><img src={`./assets/icons/${theme}/humburger.svg`} alt="Search Icon"/></button>
        <nav>
          <h2>DISCOVER</h2>
          <div className="main-nav">
            <ul>
              <NavLink toggle='Home' setActiveSection={setActiveSection} currentSection={currentSection} />
              <NavLink toggle='Videos' setActiveSection={setActiveSection} currentSection={currentSection} />
            </ul>
          </div>
          <h2>MY MUSIC</h2>
          <div className="my-music-nav">
            <ul>
              <NavLink toggle='Favorite Songs' setActiveSection={setActiveSection} currentSection={currentSection} />
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar