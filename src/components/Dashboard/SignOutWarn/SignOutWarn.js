import { useContext } from "react"
import { SetIsLoggedIn } from '../../../Application'

const CopyrightWarn = ({ setShowSOWarn }) => {
  const { setIsLoggedIn } = useContext(SetIsLoggedIn);

  const closeSOWarn = () => {
    setShowSOWarn(false);
  }

  const signOut = () => {
    closeSOWarn();
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
  }

  return (
    <div className="sign-out-warn">
      <div className="so-warn-container">
        <h2>Warning</h2>
        <p>You sure you want to Sign Out?</p>
        <button className="sign-out-btn" onClick={signOut}>Sign Out</button>
        <button className="close-warn-btn" onClick={closeSOWarn}>Close</button>
      </div>
    </div>
  )
}

export default CopyrightWarn