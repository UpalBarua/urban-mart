import GoogleSignUp from '@/components/google-auth-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/firebase/firebase.config';
import { createUserProfile } from '@/lib/create-user-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';
import { z } from 'zod';

const RegisterPage = () => {
  const [registerError, setRegisterError] = useState('');
  const router = useRouter();

  const signUpFormSchema = z
    .object({
      name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(20, { message: 'Name must not exceed 20 characters' })
        .regex(/^[A-Za-z\s]+$/, {
          message: 'Name should only contain alphabetic characters and spaces',
        }),
      email: z.string().email({ message: 'Please enter a valid email' }),
      password: z
        .string()
        .min(8, { message: 'Password mut be at least 8 characters long' }),
      password2: z.string(),
    })
    .refine(({ password, password2 }) => password === password2, {
      message: "Passwords don't match",
      path: ['password2'],
    });

  type SignUpFormType = z.infer<typeof signUpFormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormType>({ resolver: zodResolver(signUpFormSchema) });

  const { mutate: handleSignUp, isPending: isSigningUp } = useMutation({
    mutationFn: async ({ name, email, password }: SignUpFormType) => {
      await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile({
        email,
        userName: name,
        photoURL: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${name
          .replace(' ', '-')
          .toLowerCase()}`,
      });
    },
    onSuccess: () => {
      toast.success('Successfully created new account');
      reset();
      setRegisterError('');
      router.push('/');
    },
    onError: (error) => {
      console.error(error);

      if (error instanceof Error) {
        setRegisterError(error.message);
      }
    },
  });

  return (
    <section className="mx-auto my-2 max-w-sm sm:my-6">
      <h2 className="text-2xl font-medium text-center capitalize lg:text-3xl tracking-tight pb-4 sm:pb-6">
        Welcome To <span className="text-accent-500">Urban Mart</span>
      </h2>
      <form
        className="p-1 space-y-4"
        onSubmit={handleSubmit((data) => handleSignUp(data))}>
        <fieldset className="space-y-2">
          <label className="capitalize ps-0.5" htmlFor="name">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register('name')}
          />
          {errors.name?.message && (
            <p className="text-sm font-medium text-red-500/80">
              {errors.name?.message.toString()}
            </p>
          )}
        </fieldset>
        <fieldset className="space-y-2">
          <label className="capitalize ps-0.5" htmlFor="email">
            Email Address
          </label>
          <Input
            id="email"
            type="text"
            placeholder="johndoe@email.com"
            {...register('email')}
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
            {...register('password')}
          />
          {errors.password?.message && (
            <p className="text-sm font-medium text-red-500/80">
              {errors.password?.message.toString()}
            </p>
          )}
        </fieldset>
        <fieldset className="space-y-2">
          <label className="capitalize ps-0.5" htmlFor="password2">
            Repeat Password
          </label>
          <Input
            id="password2"
            type="password"
            placeholder="strong password"
            {...register('password2')}
          />
          {errors.password2?.message && (
            <p className="text-sm font-medium text-red-500/80">
              {errors.password2?.message.toString()}
            </p>
          )}
        </fieldset>
        {registerError ? (
          <p className="p-3.5 text-sm font-medium text-red-500 bg-red-500/10 rounded-lg border border-red-500 shadow-sm">
            {registerError}
          </p>
        ) : null}
        <div className="grid gap-3 py-3">
          <Button type="submit" size="lg" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Please Wait</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </Button>
          <GoogleSignUp setError={setRegisterError} />
        </div>
      </form>
      <p className="mt-6 font-medium text-center text-primary-600 dark:text-primary-300">
        Already have an account?{' '}
        <Link className="text-accent-500" href="/login">
          Login
        </Link>
      </p>
    </section>
  );
};

export default RegisterPage;
