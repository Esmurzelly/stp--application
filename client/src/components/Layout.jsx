import React from 'react'
import NavBar from './NavBar'

const Layout = ({ children }) => {
    return (
        <div className='container mx-auto'>
            <NavBar />
            {children}
        </div>
    )
}

export default Layout