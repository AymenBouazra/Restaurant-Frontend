import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const ClientLayout = () => {
    return (
        <>
            <Navbar />
            <div className='container'>
                <Outlet />
            </div>
        </>
    )
}

export default ClientLayout