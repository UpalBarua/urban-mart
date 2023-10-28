const Banner = () => {
  return (
    <section className="py-5 sm:py-8 md:py-10 lg:py-12 lg:pb-3">
      <div className="pb-5 mx-auto space-y-4 text-center sm:pb-8 lg:pb-10 sm:space-y-3 lg:space-y-5 max-w-3xl">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl text-primary-950 lg:text-6xl lg:leading-[1.125] dark:text-primary-50">
          Welcome to <strong className="text-accent-500">Urban Mart</strong>,{' '}
          Where Your Store Comes to Your{' '}
          <span className="underline">Doorstep</span>!
        </h1>
      </div>
    </section>
  );
};

export default Banner;
