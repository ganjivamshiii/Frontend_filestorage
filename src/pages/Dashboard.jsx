import { useAuth } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import DashboardLayout from '../layout/DashboardLayout'

const Dashboard = () => {
  const {getToken }=useAuth();
   useEffect(()=>{
    const dispalytoken=async() =>{
      const token=await getToken();
      console.log(token);
    } 
    dispalytoken();
  },[]);

  return (
    <DashboardLayout activemenu="Dashboard">
          <div >
              Dashboard
          </div>
    </DashboardLayout>
  )
}

export default Dashboard