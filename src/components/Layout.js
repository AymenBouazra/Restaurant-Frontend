import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import Navbar from './Navbar'

const Layout = () => {
    const mql = window.matchMedia(`(min-width: 800px)`);
    const [sidebarOptions, setSidebarOptions] = useState({
        sidebarDocked: mql.matches,
    })

    const onSetSidebarOpen = (x) => {
        setSidebarOptions((prevState) => { return { ...setSidebarOptions, sidebarDocked: !prevState.sidebarDocked } })

    }
    const mediaQueryChanged = () => {
        setSidebarOptions(() => { return { ...setSidebarOptions, sidebarDocked: mql.matches, sidebarOpen: false } });
    }
    useEffect(() => {
        mql.addEventListener('change', mediaQueryChanged);
    })
    return (
        <div className='App'>
            <Sidebar
                sidebar={<b>Sidebar content</b>}
                open={sidebarOptions.sidebarOpen}
                onSetOpen={onSetSidebarOpen}
                docked={sidebarOptions.sidebarDocked}
                styles={{ sidebar: { background: "#20232A", color:'white', width: '230px' } }}
            >
                <Navbar openSideBar={onSetSidebarOpen} />
                <Outlet />
            </Sidebar>
        </div>
    )
}

export default Layout