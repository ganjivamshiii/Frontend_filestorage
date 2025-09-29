import React, { useEffect } from 'react'
import HeroSection from '../components/landing/HeroSection'
import PricingSection from '../components/landing/PricingSection'
import TestmonialsSection from '../components/landing/TestmonialsSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'
import FeatureSection from '../components/landing/FeatureSection'
import { price} from '../assets/data'
import { useClerk,useUser } from '@clerk/clerk-react'
import { useNavigate } from "react-router-dom";
import FileConverter from '../components/landing/FileConverter'

const Landing = () => {

    const{ openSignIn, openSignUp}=useClerk();
    const{isSignedIn}=useUser();
    const navigate =useNavigate();

    useEffect(()=>{
          if(isSignedIn){
            navigate("/dashboard");
          }
    }, [isSignedIn,navigate]);

  return (
    <div>
        {/* HeroSection */}
        <HeroSection openSignIn={openSignIn}  openSignUp={openSignUp}/>
          
          <FeatureSection/>
          
    <FileConverter/>
         {/* Pricing Section */}
         <PricingSection pricingPlans={price} openSignUp={openSignUp}/>
    

         {/* Testimonial Section */}
         <TestmonialsSection/>
         

         {/* CTA Section  */}
          <CTASection openSignUp={openSignUp}/>
        
         {/* Footer Scetion  */}
         <Footer/>
    </div>
  )
}

export default Landing