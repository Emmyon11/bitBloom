'use client';

import * as React from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Mail } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { loginUser } from './login_slice';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getUser } from '@/app/controller/user_slice';

export function LoginUserAuthForm() {
  const router = useRouter();
  const password = useRef({});
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();
  password.current = watch('password', '');

  const submit: SubmitHandler<LoginInput> = async (data) => {
    try {
      await loginUser(data);

      toast.success('You are now logged in');
      router.refresh();
      dispatch(getUser());
      router.push('/dashboard');
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    }
  };

  return (
    <div className="grid gap-6">
      <Toaster position="top-right" richColors={true} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register('email', { required: 'You must provide a name' })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="12345"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register('password', {
                required: 'You must specify a password',
                minLength: {
                  value: 8,
                  message: 'Password must be more than 8 character',
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          <Button disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
