import React from 'react'
import CarsTable from '../components/CarsTable'
import { columns } from './TableColumns'
import {payments} from "./carData"
const CarManagement = () => {
  return (
    <div>
        <CarsTable columns={columns} data={payments}/>
    </div>
  )
}

export default CarManagement