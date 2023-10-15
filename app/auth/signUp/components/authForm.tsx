'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Mail } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRef } from 'react';

import { signUpUser } from './signup_slice';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function UserAuthForm() {
  const router = useRouter();
  const password = useRef('');

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>();
  password.current = watch('password');

  const submit: SubmitHandler<RegisterInput> = async (data) => {
    try {
      // Dispatch the action using Redux Thunk and wait for it to complete
      await signUpUser(data);

      // Now that the dispatch is completed, check the result
      toast.success('Sign UP successful please login to access your dashboard');
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (error) {
      // Handle any errors that occur during dispatch
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
          <div className="grid gap-1">
            <Label className="" htmlFor="verify_password">
              Verify Password
            </Label>
            <Input
              id="verify_password"
              placeholder="12345"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register('verify_password', {
                required: 'You must specify a password',
                minLength: {
                  value: 8,
                  message: 'Password must be more than 8 character',
                },
                validate: (value) =>
                  value === password.current || 'The passwords do not match',
              })}
            />
            {errors.verify_password && (
              <p className="error">{errors.verify_password.message}</p>
            )}
          </div>
          <Button disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Mail className="mr-2 h-4 w-4" />
        )}{' '}
        Gmail
      </Button>
    </div>
  );
}
