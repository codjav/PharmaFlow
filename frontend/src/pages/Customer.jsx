import React from 'react'
import SideBar from '../components/SideBar'
import Topbar from '../components/TopBar'

const Customer = () => {
  return (
    <div className='flex'>
      <SideBar />
      <div className='flex-col w-full bg-[rgb(246,247,249)]'>
        <Topbar />
        Customer
      </div>
    </div>
  )
}

export default Customer
