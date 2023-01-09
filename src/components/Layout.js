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

    const onSetSidebarOpen = (x) => {
        setSidebarOptions((prevState) => { return { ...setSidebarOptions, sidebarDocked: !prevState.sidebarDocked } })

    }
    const mediaQueryChanged = () => {
        setSidebarOptions(() => { return { ...setSidebarOptions, sidebarDocked: mql.matches } });
    }
    useEffect(() => {
        mql.addEventListener('change', mediaQueryChanged);
    })
    return (
        <div className='App'>
            <Sidebar
                sidebar={<SidebarNav />}
                open={sidebarOptions.sidebarOpen}
                onSetOpen={onSetSidebarOpen}
                docked={sidebarOptions.sidebarDocked}
                styles={{ sidebar: { background: "#20232A", color:'white', minWidth: '230px' } }}
            >
                <Navbar openSideBar={onSetSidebarOpen} />
                <Outlet />
            </Sidebar>
        </div>
    )
}

export default Layout