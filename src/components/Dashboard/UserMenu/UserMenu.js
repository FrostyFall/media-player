import React, { useContext } from 'react'
import { AreMenusOpened } from '../../../Application'
import { Theme } from '../../../Application'
import { UserData } from "../../../Application"
import { SetShowSOWarn } from '../Dashboard'

const UserMenu = () => {
  const { isUserMenuOpened, setIsUserMenuOpened } = useContext(AreMenusOpened);
  const { setShowSOWarn } = useContext(SetShowSOWarn);
  const { theme, setTheme } = useContext(Theme);
  const { data, isLoading, error } = useContext(UserData); 
  
  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
  }

  const handleClick = () => {
    setShowSOWarn(true);
    setIsUserMenuOpened(false);
  }

  return (
    <>
      {isLoading && (
        <div className={isUserMenuOpened ? 'user-menu show' : 'user-menu'}>
          <div className="sub-info">
            <h2>Subscription: <span className="sub-status">Loading...</span></h2>
            <button>Change Plan</button>
          </div>
          <div className="user-menu-options">
            <button className="mode-toggler" onClick={changeTheme}><img src={theme === 'dark' ? './assets/icons/general/sun.svg' : './assets/icons/general/moon.svg'} alt="Moon"/> {theme === 'dark' ? 'Light' : 'Dark'} Mode</button>
            <button className="sign-out-btn">Sign Out</button>
          </div>
        </div>
      )}
      {!isLoading && !error && (
        <div className={isUserMenuOpened ? 'user-menu show' : 'user-menu'}>
          <div className="sub-info">
            <h2>Subscription: <span className="sub-status">Premium</span></h2>
            <button>Change Plan</button>
          </div>
          <div className="user-menu-options">
            <button className="mode-toggler" onClick={changeTheme}><img src={theme === 'dark' ? './assets/icons/general/sun.svg' : './assets/icons/general/moon.svg'} alt="Moon"/> {theme === 'dark' ? 'Light' : 'Dark'} Mode</button>
            <button className="sign-out-btn" onClick={handleClick}>Sign Out</button>
          </div>
        </div>
      )}
      {error && (
        <div className={isUserMenuOpened ? 'user-menu show' : 'user-menu'}>
          <div className="sub-info">
            <h2>Subscription: <span className="sub-status">Error: Could not fetch the data</span></h2>
            <button>Change Plan</button>
          </div>
          <div className="user-menu-options">
            <button className="mode-toggler" onClick={changeTheme}><img src={theme === 'dark' ? './assets/icons/general/sun.svg' : './assets/icons/general/moon.svg'} alt="Moon"/> {theme === 'dark' ? 'Light' : 'Dark'} Mode</button>
            <button className="sign-out-btn">Sign Out</button>
          </div>
        </div>
      )}
    </>
  )
}

export default UserMenu