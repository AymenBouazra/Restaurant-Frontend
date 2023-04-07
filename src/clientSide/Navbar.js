import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTotals } from './features/CartSlice'

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch])
  return (
    <nav className="navbar navbar-expand-lg bg-nav">
      <div className="container">
        <Link className="navbar-brand" to="/">Restaurant</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/food">Food</Link>
            </li>
          </ul>
        </div>
        <Link to='/cart' className="position-relative">
          <FontAwesomeIcon icon={faCartShopping} size='lg' />
          {cart.cartTotalQuantity !== 0 && <span className="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-danger">
            {cart.cartTotalQuantity}
            <span className="visually-hidden">unread messages</span>
          </span>}

        </Link>
      </div>
    </nav>
  )
}

export default Navbar