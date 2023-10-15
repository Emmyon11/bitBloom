'use client';
import Image from 'next/image';
import wave1 from '@/assets/svgs/wave_blue.svg';
import wave2 from '@/assets/svgs/wave_multi.svg';
import wave3 from '@/assets/svgs/wave_yellow.svg';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart2, Bitcoin, Calendar } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import TradingViewWidget from './live_trading_chart';
import AccountDetail from './account_details';
import { useAppSelector } from '@/lib/store';
import { USDollarFormat } from '@/utils/currency_formater';
import { getDaysDifference } from '@/utils/getdays';

const TradingDashboard = () => {
  const { user, userData, isLoading, walletData, error } = useAppSelector(
    (state) => state.user
  );

  const tradeDatas = [
    {
      id: 1,
      image: wave1,
      avaterBg: 'bg-green-400',
      Icon: <BarChart2 className="text-white" />,
      data: walletData
        ? USDollarFormat.format(
            walletData?.current_balance - walletData?.initial_investment
          )
        : USDollarFormat.format(0),
      label: 'Profit',
    },
    {
      id: 2,
      image: wave2,
      avaterBg: 'bg-yellow-400',
      Icon: <Bitcoin className="text-white" />,
      data: walletData
        ? USDollarFormat.format(walletData?.initial_investment)
        : USDollarFormat.format(0),
      label: 'Initial',
    },
    {
      id: 3,
      image: wave3,
      avaterBg: 'bg-blue-400',
      Icon: <Calendar className="text-white" />,
      data: walletData
        ? `${getDaysDifference(walletData?.investment_date)} Days`
        : '',
      label: 'Investment days',
    },
  ];

  return (
    <main className="grid p-6 gap-8  md:min-h-screen">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tradeDatas.map((tradeData) => {
          return (
            <Card
              key={tradeData.id}
              className="relative bg-primary-foreground  overflow-hidden"
            >
              <Image
                src={tradeData.image}
                alt=""
                className="absolute bottom-0 opacity-70 left-0 right-0 z-0 object-cover"
              />
              <CardContent className="p-5 grid gap-5 items-center  relative z-10">
                <Avatar
                  className={`${tradeData.avaterBg} grid items-center justify-center`}
                >
                  {tradeData.Icon}
                </Avatar>
                <div className="">
                  <h1 className="text-2xl font-inconsolata font-bold">
                    {tradeData.data}
                  </h1>
                  <p className="font-normal text-gray-500">{tradeData.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="rounded-md h-60 overflow-hidden">
        <TradingViewWidget />
      </div>
      <div className="">
        <AccountDetail walletData={walletData} />
      </div>
    </main>
  );
};

export default TradingDashboard;
