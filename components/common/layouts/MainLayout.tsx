import React from "react"
const MainLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className="w-full flex justify-center h-full">
        <div className="w-full container max-w-6xl h-full">
            {children}
        </div>
      
    </main>
  )
}

export default MainLayout
