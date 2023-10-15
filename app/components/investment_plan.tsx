import React from 'react';
import PlanCard from './plan_card';

const InvestmentPlans = () => {
  return (
    <main className="p-8">
      <div className="grid md:grid-cols-4 gap-5">
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
    </main>
  );
};

export default InvestmentPlans;
