import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { SIDE_MENU_DATA } from '../assets/data';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidemenu = ({activemenu}) => {
    const { user } = useUser();
    const navigate=useNavigate();

    return (
 <div className="w-64 
 h-[calc(100vh-79px)] 
 p-5 fixed top-[65px]
 ">
            <div className="flex flex-col 
            items-center justify-center
             gap-3 mb-7">
                {user?.imageUrl ? (
                    <img src={user.imageUrl || " "} alt="profile image" className="w-20 h-20 rounded-full"/>
                ) : (
                    <User className="w-20 h-20 text-xl"/>
                )}
                <h5 className="font-medium leading-6">
                    {user?.fullname || ""}
                </h5>
            </div>
{SIDE_MENU_DATA.map((item, index) => (
  <button 
    key={`menu_${index}`}
    className={`w-full 
      flex items-center 
      gap-4 text-[15px]
      py-3 px-6 
      rounded-lg mb-3 transition-all
      duration-200 
      hover:bg-gray-200/20 hover:translate-x-1 
      ${activemenu === item.label 
        ? "font-medium hover:bg-blue-400" 
        : "hover:bg-white-600"}`}
    onClick={() => navigate(item.path)}
  >
    <item.icon className="text-xl"/>
    {item.label}
  </button>
))}

        </div>
    )
}

export default Sidemenu;
