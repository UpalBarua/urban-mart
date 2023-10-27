import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BsGooglePlay, BsApple } from 'react-icons/bs';
import Heading from './ui/heading';

const AppAd = () => {
  return (
    <section className="grid grid-cols-1 gap-5 justify-items-center items-center sm:grid-cols-2 max-w-4xl mx-auto">
      <div className="relative h-60 sm:h-64 md:h-96 lg:h-[26rem] aspect-square">
        <Image src="/images/app-ad.svg" alt="image" fill></Image>
      </div>
      <div className="text-center sm:text-start space-y-2 lg:max-w-[25rem] lg:space-y-4">
        <Heading className="sm:text-start pb-0 lg:pb-0">
          Discover the Convenience of Our App
        </Heading>
        <p className="pb-3 text-primary-600 lg:text-base">
          Download our application today from the Play Store or the App Store to
          enjoy an expedited grocery shopping experience.
        </p>
        <div className="flex flex-col  gap-2.5 justify-center items-center sm:justify-start sm:items-start lg:sm:flex-row">
          <Button asChild size="lg" className="w-64">
            <Link
              href="https://play.google.com/store/apps?hl=en&gl=US&pli=1"
              target="_blank">
              <BsGooglePlay className="text-lg text-primary-950/70" />
              <span>Google Play</span>
            </Link>
          </Button>
          <Button asChild size="lg" className="w-64">
            <Link href="https://www.apple.com/app-store/" target="_blank">
              <BsApple className="text-lg text-primary-950/70" />
              <span>App Store</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AppAd;
