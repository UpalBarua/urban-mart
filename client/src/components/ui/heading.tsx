import { cn } from '@/lib/utils';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};

const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h2
      className={cn(
        'pb-6 text-center text-2xl font-extrabold tracking-tight uppercase text-primary-950 lg:text-3xl lg:pb-10 dark:text-primary-50 leading-[1.125]',
        className
      )}>
      {children}
    </h2>
  );
};

export default Heading;
