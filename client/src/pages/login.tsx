import GoogleSignUp from '@/components/google-auth-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/firebase/firebase.config';
import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';

const LoginPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState('');

  type LoginForm = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();

  const { mutate: handleLogin, isPending: isLoggingIn } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => await signInWithEmailAndPassword(auth, email, password),
    onSuccess: () => {
      toast.success('Successfully logged in');
      reset();
      setLoginError('');
      router.push('/');
    },
    onError: (error) => {
      console.error(error);

      if (error instanceof Error) {
        setLoginError(error.message);
      }
    },
  });

  return (
    <section className="mx-auto my-2 max-w-sm sm:my-6">
      <h2 className="text-2xl font-medium text-center capitalize lg:text-3xl tracking-tight pb-4 sm:pb-6">
        Welcome To <span className="text-accent-500">Urban Mart</span>
      </h2>
      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        className="p-1 space-y-4">
        <fieldset className="space-y-2">
          <label className="capitalize ps-0.5" htmlFor="email">
            Email Address
          </label>
          <Input
            id="email"
            type="text"
            placeholder="johndoe@email.com"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email?.message && (
            <p className="text-sm font-medium text-red-500/80">
              {errors.email?.message.toString()}
            </p>
          )}
        </fieldset>
        <fieldset className="space-y-2">
          <label className="capitalize ps-0.5" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="strong password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password?.message && (
            <p className="text-sm font-medium text-red-500/80">
              {errors.password?.message.toString()}
            </p>
          )}
        </fieldset>
        {loginError ? (
          <p className="p-3.5 text-sm font-medium text-red-500 bg-red-500/10 rounded-lg border border-red-500 shadow-sm">
            {loginError}
          </p>
        ) : null}
        <div className="grid gap-3 py-3">
          <Button type="submit" size="lg" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Please Wait</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </Button>
          <GoogleSignUp setError={setLoginError} />
        </div>
      </form>
      <p className="mt-6 font-medium text-center text-primary-600 dark:text-primary-300">
        Don't have an account?{' '}
        <Link className="text-accent-500" href="/register">
          Register
        </Link>
      </p>
    </section>
  );
};

export default LoginPage;
