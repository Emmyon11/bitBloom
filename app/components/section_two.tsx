'use client';
import Image from 'next/image';
import trader from '@/public/images/trader.jpg';
import { Bitcoin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

function SectionTwo() {
  return (
    <main>
      <div className="grid md:grid-cols-2 h-screen  bg-secondary-foreground">
        <div className="flex flex-col w-full items-center justify-center h-full relative">
          <div className="w-3/4 overflow-hidden h-5/6 rounded-md">
            <Image
              src={trader}
              alt="trader"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white md:grid hidden rounded-lg rounded-tl-none w-2/5 gap-2 shadow-lg p-2 top-1/2 mt-8  left-2/3 absolute">
            <div className=" flex flex-col gap-5 p-6 bg-purple-200 rounded-md rounded-tl-none ">
              <div className="flex  items-center justify-between">
                <div className=" text-center ">
                  <h1 className="font-medium">Investments</h1>
                  <div className="">
                    <h1>Current value</h1>
                    <p>$12,900.69</p>
                  </div>
                </div>
                <div className="text-center flex flex-col items-center justify-center">
                  <div className="rounded-full flex items-center justify-center text-yellow-600 h-7 w-7 overflow-hidden bg-black ">
                    <Bitcoin className="" />
                  </div>
                  <div className="">BTC</div>
                  <p>+20.01%</p>
                </div>
              </div>
              <div className="">
                <hr className="text-black" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <h1 className="text-lg">High</h1>
                  <h3>$14,056.50</h3>
                </div>
                <div className=" text-center">
                  <h1 className="text-lg">Low</h1>
                  <h1>$14,056.50</h1>
                </div>
              </div>
            </div>

            <div className="grid gap-5 grid-cols-2 text-white relative ">
              <div className="grid items-center justify-center text-center bg-black rounded-lg p-8">
                <h1 className="text-lg font-bold">Sell</h1>
              </div>
              <div className="grid items-center justify-center text-center  bg-black rounded-lg p-8">
                <h1 className="text-lg font-bold">Buy</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-5 gap-5  justify-center">
          <div className="">
            <div className="text-white  mb-0">
              <h1 className="text-2xl md:text-6xl">
                We operate with your best interest at heart .
              </h1>
            </div>
            <div className="text-gray-400 text-sm font-normal">
              <p>
                Bitblloom is an investment solution for all investors from
                around the world. Our financial advisors and representatives are
                known for their efficiency and remarkable attributes
              </p>
            </div>
          </div>
          <div className="ml-16 w-4/5 grid gap-5 text-white capitalize ">
            <div className="">
              <div className="flex justify-between">
                <h1>Focus</h1> <h1>98%</h1>
              </div>

              <Progress className="" value={98} />
            </div>
            <div className="">
              <div className="flex justify-between">
                <h1>Record Keeping</h1> <h1>99%</h1>
              </div>

              <Progress className="" value={99} />
            </div>
            <div className="">
              <div className="flex justify-between">
                <h1>Discipline and mental toughness</h1> <h1>97%</h1>
              </div>
              <Progress className="" value={97} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SectionTwo;
