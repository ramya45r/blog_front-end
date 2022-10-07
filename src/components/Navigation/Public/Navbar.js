import React from 'react'
import { useSelector } from 'react-redux'

import AdminNavbar from '../Admin/AdminNavbar'
import PrivateNavbar from '../Private/PrivateNavbar'
import PublicNavbar from './PublicNavbar'

const Navbar = () => {
    //Get user from store
    const state =useSelector(state =>state.users);
    const {userAuth} =state;
    const isAdmin =userAuth?.isAdmin;
   console.log(isAdmin);
  return (
    <div>
     {isAdmin? <AdminNavbar/>: userAuth ? <PrivateNavbar/>: <PublicNavbar/> }
    </div>
  )
}

export default Navbar
