import React from 'react';
import { features } from '../../assets/data';

const FeatureSection = () => {
  return (
    <div className="py-16">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold  sm:text-4xl">
            Use-mee! provides 
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Use Mee! provides all the tools you need to manage your digital content
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 p-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white/10 p-6  backdrop-blur-md border border-white/20"
            >
              <item.icon className={`w-10 h-10 ${item.iconColor}`} />
              <div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
