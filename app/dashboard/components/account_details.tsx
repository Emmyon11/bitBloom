import { Button } from '@/components/ui/button';
import { USDollarFormat } from '@/utils/currency_formater';
import { formatDate } from '@/utils/getdays';
import { LucideBarChartBig } from 'lucide-react';
import React from 'react';
interface Props {
  walletData: Wallet | undefined | null;
}

const AccountDetail: React.FC<Props> = ({ walletData }) => {
  return (
    <div className="rounded-md grid gap-3 p-3 md:p-8 bg-primary-foreground text-primary font-inconsolata  shadow-md">
      <h1 className="text-2xl font-bold">Account Detail</h1>
      <div className="flex justify-between gap-3 w-full">
        <div className="">
          <h1 className=" md:text-xl font-bold ">Creation date</h1>
          <p className="text-gray-500">
            {walletData?.investment_date
              ? formatDate(walletData?.investment_date)
              : '...'}
          </p>
        </div>
        <div>
          <h1 className=" md:text-xl font-bold">Balance</h1>
          <p className="text-gray-500">
            {walletData?.current_balance
              ? USDollarFormat.format(walletData?.current_balance)
              : 0}
          </p>
        </div>

        <Button className="md:gap-2 bg-green-500 cursor-default hover:bg-green-500  text-primary">
          <LucideBarChartBig className="" />
          Trading Details
        </Button>
      </div>
      <div className="grid w-full md:w-1/2">
        <h1 className="capitalize font-bold md:text-xl">Trading cycle date</h1>
        <div className="flex gap-12 w-full">
          <div className=" flex gap-3">
            <h1 className="font-bold text-gray-500">start date</h1>{' '}
            <span className="text-green-500">
              {walletData?.investment_date
                ? formatDate(walletData?.investment_date)
                : '...'}
            </span>
          </div>
          <div className="flex gap-3 ">
            <h1 className="font-bold text-gray-500 ">End date</h1>{' '}
            <span className="text-green-500">...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
