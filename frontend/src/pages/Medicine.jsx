import { useState } from 'react';
import { useMedicines } from '../hooks/useMedicines';
import { medicineService } from '../services/medicineService';

import SideBar from '../components/SideBar'
import Topbar from '../components/TopBar';
import { useMedicines } from '../hooks/useMedicines';


const Medicine = () => {
  return (
    <div className='flex'>
      <SideBar />
      <div className='flex-col w-full bg-[rgb(246,247,249)]'>
        <Topbar />
        <>
        
        </>
      </div>
    </div>
  )
}

export default Medicine
