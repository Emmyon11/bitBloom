import React from 'react';
import TradingDashboard from './components/trading_dashboard';
import Profile from './components/profile';

const DashBoard = () => {
  return (
    <main>
      <div className="grid  md:grid-cols-3 lg:grid-cols-4 ">
        <div className="">
          <Profile />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <TradingDashboard />
        </div>
      </div>
    </main>
  );
};

export default DashBoard;
