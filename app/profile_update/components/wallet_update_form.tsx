'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Copy, CopyCheckIcon, Loader2, X } from 'lucide-react';

import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { create_wallet } from '../utils/create_wallet';
import { toast } from 'sonner';

interface WalletSliderProps {
  admin_btc: string;
  investment_plan: Investment_plan;
  slider: { isOpen: boolean; isSubscribed: boolean };
  setSlider: Dispatch<
    SetStateAction<{ isOpen: boolean; isSubscribed: boolean }>
  >;
  children: string | JSX.Element | JSX.Element[] | ReactNode;
  useData: User | null | undefined;
  userId: string | undefined;
}

enum Status {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

const WalletUpdate = ({
  admin_btc,
  investment_plan,
  slider,
  setSlider,
  children,
  useData,
  userId,
}: WalletSliderProps) => {
  const [isCopy, setIsCopy] = useState(false);

  const MAX_FILE_SIZE = 400000;
  const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];

  const fileSchema = z.object({
    image: z
      .any()
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.'
      ),
    amount: z
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .min(100, { message: 'Must be 100USD or greater' }),
  });
  const form = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      image: '',
    },
    mode: 'onChange',
  });

  async function submitWallet(data: z.infer<typeof fileSchema>) {
    const image = data.image[0] as File;
    if (!useData || !userId) return;
    const newWallet: Wallet = {
      user_email: useData.email,
      current_balance: data.amount,
      investment_plan: investment_plan,
      investment_date: Date.now().toString(),
      initial_investment: data.amount,
      btc_address: useData.bitcoin_address,
      status: Status.pending,
    };

    try {
      await create_wallet(userId, newWallet, image, investment_plan);
      toast.success('Wallet updated successfully. pending approval');
      setSlider((slider) => ({
        ...slider,
        isOpen: false,
      }));
    } catch (error) {
      toast.error('something went wrong' + error);
    }
  }
  return (
    <div>
      <Popover open={slider.isOpen}>
        <PopoverTrigger asChild>
          <div>{children}</div>
        </PopoverTrigger>
        <PopoverContent className="w-80 grid gap-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitWallet)}>
              <div className=" grid gap-5">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold">Current investment plan: </h1>
                  <h1 className="text-gray-500">{investment_plan}</h1>
                </div>
                <div className="">
                  <Label className="text-gray-500">
                    Pay to this btc address
                  </Label>
                  <div className="flex justify-between items-center bg-primary-foreground p-2 rounded-md">
                    <h1>{admin_btc}</h1>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(admin_btc);
                        setIsCopy(true);
                      }}
                      size="icon"
                      variant="ghost"
                      className="text-gray-500"
                    >
                      {isCopy ? <CopyCheckIcon /> : <Copy />}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount in USD</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="100"
                          type="number"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value && parseInt(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This is the amount you paid to that address. It should
                        be within the range of the plan you choose.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {' '}
                        Upload a screenshot of the transaction
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) =>
                            field.onChange(e.target.files && e.target.files)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This is the picture that'll be used to trace and verify
                        your payment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                onClick={form.handleSubmit(submitWallet)}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  'Update wallet'
                )}
              </Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default WalletUpdate;
