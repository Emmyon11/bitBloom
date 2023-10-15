'use client';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/store';
import { ArrowBigRightDash, Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface PlancardProps {
  planName: string;
  priceRange: string;
  rio: string;
  refBonus: string;
  link: string;
}

const PlanCard = ({
  planName,
  priceRange,
  rio,
  refBonus,
  link,
}: PlancardProps) => {
  const { user, userData } = useAppSelector((state) => state.user);
  return (
    <div className="bg-secondary rounded-md shadow-md gap-3 grid p-6 font-nunito">
      <h1 className=" mt-2 font-bold capitalize text-xl text-center tracking-wide">
        {planName}
      </h1>
      <hr />
      <p className=" text-2xl mt-2 text-center">{priceRange}</p>
      <hr />
      <div className=" flex">
        <Check className="inline-block text-green-300" />
        <p className=" text-gray-600 ml-2">ROI of {rio} Daily</p>
      </div>

      <hr />
      <div className="flex">
        <Check className="inline-block text-green-300" />
        <p className=" text-gray-600 text-center ml-2">
          Referal Bonus of {refBonus}
        </p>
      </div>

      <hr />
      <div className="flex">
        <Check className="inline-block text-green-300" />
        <p className=" text-gray-600 ml-2 ">24/7 support</p>
      </div>
      <Link
        className="flex items-center justify-center"
        href={user ? '/profile_update' : '/auth/login'}
      >
        <Button>
          Get This Plan <ArrowBigRightDash />{' '}
        </Button>
      </Link>
    </div>
  );
};

export default PlanCard;
