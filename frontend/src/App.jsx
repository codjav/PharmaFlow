import {useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import Medicine from './pages/Medicine';
import Supplier from './pages/Supplier';
import Customer from './pages/Customer';
import Alerts from './pages/Alerts';
import Sale from './pages/Sale';
import Bill from './pages/Bill';
import Setting from './pages/Setting';
import Purchase from './pages/Purchase';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/medicines' element={<Medicine />} />
      <Route path='/supplier' element={<Supplier />} />
      <Route path='/customer' element={<Customer />} />
      <Route path='/alerts' element={<Alerts />} />
      <Route path='/sale' element={<Sale />} />
      <Route path='/purchase' element={<Purchase />} />
      <Route path='/bill' element={<Bill />} />
      <Route path='/setting' element={<Setting />} />
    </Routes>
  )
}

export default App
