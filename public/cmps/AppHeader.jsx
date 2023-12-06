const { NavLink } = ReactRouterDOM
const { useEffect, useState } = React
import { UserMsg } from './UserMsg.jsx'
import { userService } from '../services/user.service.js'
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {

  const [user, setUser] = useState(userService.getLoggedinUser())

  function onLogout() {
    userService.logout().then(() => {
      setUser(null)
    })
  }

  function onChangeLoginStatus(user) {
    setUser(user)
  }
  console.log('user:', user)

  return (
    <header className="app-header full main-layout">
      <UserMsg />
      <div className="header-container">
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink> |
          <NavLink to="/bug">Bugs</NavLink> |
          <NavLink to="/about">About</NavLink>|
          {user && <NavLink to='/user'>Profile |</NavLink>}
          {user && user.isAdmin && <NavLink to='/admin'>Admin</NavLink>}
          |
        </nav>
        <h1>Bugs are Forever</h1>
        {user ? (
          <section>
            <h2>Hello {user.fullname}</h2>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>
            <LoginSignup onChangeLoginStatus={onChangeLoginStatus} />
          </section>
        )}
      </div>
    </header>
  )
}
