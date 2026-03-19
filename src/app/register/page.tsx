'use client'
import { AnimatePresence, motion } from "motion/react"
import React, { useState } from "react"
import { FaArrowRight } from "react-icons/fa6";
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { signIn } from "next-auth/react";



function Register() {
    const [step, setStep] = useState<1 | 2>(1)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

   const handleSignUp = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
        const result = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })

        const data = await result.json()
        console.log(data)
        setLoading(false)
        setEmail("")
        setPassword("")
        setName("")
        router.push("/login")
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
}
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6"> 

            <AnimatePresence mode='wait'>
                {/* for step1 Ui */}
                {step == 1 && 
                <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -40 }} 
                transition={{duration:0.5}}
                className='w-full max-w-lg text-center bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-white/20'>
                    <h1 className="text-4xl font-bold mb-4 text-blue-400">Welcome to KASUWA</h1>
                    <p className="text-gray-300 mb-4">Register with one of the following account types:</p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {
                            [
                                { label: "User", icon: "👤", value: "user"},
                                { label: "Vendor", icon: "🏪", value: "vendor"},
                                { label: "Admin", icon: "👑", value: "admin"},
                            ].map((item)=>(
                               <motion.div
                               key={item.value}
                               whileHover={{ scale: 1.1 }}
                               whileTap={{ scale: 0.95}}
                               className="p-4 flex flex-col bg-white/5 items-center hover:bg-white/20 cursor-pointer rounded-xl border border-white/30 shadow-lg transition">
                                <span className="text-4xl mb-2">{item.icon}</span>
                                <span className="text-sm font-medium">{item.value}</span>
                               </motion.div>
                            ))
                        }
                    </div>

                    <motion.button
                    onClick={()=>setStep(2)}
                    whileHover={{ scale: 1.0 }}
                    whileTap={{ scale: 0.95}}
                    className="mt-4 text-xl px-8 py-3 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium"
                    >next<FaArrowRight/>
                </motion.button>


                </motion.div>}
                {/* for step2 Ui */}
                {step == 2 && 
                <motion.div
                className='w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{duration:0.5}}
                >
                <h1 className="text-4xl font-semibold text-center mb-6 text-blue-300">Create Your Account</h1>

                <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                    <input 
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none w-full focus:ring-2 focus:ring-blue-500"
                    />
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
                    >{loading ? <ClipLoader size={20} color="white"/> : "Register Now "}
                </motion.button>

                <div className="flex items-center my-3">
                    <div className="flex-1 h-px bg-gray-600"></div>
                    <span className="px-3 text-sm text-gray-400">or</span>
                    <div className="flex-1 h-px bg-gray-600"></div>
                </div>

                <motion.button
                onClick={()=>signIn("google" , {callbackUrl: "/"})}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95}}
                    className="flex w-full items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition"
                    ><FcGoogle className="w-7 h-7"/><span>Continue with Google</span>
                </motion.button>

                <p className="text-sm text-gray-400 mt-4 text-center">Already have an account? <span onClick={()=>router.push("/login")} className="text-blue-400 hover:underline cursor-pointer">Login</span></p>

                </form>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default Register