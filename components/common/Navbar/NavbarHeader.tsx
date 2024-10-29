import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Link from "next/link"
const NavbarHeader = () => {
  return (
   <MainLayout>
    <header className="h-10 w-full flex items-center justify-between">
        <div className='text-sm '>
            <Link href="/faq">FAQ&apos;s</Link>
            
        </div>
    </header>
   </MainLayout>
  )
}

export default NavbarHeader
