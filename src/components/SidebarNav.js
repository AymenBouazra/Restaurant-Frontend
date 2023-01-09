import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import navs from '../_nav'
const SidebarNav = () => {
    return (
        <div className=''>
            <label className='sidebar-brand'>E-commerce App</label>
            <div className='d-flex flex-column my-3'>
                <ul className='sidebar-ul'>
                    {navs.map((nav, index) => {
                        return !nav.children ?
                            (<li key={index}><Link className='sidebar-link' to={nav.to}>{nav.name}</Link></li>) :
                            (
                                <li key={index}>
                                    <label className="d-flex justify-content-between align-items-center text-white sidebar-link w-100" type="button" data-bs-toggle="collapse" data-bs-target={`#${nav.name}`} aria-expanded="false" aria-controls={nav.name}>
                                        {nav.name} <FontAwesomeIcon size='2xs' icon={faChevronDown} />
                                    </label>
                                    <div className="collapse collapse-vertical" id={nav.name}>
                                        <div className="card-body d-flex flex-column" style={{ width: '100%' }} >

                                            {nav.children.map((ch, idx) => {
                                                return (<Link className='sidebar-sub-link' key={idx} to={ch.to}>{ch.name}</Link>)
                                            })}
                                        </div>
                                    </div>
                                </li>
                            )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default SidebarNav