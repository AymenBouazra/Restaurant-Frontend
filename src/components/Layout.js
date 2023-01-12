import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import Navbar from './Navbar'
import SidebarNav from './SidebarNav'

const Layout = () => {
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
    },[mql])
    return (
            <Sidebar
                sidebar={<SidebarNav />}
                open={sidebarOptions.sidebarOpen}
                onSetOpen={onSetSidebarOpen}
                docked={sidebarOptions.sidebarDocked}
                styles={{ sidebar: { background: "#20232A", color:'white', minWidth: '230px' } }}
            >
                <Navbar openSideBar={onSetSidebarOpen} />
                <div className='bg-light vh-100'>
                <Outlet  />
                </div>
            </Sidebar>
    )
}

export default Layout