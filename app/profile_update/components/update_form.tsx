'use client';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { investment_plan, userSchema } from './validator';
import { useAppSelector } from '@/lib/store';
import { update_profile } from '../utils/update_profile';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import WalletUpdate from './wallet_update_form';
import { useEffect, useState } from 'react';

export type ProfileFormValues = z.infer<typeof userSchema>;

enum Investment_plan {
  none = 'none',
  basic = 'basic',
  standard = 'standard',
  premium = 'premium',
  gold = 'gold',
}

// This can come from your database or API.

export default function ProfileForm() {
  console.log('mee');
  const [currPlan, setCurrPlan] = useState<Investment_plan>(
    Investment_plan.none
  );
  const [slider, setSlider] = useState({
    isOpen: false,
    isSubscribed: false,
  });
  let userData: User | null | undefined;
  const router = useRouter();
  //get userdata from redux store
  const { user, userData: userInfo } = useAppSelector((state) => state.user);
  userData = userInfo;
  //check if window is mounted then get userdata from session storage
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem('userData');
    userData = JSON.parse(data!);
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      address: userData?.address ?? '',
      bitcoin_address: userData?.bitcoin_address ?? '',
      dob: new Date('2007-01-01'),
      email: userData?.email ?? '',
      investment_plan: userData?.investment_plan ?? investment_plan.enum.none,
      name: userData?.name ?? '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (!userData || userData == undefined) {
      router.push('/');
    }
  }, []);

  //submit function for the form
  async function submit(data: ProfileFormValues) {
    if (!user?.$id) return;
    try {
      await update_profile(user.$id, data);
      toast.success('Profile updated successfully');
      router.refresh();
      router.push('/dashboard');
    } catch (error) {
      toast.error('update unsuccessful: ' + error);
    }
  }

  return (
    <Card className="w-full">
      <Toaster position="top-right" richColors={true} />
      <CardHeader>
        <CardTitle className="text-center">Update your Profile</CardTitle>
        <CardDescription className="text-center">
          Update your details so we can get to know you better
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* for the name input */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Firstname Lastname" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. It can be your real name
                    or a pseudonym.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* for the email input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormDescription>This is your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* for the address input */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your personal address</FormLabel>
                  <FormControl>
                    <Input placeholder="...Streeet" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your personal address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* for the bitcoin_address input */}
            <FormField
              control={form.control}
              name="bitcoin_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your bitcoin address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="xbjdskuuu28732898hjhsugdika"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your personal bitcoin address and will be you for
                    your widrawal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* a calender select input for the dob */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*the wallet update component receives the  dropdown select for investment_plan so it can render its popover on it  */}
            <WalletUpdate
              admin_btc="hdjdjd"
              investment_plan={currPlan}
              slider={slider}
              setSlider={setSlider}
              useData={userData}
              userId={user?.$id}
            >
              <FormField
                control={form.control}
                name="investment_plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Plan</FormLabel>
                    <Select
                      // onValueChange={field.onChange}
                      onValueChange={(value: Investment_plan) => {
                        setCurrPlan(() => value);
                        if (
                          value !== investment_plan.enum.none ||
                          value !== userData?.investment_plan
                        ) {
                          setSlider((slider) => ({
                            ...slider,
                            isOpen: true,
                          }));
                        } else {
                          setSlider((slider) => ({
                            ...slider,
                            isOpen: false,
                          }));
                        }
                        if (slider.isSubscribed) {
                          form.setValue('investment_plan', value);
                        }
                      }}
                      defaultValue={
                        userData?.investment_plan ?? investment_plan.enum.none
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an invesment plan of your choice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={investment_plan.enum.none}>
                          None
                        </SelectItem>
                        <SelectItem value={investment_plan.enum.basic}>
                          Basic
                        </SelectItem>
                        <SelectItem value={investment_plan.enum.premium}>
                          Premium
                        </SelectItem>
                        <SelectItem value={investment_plan.enum.gold}>
                          Gold
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      <>Select a plan and we wont disappoint you</>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </WalletUpdate>

            <div className=" grid items-center justify-center">
              <Button
                onClick={form.handleSubmit(submit)}
                disabled={slider.isOpen}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  'Update profile'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
