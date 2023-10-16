import { Metadata } from 'next';
import Link from 'next/link';

import { UserAuthForm } from './components/authForm';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign Up page.',
};

export default function SignUp() {
  return (
    <main className="h-screen">
      <div className="container h-4/5 relative  flex-col items-center justify-center grid">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Already a user?{' '}
              <Link
                href="/auth/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Login
              </Link>{' '}
            </p>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>
              and
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
