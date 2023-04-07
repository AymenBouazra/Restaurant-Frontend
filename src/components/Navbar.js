import { faBars, faBell, faGear, faSignOut, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = ({ openSideBar }) => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [notifNotRead, setNotifNotRead] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(5)

  const readNotifications = async () => {
    await axios.put('http://localhost:4000/api/allNotifications')
    window.location.reload()
  }
  const deleteAllNotifications = async () => {
    await axios.delete('http://localhost:4000/api/deleteAllNotifications')
    window.location.reload()
  }
  const showMore = () => {
    setItemsToShow(prevState => prevState + 5)
  }
  const showLess = () => {
    setItemsToShow(prevState => prevState - 5)
  }
  const handleClick = async (id) => {
    await axios.put('http://localhost:4000/api/notification/' + id)
    window.location.replace('/admin/orders')

  }
  const getNotifs = useCallback(async () => {
    const response = await axios.get('http://localhost:4000/api/notification')
    setNotifications(prev => prev = response.data)
    let num = response.data.filter((notif) => notif.read === false).length
    setNotifNotRead(num)
  }, [])
  // useEffect(() => {
  //   toast.info('New notification!')

  // }, [notifications])
  useEffect(() => {
    getNotifs()
  }, [getNotifs])
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
              <button className="btn text-white" data-bs-toggle="dropdown" id="dropdownMenuClickable" data-bs-auto-close="false" aria-expanded="false">
                <FontAwesomeIcon icon={faBell} size='lg' />
                {notifNotRead !== 0 && <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-danger">
                  {notifNotRead}
                  <span className="visually-hidden">unread messages</span>
                </span>}
              </button>
              <ul className="dropdown-menu dropdown-menu-lg-end p-0" style={{ width: '400px' }} aria-labelledby="dropdownMenuClickable">
                <li className='d-flex justify-content-between'><button className='btn btn-link' onClick={readNotifications}>Read all notifications</button>
                  <button className='btn btn-link text-secondary' onClick={deleteAllNotifications}>Delete all</button></li>
                {notifications && notifications.sort((a, b) => { return b.orderNumber - a.orderNumber }).slice(0, itemsToShow).map((e) => {
                  return (
                    <div key={e._id} >
                      <li className='' >
                        <div className={`w-100 d-flex justify-content-between p-2 rounded-3`} style={{ backgroundColor: `${e.read ? '#EEF1FF' : '#D2DAFF'}`, cursor: 'pointer', margin: '2px 0' }} onClick={() => handleClick(e._id)}>
                          <div className='d-flex flex-column col-11'>
                            <h4 className='text-primary'>{e.title}</h4>
                            <span className='opacity-75'>{e.description}</span>
                          </div>
                          {!e.read && <div style={{ width: '15px', height: '15px', backgroundColor: '#2E89FF', borderRadius: '50%' }}></div>}
                        </div>
                      </li>
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