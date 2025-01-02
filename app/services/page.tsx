import React from 'react'

import HeaderBanner from '@/components/common/shared/HeaderBanner'
import Auto from '@/screens/services/widgets/Auto'
import Driver from '@/screens/services/widgets/Driver'
import Rent from '@/screens/services/widgets/Rent'
import Ride from '@/screens/services/widgets/Ride'

const Services = () => {
  return (
    <>
    <HeaderBanner/>
    <Ride/>
    <Rent/>
    <Driver/>
    <Auto/>
    </>
  )
}

export default Services