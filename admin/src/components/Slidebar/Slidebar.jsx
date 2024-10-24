/* eslint-disable no-unused-vars */
import React from 'react'
import "./Slidebar.css"
import { assets } from '../../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'
const Slidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sildebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink  to='/list' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
      
    </div>
  )
}

export default Slidebar
