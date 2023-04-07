import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import Navbar from './Navbar'
import SidebarNav from './SidebarNav'
import jwt_decode from 'jwt-decode'
import { io } from "socket.io-client";

const Layout = () => {
    const [socket, setSocket] = useState(null)
    const [user, setUser] = useState('')
    const mql = window.matchMedia(`(min-width: 800px)`);
    const [sidebarOptions, setSidebarOptions] = useState({
        sidebarDocked: mql.matches,
    })
    const onSetSidebarOpen = () => {
        setSidebarOptions((prevState) => { return { ...setSidebarOptions, sidebarDocked: !prevState.sidebarDocked } })

    }
    useEffect(() => {
        let clean = true
        const mediaQueryChanged = () => {
            if (clean) {
                setSidebarOptions(() => { return { ...setSidebarOptions, sidebarDocked: mql.matches } });
            }
        }
        mql.addEventListener('change', mediaQueryChanged);
        return function cleanup() {
            clean = false
        }
    }, [mql])
    useEffect(() => {
        const getSocket = async () => {
            setSocket(io("http://localhost:5000"));
            const token = localStorage.getItem('token')
            const decoded = jwt_decode(token);
            setUser(decoded.userId)
        }
        getSocket()
    }, [])
    useEffect(() => {
        socket?.emit('newUser', user)
    }, [socket, user])
    return (
        <Sidebar
            sidebar={<SidebarNav />}
            open={sidebarOptions.sidebarOpen}
            onSetOpen={onSetSidebarOpen}
            docked={sidebarOptions.sidebarDocked}
            styles={{ sidebar: { background: "#20232A", color: 'white', minWidth: '230px' } }}
        >
            <Navbar openSideBar={onSetSidebarOpen} socket={socket} />
            <div className='bg-light min-vh-100'>
                <Outlet />
            </div>
        </Sidebar>
    )
}

export default Layout