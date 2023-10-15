import { LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { logOut } from '../controller/logout';
import { useAppDispatch } from '@/lib/store';
import { clearUser } from '../controller/user_slice';
import { Toaster, toast } from 'sonner';
interface Props {
  children: React.ReactNode;
}

export function LogoutHoverCard({ children }: Props) {
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
    <div className="">
      <Toaster richColors={true} />
      <HoverCard openDelay={100}>
        <HoverCardTrigger asChild>{children}</HoverCardTrigger>
        <HoverCardContent className="w-40 mx-2">
          <Button
            onClick={logout}
            size="sm"
            variant="destructive"
            className="gap-3"
          >
            <LogOutIcon size={20} />
            Log Out
          </Button>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
