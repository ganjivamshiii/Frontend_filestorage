import React from "react";
import { Check } from "lucide-react";
// import { pricingPlans } from "../../assets/data";

const PricingSection = ({ pricingPlans, openSignUp}) => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Choose the plan that's right for you
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="mt-16 text-white space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col bg-black overflow-hidden shadow-md transition-transform ${
                plan.highlighted
                  ? "border-2 border-white-500 transform scale-105"
                  : "border border-white-200"
              }`}
            >
              {/* Plan Header */}
              <div
                className={`px-6 py-8 text-white${
                  plan.highlighted
                    ? "bg-gradient-to-br from-purple-50 to-white text-white"
                    : "bg-gray"
                }`}
              >
                <h3 className="text-3xl text-white text-bold">
                  {plan.name}
                </h3>
                <p className="mt-4 text-sm text-white-500">
                  {plan.description}
                </p>
                <p className="mt-6 text-2xl font-bold text-white-900">
                  {plan.price}
                </p>
              </div>

              {/* Features */}
              <div className=" text-white flex-1 flex flex-col justify-between px-6 pb-8 ">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-white-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-8">
                  <button
                  onClick={openSignUp}
                    className={`w-full flex items-center 
                                justify-center px-5
                                py-3 border border-transparent 
                                text-base font-medium rounded-md transition ${
                                plan.highlighted
                                ? "text-white bg-white-600 hover:bg-white-700"
                                : "text-blue-600  hover:bg-gray-100" }`}>
                              {plan.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
