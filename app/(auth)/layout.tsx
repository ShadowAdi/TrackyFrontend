'use client'
import React, { ReactNode } from 'react'

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className='flex flex-col gap-4 w-[96%] mx-auto h-full  '>{children}</main>
  )
}

export default AuthLayout