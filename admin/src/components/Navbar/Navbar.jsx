// eslint-disable-next-line no-unused-vars
import React from 'react'
import {assets} from "../../assets/admin_assets/assets.js"
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <img className='profile' src={assets.profile_image} alt="" />
    
    </div>
  )
}

export default Navbar
