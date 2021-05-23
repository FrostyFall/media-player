import { useContext } from 'react'
import { Theme } from '../../../Application'

const NavLink = ({ toggle, setActiveSection, currentSection }) => {
  const { theme } = useContext(Theme);
  const iconName = () => {
    switch(toggle) {
      case 'Home':
        return 'home';
      case 'Videos':
        return 'videos';
      case 'Favorite Songs':
        return 'like';
    }
  }

  return (
    <li onClick={() => setActiveSection(toggle)} className={currentSection === toggle ? 'section-toggle active' : 'section-toggle'}>
      <img src={currentSection === toggle ? `../assets/icons/active/${iconName()}.svg` : `../assets/icons/${theme}/${iconName()}.svg`} alt={`${toggle} Icon`} />
      <h3>{toggle}</h3>
    </li>
  )
}

export default NavLink