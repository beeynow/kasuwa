import { IUser } from '@/model/user.model'
import React from 'react'
import VendorDashboard from './VendorDashboard'

function VendorPage({user}:{user:IUser}) {
  if(!user){
    return (
            <div className="w-full min-h-screen flex items-center justify-center text-white bg-linear-to-br from-gray-900 via-black to-gray-900">
        Loading...
    </div>
    )
    
  }

  if(user.verificationStatus == "approved"){
    return(
        <div className="">
            <VendorDashboard />
        </div>
    )
  }

  if(user.verificationStatus == "pending"){
    return(
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4">
          <div className="bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-2xl border border-white/30 max-w-2xl w-full justify-center text-center">
            <h2 className="text-4xl font-bold mb-6 text-blue-400">Verification Pending </h2>
            <p className='text-gray-200 text-lg leading-relaxed'>
                You can access vendor dashboard only after <span className='font-bold text-blue-600'> admin verification </span>
            </p>
            <div className="mt-6 text-base text-gray-300">
                Verification Status : {" "} <span className='text-blue-400 font-semibold uppercase'>{user.verificationStatus}</span>
            </div>
            <div className="mt-10 text-sm text-gray-400">It usually take 2-8 hours.</div>
          </div>
        </div>
    )
  }

  if(user.verificationStatus == "rejected"){
    return(
         <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4">
         
        </div>
    )
  }

}

export default VendorPage
