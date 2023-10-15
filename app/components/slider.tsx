'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify, Sliders } from 'lucide-react';
import Link from 'next/link';
import avater from '@/public/images/user_avatar.webp';
import { useAppDispatch } from '@/lib/store';
import { logOut } from '../controller/logout';
import { clearUser } from '../controller/user_slice';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface Props {
  userData: User | null | undefined;
}
export function Slider({ userData }: Props) {
  const dispatch = useAppDispatch();
  const logout = async () => {
    try {
      await logOut();
      dispatch(clearUser());
      toast.success('logout successful');
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
          <Link href="/dashboard" className="grid items-center justify-center">
            <Avatar className="hover:ring-2 ring-yellow-700 duration-150">
              <AvatarImage
                src={
                  userData?.profile_picture
                    ? userData?.profile_picture
                    : avater.src
                }
              />
            </Avatar>
          </Link>
          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <Link href="/">
              <h1>Home</h1>
            </Link>
          </div>

          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <Link href="/about">
              <h1>About us</h1>
            </Link>
          </div>
          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <Link href="/faq">
              <h1>FAQ</h1>
            </Link>
          </div>
          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <Link href="investment">
              <h1>Investment Plan</h1>
            </Link>
          </div>
        </div>

        <div
          className={
            userData
              ? 'text-xl font-roboto_mono  flex items-center justify-center '
              : 'hidden'
          }
        >
          <Button onClick={logout} variant="destructive">
            {' '}
            Log Out
          </Button>
        </div>
        <div
          className={
            userData
              ? 'hidden'
              : 'grid items-center justify-center gap-3 text-center'
          }
        >
          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <Link href="/auth/login">Login</Link>
          </div>
          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <Link href="/auth/signUp">Sign Up</Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
