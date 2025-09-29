import React from 'react'
import { useUser } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';
import Sidemenu from '../components/Sidemenu';

const DashboardLayout = ({children, activemenu}) => {
    const {user} = useUser();
    
    return (
        <div>
            {user && (
                <>
                    {/* Navbar - fixed at top */}
                    <Navbar activemenu={activemenu}/>
                    
                    <div className="flex">
                        {/* Sidemenu - fixed at left, hidden on mobile */}
                        <div className="max-[1080px]:hidden">
                            <Sidemenu activemenu={activemenu}/>
                        </div>
                        
                        {/* Main content area */}
                        <div className="flex-1 ml-0 max-[1080px]:ml-0 min-[1081px]:ml-64">
                            <div className="p-6 pt-[85px] min-h-screen">
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default DashboardLayout