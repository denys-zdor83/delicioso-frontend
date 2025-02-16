import { cn } from '@/shared/lib/utils';

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <img className={cn('w-[40px] h-[40px] md:w-[60px] md:h-[60px]', className)} src={src} />;
};
