import { faBars, faGear, faNoteSticky, faSignOut, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ openSideBar }) => {
  const [notifications, setNotifications] = useState([])
  const [itemsToShow, setItemsToShow] = useState(5)
  const showMore = () => {
    setItemsToShow(prevState => prevState + 5)
  }
  const showLess = () => {
    setItemsToShow(prevState => prevState - 5)
  }
  const handleClick = async (id) => {
    await axios.put('http://localhost:4000/api/notification/' + id)
  }
  const sub = async () => {
    const response = await axios.get('http://localhost:4000/api/notification')
    setNotifications(response.data)
  }
  useEffect(() => {
    sub()
  }, [])
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
          <div>
            <div className="btn-group">
              <button className="btn text-white " data-bs-toggle="dropdown" id="dropdownMenuClickable" data-bs-auto-close="false" aria-expanded="false">
                <FontAwesomeIcon icon={faNoteSticky} />
              </button>
              <ul className="dropdown-menu dropdown-menu-lg-end" style={{ width: '400px' }} aria-labelledby="dropdownMenuClickable">
                {notifications && notifications.sort((a, b) => { return b.orderNumber - a.orderNumber }).slice(0, itemsToShow).map((e) => {
                  return (
                    <div key={e._id} >
                      <li className='' >
                        <button className='btn btn-light w-100' type='button' onClick={() => handleClick(e._id)}>
                          <h4 className='text-success'>{e.title}</h4>
                          <span className='opacity-75'>{e.description}</span>
                        </button>
                      </li>
                      <span style={{ width: '30px', height: '30px', backgroundColor: '#2E89FF', borderRadius: '50%' }}></span>
                    </div>
                  )
                })}
                {notifications.length > 5 && <li className='d-flex justify-content-between'>
                  <div>{notifications.length > itemsToShow && <button type='button' className='btn link-primary' onClick={showMore}>Show more..</button>}</div>

                  <div>{notifications.length < itemsToShow && < button type='button' className='btn link-primary' onClick={showLess}>Show less..</button>}</div>
                </li>
                }
                {notifications.length === 0 && <li><button className='btn w-100'>No notifications has been registered..</button></li>}
              </ul>
            </div>
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
      </div>
    </nav >
  )
}

export default Navbar