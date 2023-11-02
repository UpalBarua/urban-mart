import { Button } from '@/components/ui/button';
import { auth, googleAuth } from '@/firebase/firebase.config';
import { createUserProfile } from '@/lib/create-user-profile';
import { useMutation } from '@tanstack/react-query';
import { getAdditionalUserInfo, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

type GoogleAuthButtonProps = {
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const GoogleAuthButton = ({ setError }: GoogleAuthButtonProps) => {
  const router = useRouter();

  const { mutate: handleGoogleSignUp, isPending: isSigningUp } = useMutation({
    mutationFn: async () => {
      const res = await signInWithPopup(auth, googleAuth);
      const { isNewUser } = getAdditionalUserInfo(res)!;

      if (
        isNewUser &&
        res.user.displayName &&
        res.user.email &&
        res.user.photoURL
      ) {
        await createUserProfile({
          userName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        });
      }
    },
    onSuccess: () => {
      toast.success('Successfully logged in');
      router.push('/');
      setError('');
    },
    onError: (error) => {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      }
    },
  });

  return (
    <Button
      variant="outline"
      size="lg"
      type="button"
      disabled={isSigningUp}
      onClick={() => handleGoogleSignUp()}>
      {isSigningUp ? (
        <>
          <FaSpinner className="animate-spin" />
          <span>Please Wait</span>
        </>
      ) : (
        <>
          <FcGoogle className="text-xl" />
          <span>Continue With Google</span>
        </>
      )}
    </Button>
  );
};

export default GoogleAuthButton;
