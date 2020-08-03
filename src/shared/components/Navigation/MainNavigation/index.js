import React from 'react'
import { Link } from 'react-router-dom'

import MainHeader from '../MainHeader'
import NavLinks from '../NavLinks'

import './index.css'

const MainNavigation = props => {
    return (
        <MainHeader>
            <h1 className='main-navigation__title'>
                <Link to='/'>
                    TRIP BOOK
               </Link>
            </h1>
            <nav className='main-navigation__header-nav'>
                <NavLinks />
            </nav>
        </MainHeader>
    )
}

export default MainNavigation