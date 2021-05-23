import { useContext } from 'react'
import { UserData } from '../../../Application'

const User = () => {
  const { data, isLoading, error } = useContext(UserData);

  return (
    <div className="user">
      <div className="avatar-container">
        {error && <div className="user-avatar error"></div>}
        {isLoading && <div className="user-avatar loading"></div>}
        {data && <div className="user-avatar" style={{ background: `url(${data.users[0].userAvatar}) center center / cover no-repeat` }}></div>}
      </div>
      <div className="name-container">
        {error && <h3 id="user-name">Error</h3>}
        {isLoading && <h3 id="user-name">Loading...</h3>}
        {data && <h3 id="user-name">{data.users[0].userFirstName} {data.users[0].userLastName}</h3>}
      </div>
    </div>
  )
}

export default User