type HeadingProps = {
  children: React.ReactNode;
};

const Heading = ({ children }: HeadingProps) => {
  return (
    <h2 className="pb-6 text-center text-2xl font-extrabold tracking-tight uppercase text-primary-950 lg:text-3xl lg:pb-10 dark:text-primary-50">
      {children}
    </h2>
  );
};

export default Heading;
