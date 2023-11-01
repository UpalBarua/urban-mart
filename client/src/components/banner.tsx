import Image from 'next/image';
import SearchBar from '@/components/search-bar';

const Banner = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 mx-auto items-center justify-center gap-4 px-2 pb-10 lg:px-10 md:pb-16 sm:pt-6">
      <div>
        <h1 className="font-extrabold tracking-tight text-primary-950 dark:text-primary-50 text-[clamp(1.875rem,1rem+4vw,10rem)] leading-[1.25] lg:leading-[1.125] text-center sm:text-start">
          Welcome to <strong className="text-accent-500">Urban Mart</strong>,{' '}
          Where Your Store Comes to Your{' '}
          <span className="underline">Doorstep</span>!
        </h1>
        <SearchBar />
      </div>
      <div className="relative w-full h-[min(30rem,70dvw)] -order-1 sm:order-1">
        <Image src="/images/banner.svg" alt="banner image" fill priority />
      </div>
    </section>
  );
};

export default Banner;
