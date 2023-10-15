import Image from 'next/image';
import React from 'react';
import logo from '@/assets/svgs/logo_art.svg';

function Logo() {
  return (
    <div className="flex">
      <Image height={30} width={70} src={logo} alt="logo" />
      <h1 className="text-3xl font-bold text-yellow-700"> BitBloom</h1>
    </div>
  );
}

export default Logo;
