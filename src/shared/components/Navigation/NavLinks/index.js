import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'

import { AuthContext } from '../../../context/auth-context'

import './index.css'

const NavLinks = props => {
    const auth = useContext(AuthContext)
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to='/' exact>ALL USERS</NavLink>
            </li>
            {auth.isLoggedIn &&
                <>
                    <li>
                        <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
                    </li>
                    <li>
                        <NavLink to='/places/new'>ADD PLACE</NavLink>
                    </li>
                    <li>
                        <Link to='/'>
                            <button onClick={auth.logout}>LOGOUT ({auth.userEmail})</button>
                        </Link>
                    </li>
                </>
            }
            {!auth.isLoggedIn &&
                <li>
                    <NavLink to='/auth'>AUTHENTICATE</NavLink>
                </li>
            }
            <hr />
            <li>
                <NavLink to='/about'>ABOUT ME</NavLink>
            </li>
        </ul>
    )
}

export default NavLinks