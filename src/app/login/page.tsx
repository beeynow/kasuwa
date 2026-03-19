'use client'
    import { AnimatePresence } from "motion/react"
    import { motion } from "framer-motion"
    import React, { useState } from "react"
    import { FaArrowRight } from "react-icons/fa6";
    import { IoEye, IoEyeOff  } from "react-icons/io5";
    import { FcGoogle } from "react-icons/fc";
    import { useRouter } from "next/navigation";
    import { ClipLoader } from "react-spinners";
import { signIn, useSession } from "next-auth/react";
import toast from 'react-hot-toast';

import { log } from "console";
    

function SignIn() {
    
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [showPassword, setShowPassword] = useState(false)
        const [loading, setLoading] = useState(false)
        const router = useRouter()
        const session = useSession()
        console.log(session.data?.user);
        
    
       const handleSignIn = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
    
try {
    const result = await signIn("credentials", {
        email,
        password,
        redirect: false
    });

    if (result?.error) {
        toast.error(result.error); // show error toast
    } else {
        router.push("/");
        toast.success("Login successful"); // show success toast
    }

    setLoading(false);

} catch (error: any) {
    console.error(error);
    setLoading(false);
    toast.error(error?.message || "Something went wrong"); // fallback message
}
    }
  return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6"> 
    
                <AnimatePresence mode='wait'>
                    {/* for step1 Ui */}
                    <motion.div
                    className='w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20'
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{duration:0.5}}
                    >
                    <h1 className="text-4xl font-semibold text-center mb-6 text-gray-100">Welcome Back to <span className="text-blue-400">Multicart</span></h1>
    
                    <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                        <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border border-white/30 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="relative">
                        <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 w-full focus:ring-blue-500"
                        />
                        <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-6 -translate-y-1/2 text-gray-400 hover:text-white transition">
                            {showPassword ? <IoEyeOff size={22}/> : <IoEye size={22}/>}
                        </button>
                        </div>
    
                        <motion.button
                        disabled={loading}
                        type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95}}
                        className="mt-4 text-xl px-8 py-3 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium"
                        >{loading ? <ClipLoader size={20} color="white"/> : "Login Now "}
                    </motion.button>
    
                    <div className="flex items-center my-3">
                        <div className="flex-1 h-px bg-gray-600"></div>
                        <span className="px-3 text-sm text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-600"></div>
                    </div>
    
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95}}
                        className="flex w-full items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition"
                        ><FcGoogle className="w-7 h-7"/><span>Login with Google</span>
                    </motion.button>
    
                    <p className="text-sm text-gray-400 mt-4 text-center">Create an account? {" "} <span onClick={()=>router.push("/register")} className="text-blue-400 hover:underline cursor-pointer">Register</span></p>
    
                    </form>
                    </motion.div>
                </AnimatePresence>
            </div>
  )
}

export default SignIn
