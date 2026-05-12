import React from 'react'
import SideBar from '../components/SideBar'
import Topbar from '../components/TopBar'

const Supplier = () => {
  return (
    <div className='flex'>
      <SideBar />
      <div className='flex-col w-full bg-[rgb(246,247,249)]'>
        <Topbar
          name="Supplier Management"
          description="Manage your medicine supplier"
        />
        supplier
      </div>
    </div>
  )
}

export default Supplier
