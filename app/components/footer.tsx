import React from 'react';
import Logo from './logo';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 p-10 w-full shadow-md bg-primary">
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <div className=" grid gap-3 w-full items-center justify-center">
        <div className=" font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
          {' '}
          <Link href="/">Home</Link>
        </div>
        <div className="font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
          <Link href="/about">About us</Link>
        </div>
        <div className="font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
          <Link href="/faq">FAQ</Link>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
          <Link href="/faq">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
