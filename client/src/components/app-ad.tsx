import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { BsApple, BsGooglePlay } from 'react-icons/bs';

const AppAd = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 mx-auto items-center justify-center gap-4 px-2 pb-10 lg:px-10 md:pb-16 sm:gap-10">
      <div className="relative w-full h-[min(30rem,70dvw)]">
        <Image src="/images/app-ad.svg" alt="app ad image" fill />
      </div>
      <div className="space-y-5 text-center sm:text-start">
        <h1 className="font-extrabold tracking-tight text-primary-950 dark:text-primary-50 text-[clamp(1.875rem,1rem+4vw,10rem)] leading-[1.25] lg:leading-[1.125]">
          Discover the Convenience of Our App!
        </h1>
        <p className="pb-3 text-primary-600 dark:text-primary-300 text-lg">
          Download our application today from the Play Store or the App Store to
          enjoy an expedited grocery shopping experience.
        </p>
        <div className="flex flex-col gap-2.5 justify-center items-center sm:justify-start sm:items-start lg:sm:flex-row">
          <Button
            asChild
            size="lg"
            className="w-52 sm:w-auto text-lg"
            variant="outline">
            <Link
              href="https://play.google.com/store/apps?hl=en&gl=US&pli=1"
              target="_blank">
              <BsGooglePlay className="text-lg text-primary-950/70 dark:text-primary-50/80" />
              <span>Google Play</span>
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="w-52 sm:w-auto text-lg"
            variant="outline">
            <Link href="https://www.apple.com/app-store/" target="_blank">
              <BsApple className="text-lg text-primary-950/70 dark:text-primary-50/80" />
              <span>App Store</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AppAd;
