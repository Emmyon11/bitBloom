import Image from 'next/image';
import { Navbar } from './components/navbar';
import { Button } from '@/components/ui/button';
import { Bitcoin, Info } from 'lucide-react';
import btcImage from '@/public/images/bitcoin2.avif';
import elonImage from '@/public/images/elon.jpeg';
import SectionTwo from './components/section_two';
import InvestmentPlans from './components/investment_plan';

export default function Home() {
  return (
    <main>
      <div className="grid gap-10 md:grid-cols-2 p-8 md:pr-0">
        {/* write up section */}
        <div className="grid items-center justify-center gap-10">
          <Button variant="secondary" className="text-green-500 ">
            Talk about your future growth
          </Button>
          <div className=" text-ellipsis text-3xl font-inconsolata md:text-6xl w-3/4">
            <h1>Invest in cryptocurrency and</h1>
            <h1>
              {' '}
              <Bitcoin
                size={80}
                className="md:inline-block hidden  text-yellow-600"
              />
              <Bitcoin
                size={35}
                className="inline-block md:hidden  text-yellow-600"
              />
              itcoin the smart way
            </h1>
          </div>
          <div className="text-gray-500 text-sm md:text-lg font-nunito">
            <h2>
              Investing in cryptocurrency can offer significant growth potential
              in today's digital age. With decentralized technology, global
              accessibility, and a history of impressive gains, cryptocurrencies
              provide a unique opportunity for you to diversify your portfolios
              and participate in the future of finance.
            </h2>
          </div>
        </div>
        {/* Image section */}
        <div className="grid items-end justify-end relative">
          <div className="h-4/5 rounded-l-3xl -z-10 bg-gray-100 absolute left-10 right-0 top-1/3"></div>
          <div className="w-2/3 ml-20 h-full rounded-lg overflow-hidden">
            <Image
              alt="bitcoin image"
              src={btcImage}
              className="h-full object-cover"
            ></Image>
          </div>
          <div className="bg-white hidden  md:grid gap-5 rounded-lg w-3/5 items-center justify-center shadow-lg p-5 top-1/2  absolute">
            <div className="flex  items-center justify-between">
              <h1 className="font-medium text-gray-500">Savings</h1>
              <div className="rounded-full h-7 w-7 overflow-hidden ">
                <Image
                  src={elonImage}
                  className="object-fill w-full h-full"
                  alt="elon-musk"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-gray-300">Your Portfolio</div>
              <div className=" text-center">
                <h1 className="text-2xl">$2,420.64</h1>
                <h3>+4.56%</h3>
              </div>
            </div>
            <div className="">
              <hr />
            </div>
            <div className="flex items-center  justify-between text-gray-500">
              <div className="">Analysis price target</div>
              <div className="">
                <Info />
              </div>
            </div>
            <div className="grid gap-5 grid-cols-2 divide-x-2 divide-black items-center  bg-purple-200 p-8 rounded-md">
              <div className="grid items-center justify-center text-center">
                <h1 className="text-lg font-bold">$79,300</h1>
                <p>Average price target</p>
              </div>
              <div className="grid items-center justify-center text-center">
                <h1 className="text-lg font-bold">$79,300</h1>
                <p>Price in dollars</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionTwo />
      <InvestmentPlans />
    </main>
  );
}
