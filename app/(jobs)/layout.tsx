import React from 'react'

const JobLayout = ({children}:{children:React.ReactNode}) => {
  return (
<div className='w-[96%] mx-auto mt-2 flex flex-col '>{children}</div>
  )
}

export default JobLayout