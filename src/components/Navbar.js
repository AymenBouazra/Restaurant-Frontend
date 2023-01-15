import { faBars, faGear, faSignOut, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ openSideBar }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-nav px-1" >
      <div className="container-fluid">
        <button onClick={openSideBar} className='btn' ><FontAwesomeIcon color='lightblue' icon={faBars} /></button>
        <Link className="navbar-brand ms-3" to='/'>Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <FontAwesomeIcon color='lightblue' size='lg' icon={faBars} />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/'>Home</Link>
            </li>
          </ul>
          <div className="btn-group">
            <button className="btn text-white dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faGear} />
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end">
              <li><Link className="dropdown-item text-dark" to="/users/profile"><FontAwesomeIcon icon={faUserCog} /> Profile</Link></li>
              <li><button className="dropdown-item" ><FontAwesomeIcon icon={faSignOut} /> Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar