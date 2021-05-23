import { useEffect } from 'react';
import { Link } from 'react-router-dom'

const SignIn = ({ setIsLoggedIn }) => {
  const handleClick = () => {
    sessionStorage.setItem('auth-token', 'logged in');
    setIsLoggedIn(true);
  }

  useEffect(() => {
    document.title = "Youtify | Media Player | Log In";
  }, [])

  return (
    <section className="sign-in-container dark">
      <div className="singer-img">
        <img src="../assets/images/singer.jpg" alt="Singer"/>
      </div>
      <div className="sign-in-main">
        <h1><span>YOUTIFY |</span> Media Player</h1>
        <div className="sign-in-form">
          <h2>Log In</h2>
          <h3>Don't have an account? <Link to="/create-account">Sign up</Link></h3>
          <form>
            <input type="text" placeholder="Login"/>
            <input type="password" placeholder="Password"/>
            <Link to="/" type="submit" onClick={handleClick}>Sign In</Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignIn;