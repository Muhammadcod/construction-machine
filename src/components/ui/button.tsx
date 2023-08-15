import { cn } from '../../utils';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, ...props }: Props) => {
  return <button className={cn('w-full px-4 py-2 text-white bg-gray-600', className)} {...props} />;
};

export default Button;
