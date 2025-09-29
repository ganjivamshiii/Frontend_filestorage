import React from 'react'

const HeroSection = ({openSignIn, openSignUp}) => {
  return (
    <div className="landing-page-content relative m-4 text-center font-bold ">
      {/* Main title */}
      <div className="text-3xl sm:text-4xl md:text-5xl mt-10 text-blue-500">
        <h1>Use-Mee!</h1>
      </div>

      {/* Subtitle */}
      <div className="text-xl sm:text-2xl md:text-3xl mt-4">
        <h2>Safe, Secure & Fast</h2>
      </div>

      {/* Description */}
      <div className="text-sm sm:text-base md:text-lg mt-4 font-normal  max-w-2xl mx-auto px-2">
        <p>
          A reliable platform designed to keep your data protected while delivering lightning-fast performance.  
          Experience security, speed, and simplicity — all in one place <span>🚀</span>
        </p>
      </div>

      {/* Call-to-action button */}
        <div className="mt-6 flex gap-4 justify-center items-center">
  <button
    className="px-6 py-3 bg-blue-700 hover:bg-blue-500 shadow-lg text-white font-semibold text-sm sm:text-base"
    onClick={openSignIn}
  >
    Get Started
  </button>
  <button
    className="px-6 py-3 bg-blue-700 hover:bg-blue-500 shadow-lg text-white font-semibold text-sm sm:text-base"
    onClick={openSignUp}
  >
    Sign Up
  </button>
</div>

    </div>
  )
}

export default HeroSection
