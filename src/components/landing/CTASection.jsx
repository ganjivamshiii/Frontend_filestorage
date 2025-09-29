import React from 'react'

const CTASection = ({openSignUp}) => {
  return (
    <div className="bg-blue-700 flex flex-col md:flex-row justify-between items-center px-6 py-10">
  <div className="text-2xl md:text-4xl text-white mb-6 md:mb-0 md:ml-10">
    <h1>Ready to get start</h1>
    <h1>Create your account today</h1>
  </div>
  <div className="text-xl md:text-2xl md:mr-10">
    <button 
    onClick={openSignUp}
    className="px-6 py-2 bg-white text-blue-600 
    rounded-lg shadow hover:bg-gray-300"
    >
      Sign up
    </button>
  </div>
</div>

  )
}

export default CTASection