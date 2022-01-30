import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
    return <h1>Page not found <b>404</b><button><NavLink to='/'>Please go home page</NavLink></button></h1>
}

export default Error
