import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const CreateAcc = ({ setIsLoggedIn }) => {
  const handleClick = () => {
    sessionStorage.setItem('auth-token', 'logged in');
    setIsLoggedIn(true);
  }

  const notRickroll = () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }

  useEffect(() => {
    document.title = "Youtify | Media Player | Sign Up";
  }, [])

  return (
    <section className="create-acc-container dark">
      <div className="singer-img">
        <img src="../assets/images/singer.jpg" alt="Singer"/>
      </div>
      <div className="create-acc-main">
        <h1><span>YOUTIFY |</span> Media Player</h1>
        <div className="create-acc-form">
          <h2>Create Account</h2>
          <h3>Already have one? <Link to="/sign-in">Sign in</Link></h3>
          <form>
            <input type="text" placeholder="Login"/>
            <input type="text" placeholder="First Name"/>
            <input type="text" placeholder="Last Name"/>
            <input type="password" placeholder="Password"/>
            <Link to="/" type="submit" onClick={handleClick} >Sign Up</Link>
            <div className="terms">
              <label className="check-container">
                <input type="checkbox"/>
                <span className="checkmark"></span>
              </label>
              <p>I have read and agree to the <span onClick={notRickroll}>Terms of Service</span></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateAcc;