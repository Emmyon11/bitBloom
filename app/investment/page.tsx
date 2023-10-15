'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import InvestmentPlans from '../components/investment_plan';
import PlanCard from '../components/plan_card';

const Investment = () => {
  return (
    <div className="min-h-screen w-screen grid justify-center items-center">
      <div className="">
        <div className="font-nunito text-center">
          <h1 className=" font-bold text-xl md:text-4xl ">
            {' '}
            Update your profile to your prefared investment plan
          </h1>
          <p className=" text-gray-400 text-sm md:text-xl">
            Click on any of the plan if to go to update page if you are
            registered
          </p>
        </div>
        <div className="w-screen grid md:grid-cols-4 gap-8 p-8">
          <PlanCard
            planName="Basic"
            priceRange="$100 - $500"
            refBonus="5%"
            rio="3.5%"
            link=""
          />
          <PlanCard
            planName="Standard"
            priceRange="$500 - $5000"
            refBonus="7%"
            rio="5%"
            link=""
          />
          <PlanCard
            planName="Premium"
            priceRange="$5,000 - $10,000"
            refBonus="10%"
            rio="7%"
            link=""
          />
          <PlanCard
            planName="Gold"
            priceRange="$10,000 - Unlimited"
            refBonus="10%"
            rio="10%"
            link=""
          />
        </div>
      </div>
    </div>
  );
};

export default Investment;
