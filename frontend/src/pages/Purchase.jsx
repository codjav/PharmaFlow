import React from 'react'
import SideBar from '../components/SideBar'
import Topbar from '../components/TopBar'

const Purchase = () => {
  return (
    <div className='flex'>
      <SideBar />
      <div className='flex-col w-full bg-[rgb(246,247,249)]'>
        <Topbar
          name="Purchase Management"
          description="Manage all medicine purchases from supplier"
        />
        Customer
      </div>
    </div>
  )
}

export default Purchase
