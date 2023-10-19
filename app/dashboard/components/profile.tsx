'use client';

import React, { useEffect, useState } from 'react';
import avater from '@/public/images/user_avatar.webp';
import { useAppSelector } from '@/lib/store';
import testimonybg from '@/public/images/testimony.jpeg';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import {
  Baby,
  Bitcoin,
  LineChartIcon,
  Loader2,
  LucideEdit3,
  Mail,
  PenBoxIcon,
  Phone,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { update_profile_image } from '../utils/update_image';
import { useRouter } from 'next/navigation';
import { data } from '@/app/controller/testimonies';
import Swipper from './swipper';

const getAge = (dob: Date) => {
  const year = dob.getFullYear();
  const currentYear = new Date();
  return currentYear.getFullYear() - year;
};

const Profile = () => {
  const router = useRouter();
  const { user, userData, isLoading, error } = useAppSelector(
    (state) => state.user
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
  });
  const form = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      image: '',
    },
    mode: 'onChange',
  });
  async function upDateImg(data: z.infer<typeof fileSchema>) {
    const image = data.image[0] as File;
    if (!user) return;
    try {
      await update_profile_image(user.$id, image);
      toast.success('Image updated successfully');
    } catch (error) {
      toast.error('something went wrong' + error);
    }
  }

  useEffect(() => {
    console.log(testimonybg.src);
    const status = localStorage.getItem('isLogin');
    if (status !== 'true') {
      router.push('/');
    }
  }, []);

  return (
    <div className="grid min-h-screen  grid-rows-2 p-6 gap-8">
      <div className=" flex flex-col gap-5 items-center h-full justify-center bg-primary p-6 rounded-md shadow-md relative font-nunito">
        <div className="absolute top-3 left-3">
          <Link href="/profile_update">
            <PenBoxIcon className="text-green-300 cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Popover
            onOpenChange={(open) => {
              if (!open) {
                setSelectedFile(null);
              }
            }}
          >
            <PopoverTrigger asChild>
              <button className="">
                <Avatar className="w-20 h-20 bg-gray-900 group cursor-pointer">
                  <LucideEdit3 className="absolute text-green-500 top-3 right-2 w-4 h-4 hidden group-hover:grid" />
                  <AvatarImage
                    className="group-hover:opacity-30"
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : userData?.profile_picture
                        ? userData.profile_picture
                        : avater.src
                    }
                  />
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 grid gap-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(upDateImg)}
                  className="grid gap-5"
                >
                  <div className="">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel> change your profile image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  field.onChange(e.target.files);
                                  setSelectedFile(file);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button>
                    {form.formState.isSubmitting ? (
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    ) : (
                      'Update'
                    )}
                  </Button>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
          <h1 className="mt-3 text-primary-foreground">{userData?.name}</h1>
        </div>
        <div className="grid gap-3">
          <div className="flex gap-3 ">
            <Mail className="text-green-300" />
            <h1 className="text-gray-400"> {userData?.email}</h1>
          </div>
          <div className="flex gap-3">
            <LineChartIcon className="text-green-300" />
            <h1 className="text-gray-400"> {userData?.investment_plan}</h1>
          </div>
          <div className="flex gap-3">
            <Baby className="text-green-300" />
            <h1 className="text-gray-600">
              {' '}
              {userData?.dob
                ? `${getAge(new Date(userData?.dob!))} years old`
                : 'update your profile'}
            </h1>
          </div>
          <div className="flex gap-3">
            <Bitcoin className="text-yellow-600" />
            <h1 className="text-gray-600"> {userData?.bitcoin_address}</h1>
          </div>
        </div>
      </div>

      <div className="min-w-full gap-5 bg-[url('/_next/static/media/testimony.b1dc5e81.jpeg')] items-center  p-6 md:p-0 h-full justify-centerrounded-md shadow-md rounded-md relative font-nunito overflow-hidden">
        <div className="">
          <Swipper />
        </div>
      </div>
    </div>
  );
};

export default Profile;
