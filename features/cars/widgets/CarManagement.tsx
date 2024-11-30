import React from 'react'

import CarsTable from '../components/CarsTable'

import {payments} from "./carData"
import { columns } from './TableColumns'
const CarManagement = () => {
  return (
    <div>
        <CarsTable columns={columns} data={payments}/>
    </div>
  )
}

export default CarManagement