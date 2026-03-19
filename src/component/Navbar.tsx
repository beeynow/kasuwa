"use client"
import React, { useState } from 'react'
import { IUser } from '@/model/user.model'
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from 'next/navigation'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlinePhone,
  AiOutlineShop,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineSolution
} from "react-icons/ai"
import { BiCategory } from "react-icons/bi";
import { GoListUnordered } from 'react-icons/go'
import { signOut } from 'next-auth/react'

function Navbar({user}:{user:IUser}) {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className='fixed top-0 px-15 w-full bg-black text-white z-50 sha'>
      <div className='max--w-7xl mx-auto px-6 py-3 flex justify-between items-center'>
        {/* logo */}
        <div className='flex items-center gap-2 cursor-pointer' onClick={()=>router.push("/public")}>
         <Image src={logo} width={40} height={40} alt='logo' className='rounded-sm'/>
         <span className='text-3xl font-semibold hidden sm:inline'>Kasuwa</span>

        </div>
         {user?.role == 'user' && <div className='hidden md:flex gap-8'>
            <NavItem label="Home" path="/" router={router}/>
            <NavItem label="Categories" path="/categories" router={router}/>          
            <NavItem label="Shop" path="/shop" router={router}/>
            <NavItem label="Order" path="/order" router={router}/>

            </div>}
            {/* destop icons */}
            <div className='hidden md:flex items-center gap-6'>
              {user?.role == 'user' && <IconBtn Icon={AiOutlineSearch} onClick={()=>router.push("/category")}/>
                }
                <IconBtn Icon={AiOutlinePhone} onClick={()=>router.push("/support")}/>

                <div className='relative'>
                  {user?.image ? <Image src={user?.image} alt='user' width={40} height={40} className='w-10 h-10 rounded-full object-cover border border-gray-700 cursor-pointer' onClick={()=>setOpenMenu(!openMenu)}/>: 
                    <IconBtn Icon={AiOutlineUser} onClick={()=>setOpenMenu(!openMenu)}/>}

                  <AnimatePresence>
                    {openMenu && <motion.div initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{duration:0.5}} 
                    className='absolute right-0 mt-3 rounded-2xl w-48 backdrop-blur-lg border bg-[#6a69693c]'>
                      <DropDownBtn Icon={AiOutlineUser} label="Profile" onClick={()=>{router.push("/profile"); setOpenMenu(false)}}/>
                      <DropDownBtn Icon={AiOutlineLogin} label="SignIn" onClick={()=>{router.push("/login"); setOpenMenu(false)}}/>
                      <DropDownBtn Icon={AiOutlineMenu} label="SignOut" onClick={()=>{signOut(); setOpenMenu(false)}}/>

                    </motion.div>}
                  </AnimatePresence>


                </div>


                  {user?.role == "user" && <CartBtn router={router} count="5"/>}
            </div>


            {/* mobile icons */}

            <div className='md:hidden flex items-center gap-4'>

              {user?.role == "vendor" || user?.role == "admin" ? (
                <>
                <IconBtn Icon={AiOutlinePhone} onClick={()=>router.push("/support")}/>
                <div className='relative'>
                  {user?.image ? <Image src={user?.image} alt='user' width={32} height={32} className='w-8 h-8 rounded-full object-cover border border-gray-700 cursor-pointer' onClick={()=>setOpenMenu(!openMenu)}/>: 
                    <IconBtn Icon={AiOutlineUser} onClick={()=>setOpenMenu(!openMenu)}/>}

                  <AnimatePresence>
                    {openMenu && <motion.div initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{duration:0.5}} 
                    className='absolute right-0 mt-3 rounded-2xl w-48 backdrop-blur-lg border bg-[#6a69693c]'>
                      <DropDownBtn Icon={AiOutlineUser} label="Profile" onClick={()=>{router.push("/profile"); setOpenMenu(false)}}/>
                      <DropDownBtn Icon={AiOutlineLogin} label="SignIn" onClick={()=>{router.push("/login"); setOpenMenu(false)}}/>
                      <DropDownBtn Icon={AiOutlineMenu} label="SignOut" onClick={()=>{signOut(); setOpenMenu(false)}}/>

                    </motion.div>}
                  </AnimatePresence>


                </div>

                </>
              ):(
                <>
                <IconBtn Icon={AiOutlineSearch} onClick={()=>router.push("/category")}/>
                <IconBtn Icon={AiOutlinePhone} onClick={()=>router.push("/support")}/>
                <CartBtn router={router} count="5"/>
                <AiOutlineMenu size={25} className='cursor-pointer' onClick={()=>setSidebarOpen(true)}/>

                <AnimatePresence>
                  {sidebarOpen && <motion.div
                  initial={{ x: "100%"}}
                  animate={{ x: 0}}
                  exit={{ x: "100%"}}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  className='fixed top-0 right-0 h-screen w-[65%] bg-black/90 backdrop-blur-lg p-6 text-white'
                  >
                    <div className='flex justify-between items-center mb-6'>
                      <h1 className='text-sl font-semibold'>Menu</h1>
                      <AiOutlineClose size={28} className='cursor-pointer' onClick={()=>setSidebarOpen(false)}/>
                    </div>
                    <div className='flex flex-col gap-4 text-lg'>
                      <SidebarBtn Icon={AiOutlineHome} label="Home" path="/" router={router} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtn Icon={BiCategory} label="Category" path="/category" router={router} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtn Icon={AiOutlineShop} label="Shop" path="/shop" router={router} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtn Icon={GoListUnordered} label="Orders" path="/orders" router={router} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtn Icon={AiOutlineUser} label="Profile" path="/profile" router={router} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtn Icon={AiOutlineLogin} label="Login" path="/login" router={router} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtnforSignOut Icon={AiOutlineLogout} label="Logout" setSidebarOpen={setSidebarOpen}/>
                      
                    </div>

                  </motion.div>}
                </AnimatePresence>
                </>
              )}
            </div>
      </div>
    </div>
  )
}

export default Navbar

// components
const NavItem = ({ label , path , router }: any)=>(
  <motion.button onClick={()=>router.push(path)} className='hover:text-gray-300'>{label}</motion.button>


)
const IconBtn = ({Icon , onClick}: any)=>(
  <motion.button whileHover={{scale : 1.1}} onClick={onClick}>
    <Icon size={24}/>
  </motion.button>
)

const DropDownBtn = ({Icon , label , onClick , close}:any)=>(
  <button className='flex items-center gap-2 w-full pl-3 pr-0 py-2 hover:bg-white/10 text-left' onClick={()=>onClick()}>
    <Icon size={18}/>{label}</button>
)

const CartBtn = ({router , count}:any)=>(
  <motion.button className='relative' whileHover={{scale : 1.1}} onClick={()=>router.push("/cart")}>
    <AiOutlineShoppingCart size={24} />

   {count >0 && <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1'>{count}</span>}
  </motion.button>
)

const SidebarBtn = ({label , path , router , Icon , setSidebarOpen}: any)=>(
  <button className='flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left' onClick={()=>{router.push(path); setSidebarOpen(false)}}>
    <Icon size={20}/>{label}

  </button>

)

const SidebarBtnforSignOut = ({label , Icon , setSidebarOpen}: any)=>(
  <button className='flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left' onClick={()=>{signOut(); setSidebarOpen(false)}}>
    <Icon size={20}/>{label}

  </button>

)