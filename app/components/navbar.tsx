'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from './logo';
import { Slider } from './slider';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { getUser } from '../controller/user_slice';
import { Loader } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import Image from 'next/image';
import avater from '@/public/images/user_avatar.webp';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { USDollarFormat } from '@/utils/currency_formater';
import { LogoutHoverCard } from './logout_hover';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, userData, isLoading, walletData, error } = useAppSelector(
    (state) => state.user
  );

  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    dispatch(getUser());
    router.refresh();
  }, []);
  return (
    <main className="h-20 w-screen bg-primary drop-shadow-md flex justify-between items-center p-8">
      <Toaster position="top-right" richColors={true} />
      <Logo />
      <div className="md:hidden">
        <Slider userData={userData} />
      </div>
      <div className="md:flex gap-10 hidden">
        <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-300">
          {' '}
          <Link href="/">Home</Link>
        </div>
        <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-300">
          <Link href="/about">About us</Link>
        </div>
        <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-300">
          <Link href="/faq">FAQ</Link>
        </div>

        <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-300">
          <Link href="/investment"> Investment Plan</Link>
        </div>
      </div>
      {isLoading ? (
        <Loader
          size={25}
          className="animate-spin text-secondary hidden md:grid"
        />
      ) : userData ? (
        <div className=" hidden md:flex  gap-2 items-center justify-center">
          <div className="text-primary-foreground">
            <h1>
              {walletData?.current_balance
                ? USDollarFormat.format(walletData?.current_balance)
                : 'Invest'}
            </h1>
          </div>
          <Link href="/dashboard">
            <LogoutHoverCard>
              <Avatar className="hover:ring-2 ring-yellow-700 duration-150">
                <AvatarImage
                  src={
                    userData?.profile_picture
                      ? userData?.profile_picture
                      : avater.src
                  }
                />
              </Avatar>
            </LogoutHoverCard>
            {/* <Image
              width={50}
              height={50}
              src={
                userData?.profile_picture ? userData?.profile_picture : avater
              }
              alt="user avater"
            /> */}
          </Link>
        </div>
      ) : (
        <div className="md:flex gap-5 hidden">
          <div className="text-xl font-roboto_mono text-yellow-700 font-bold cursor-pointer  hover:text-green-300 duration-300">
            <Link href="/auth/login">Login</Link>
          </div>
          <div className="text-xl font-roboto_mono font-bold text-yellow-700 cursor-pointer hover:text-green-300 duration-300">
            <Link href="/auth/signUp"> Sign Up</Link>
          </div>
        </div>
      )}
    </main>
  );
}
