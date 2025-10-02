import React, { useContext, useEffect, useState } from 'react'
import { Menu, X, Share2, Wallet } from "lucide-react"
import { Link } from 'react-router-dom'
import { SignedIn, UserButton } from '@clerk/clerk-react'
import Sidemenu from './Sidemenu'
import CreditsDisplay from './CreditsDisplay'
import { UserCreditsContext } from '../context/UserCreditsContext'

const Navbar = ({activemenu}) => {
  const [openSideMenu, setOpenMenu] = useState(false);
  const {credits,fetchUserCredits}=useContext(UserCreditsContext);
  useEffect(()=>{
    fetchUserCredits();
  },[fetchUserCredits]);
  return (
    <div
      className="fixed top-0 left-0 w-full z-50
        flex items-center justify-between gap-5
        px-6 py-4
        backdrop-blur-lg border-b
         border-white/30 shadow-md"
    >
      {/* left side-menu button + Use Mee */}
      <div className="flex items-center gap-4">
        <button
  onClick={() => setOpenMenu(!openSideMenu)}
  className="p-2 rounded-xl hover:bg-white/30 transition lg:hidden"
>
  {openSideMenu ? (
    <X className="w-6 h-6 " />
  ) : (
    <Menu className="w-6 h-6 " />
  )}
</button>


        <div className="flex font-semibold gap-2">
          <Share2 className="text-blue-600 w-5 h-5" />
          <span>Use Mee!</span>
        </div>
      </div>

      {/* right side icons */}
      <SignedIn>
        <div className="flex items-center gap-4">
          <Link to="/subscription" className="hover:scale-105 transition">
          <CreditsDisplay credits={credits}/>
            {/* <Wallet className="w-5 h-5" /> */}
          </Link>
          <div className="relative">
            <UserButton />
          </div>
        </div>
      </SignedIn>

      {/* Side Menu */}
      {openSideMenu && (
        <div className="fixed
          top-[73px] left-0 
          right-0 lg:hidden z-40 
          bg-white/5 backdrop-blur-lg
          border-b border-white/20
          shadow-md">
          <Sidemenu activemenu={activemenu}/>
        </div>
      )}
    </div>
  )
}

export default Navbar
