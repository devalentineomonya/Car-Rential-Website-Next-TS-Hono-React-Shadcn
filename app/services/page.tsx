import React from 'react'

import HeaderBanner from '@/components/common/shared/HeaderBanner'
import Auto from '@/features/services/widgets/Auto'
import Driver from '@/features/services/widgets/Driver'
import Rent from '@/features/services/widgets/Rent'
import Ride from '@/features/services/widgets/Ride'

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