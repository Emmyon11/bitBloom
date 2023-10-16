'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AlignJustify, Loader, Sliders } from 'lucide-react';
import Link from 'next/link';
import avater from '@/public/images/user_avatar.webp';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { logOut } from '../controller/logout';
import { clearUser } from '../controller/user_slice';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CryptoData } from '../controller/get_btc_price_slice';
import { USDollarFormat } from '@/utils/currency_formater';
import { useRouter } from 'next/navigation';

interface Props {
  userData: User | null | undefined;
  walletData: Wallet | null | undefined;
  crptoPrice: CryptoData;
}
export function Slider({ userData, crptoPrice, walletData }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);
  const logout = async () => {
    try {
      await logOut();
      dispatch(clearUser());
      toast.success('logout successful');
      router.push('/');
    } catch (error) {
      toast.error(`something went wrong: ${error}`);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="text-yellow-700 hover:text-secondary duration-150" />
      </SheetTrigger>

      <SheetContent className="grid items-center justify-center gap-10 bg-primary">
        <div className="grid gap-4 py-4 text-xl font-bold justify-around text-center">
          {isLoading ? (
            <Loader
              size={25}
              className="animate-spin text-secondary hidden md:grid"
            />
          ) : userData ? (
            <Link href="/dashboard">
              <SheetClose className="flex gap-5 items-center justify-center">
                <Avatar className="hover:ring-2 ring-yellow-700 duration-150 ">
                  <AvatarImage
                    src={
                      userData?.profile_picture
                        ? userData?.profile_picture
                        : avater.src
                    }
                  />
                  s
                </Avatar>
                <h1 className="text-green-400 text-center">
                  {walletData?.current_balance && crptoPrice.bitcoin.usd !== 0
                    ? `${(
                        walletData.current_balance / crptoPrice.bitcoin.usd
                      ).toFixed(6)} BTC/`
                    : ''}

                  {walletData?.current_balance
                    ? USDollarFormat.format(walletData?.current_balance)
                    : 'Invest'}
                </h1>
              </SheetClose>
            </Link>
          ) : (
            ''
          )}

          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <Link href="/">
              <SheetClose>
                <h1>Home</h1>
              </SheetClose>
            </Link>
          </div>
          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <Link href="/about">
              <SheetClose>
                <h1>About us</h1>
              </SheetClose>
            </Link>
          </div>
          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <Link href="/faq">
              <SheetClose>
                <h1>FAQ</h1>
              </SheetClose>
            </Link>
          </div>
          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <Link href="investment">
              <SheetClose>
                <h1>Investment Plan</h1>
              </SheetClose>
            </Link>
          </div>
        </div>
        {isLoading ? (
          <Loader
            size={25}
            className="animate-spin text-secondary hidden md:grid"
          />
        ) : userData ? (
          <div className="text-xl font-roboto_mono  flex items-center justify-center ">
            <SheetClose asChild>
              <Button onClick={logout} variant="destructive">
                {' '}
                Log Out
              </Button>
            </SheetClose>
          </div>
        ) : (
          <div className="grid items-center justify-center gap-3 text-center">
            <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
              <Link href="/auth/login">
                {' '}
                <SheetClose>Login</SheetClose>
              </Link>
            </div>
            <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
              <Link href="/auth/signUp">
                {' '}
                <SheetClose>Sign Up</SheetClose>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
