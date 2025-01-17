import React from "react"

import {cn} from "@/lib/utils"
const MainLayout = ({children,className}:{className?:string,children:React.ReactNode}) => {
  return (
    <main className="w-full  h-full">
        <div className={cn("w-full container max-w-7xl mx-auto h-full", className)}>
            {children}
        </div>

    </main>
  )
}

export default MainLayout
