import React from 'react';
import ceo from '@/public/images/ceo-bitbloom.png';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const About = () => {
  return (
    <div>
      <div className=" min-h-screen p-8 grid items-center text-center justify-center">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-semibold mb-4">
            About Bit Bloom Investment Platform
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Welcome to our platform, where we help you invest in Bitcoin, one of
            the most exciting and potentially rewarding financial assets in the
            world.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg mb-8">
            Our mission is to make Bitcoin investment accessible to everyone. We
            believe in the power of cryptocurrency and blockchain technology to
            revolutionize the financial world.
          </p>
          <div className="grid w-full items-center">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="text-justify list-disc list-inside text-gray-700 text-lg mb-8">
              <li>Experienced team of financial experts</li>
              <li>Secure and user-friendly platform</li>
              <li>Transparent investment strategies</li>
              <li>Diverse portfolio options</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* You can add team member cards here */}
            <Card className="overflow-hidden">
              <Image width={0} height={0} src={ceo} alt="ceo_image" />
              <div className="grid items-center justify-center p-4">
                <h3 className="text-xl font-semibold">
                  Christopher Jaszczynski
                </h3>
                <p className="text-gray-700">Co-Founder & CEO</p>
              </div>
            </Card>
            {/* Repeat this structure for each team member */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
