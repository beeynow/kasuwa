import { auth } from '@/auth'
import AdminDashboard from '@/component/Admin/AdminDashboard'
import EditRoleandPhone from '@/component/EditRoleandPhone'
import Navbar from '@/component/Navbar'
import UserDashboard from '@/component/User/UserDashboard'
import VendorDashboard from '@/component/Vendor/VendorDashboard'
import connectDb from '@/lib/connectDB'
import User from '@/model/user.model'
import { redirect } from 'next/navigation'
import { userInfo } from 'os'
import React from 'react'

export default async function Home() {
    await connectDb()
    const session = await auth()
    const user = await User.findById(session?.user?.id)
    if(!user){
        redirect("/login")
    }
    const inComplete = !user.role || !user.phone || (!user.phone && user.role == "user")
    if(inComplete){
      return <EditRoleandPhone/>
    }

    const plainUser = JSON.parse(JSON.stringify(user))

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 font-sans flex-col'>
      <Navbar user={plainUser}/>
      {user?.role == "admin" ? <AdminDashboard/> : user?.role == "vendor" ? <VendorDashboard/> : <UserDashboard/>}
    </div>
  )
}
