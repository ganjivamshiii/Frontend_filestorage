import React from 'react'
import { CreditCard } from 'lucide-react'
const CreditsDisplay = ({credits}) => {
  return (
     <div className="flex items-center gap-1 px-3 py-1 5 rounded-full text-blud-700">
        <CreditCard size={16}/>
        <span className=" font-small text-green-600 font-bold">{credits}</span>
        <span className="text-xs ">Credits</span>
     </div>
  )
}

export default CreditsDisplay