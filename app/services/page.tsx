import HeaderBanner from '@/components/common/shared/HeaderBanner'
import Ride from '@/features/services/widgets/Ride'
import Rent from '@/features/services/widgets/Rent'
import React from 'react'
import Driver from '@/features/services/widgets/Driver'
import Auto from '@/features/services/widgets/Auto'

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