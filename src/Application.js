import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import useFetch from './useFetch'
import Dashboard from './components/Dashboard/Dashboard'
import CreateAcc from './components/CreateAcc/CreateAcc'
import SignIn from './components/SignIn/SignIn'

export const AreMenusOpened = React.createContext();
export const UserData = React.createContext();
export const Theme = React.createContext();
export const SetIsLoggedIn = React.createContext();

const Application = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const [areResultsOpened, setAreResultsOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('auth-token'));
  const { data, isLoading, error } = useFetch('db/data.json');

  useEffect(() => {
    const isAuth = sessionStorage.getItem('auth-token');
    if (!!isAuth) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const toggleMenus = (e) => {
    if (e.target.closest('div.user')) {
      setIsUserMenuOpened(!isUserMenuOpened);
    } else if (!e.target.closest('div.user-menu.show')) {
      setIsUserMenuOpened(false);
    }

    if (!e.target.closest('div.search-container') && !e.target.closest('div.results-container.show')) {
      setAreResultsOpened(false);
    }
  }

  return (
    <>
      <Router>
        <Switch>
          <Theme.Provider value={{ theme, setTheme }}>
            <UserData.Provider value={{ data, isLoading, error }}>
              <Route exact path="/">
                {isLoggedIn ? 
                <AreMenusOpened.Provider value={{ isUserMenuOpened: isUserMenuOpened, setIsUserMenuOpened, areResultsOpened: areResultsOpened, setAreResultsOpened: setAreResultsOpened }}>
                <SetIsLoggedIn.Provider value={{ setIsLoggedIn }}>
                  <div className={`application ${theme}`} onClick={toggleMenus}>
                    <Dashboard />
                  </div>
                </SetIsLoggedIn.Provider>
                </AreMenusOpened.Provider> : <Redirect to="/sign-in" />}
              </Route>
              <Route path="/create-account">
                <div>
                  <CreateAcc setIsLoggedIn={setIsLoggedIn}/>
                </div>
              </Route>
              <Route path="/sign-in">
                <div>
                  <SignIn setIsLoggedIn={setIsLoggedIn}/>
                </div>
              </Route>
            </UserData.Provider>
          </Theme.Provider>
        </Switch>
      </Router>
    </>
  );
}

export default Application;
