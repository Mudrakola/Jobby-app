import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="home-lo-image"
            alt="website logo"
          />
        </Link>
      </li>
      <ul className="list-container">
        <li>
          <Link to="/" className="items">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="items">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-button" onClick={onLogout}>
        Logout
      </button>
      <div className="sm-container">
        <Link to="/">
          <AiFillHome className="icons" />
        </Link>
        <Link to="/jobs">
          <BsFillBriefcaseFill className="icons" />
        </Link>
        <button type="button" className="button-logout-sm" onClick={onLogout}>
          <FiLogOut className="icons" />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
