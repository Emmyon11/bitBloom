import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify, Sliders } from 'lucide-react';
import Link from 'next/link';
import avater from '@/public/images/user_avatar.webp';

interface Props {
  userData: User | null | undefined;
}
export function Slider({ userData }: Props) {
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
            <h1>Home</h1>
          </div>

          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <h1>About us</h1>
          </div>
          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <h1>FAQ</h1>
          </div>
          <div className="text-xl font-roboto_mono font-bold cursor-pointer text-primary-foreground hover:text-yellow-700 duration-150">
            <h1>Investment Plan</h1>
          </div>
        </div>
        <div className="grid items-center justify-center gap-3 text-center">
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
