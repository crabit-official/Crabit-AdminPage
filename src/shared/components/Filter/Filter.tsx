import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

interface IFilter {
  active: boolean;
}

export default function Filter({
  className,
  children,
  active,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & IFilter) {
  // padding click 영역
  return (
    <button
      className={cn(
        'text-20 border-b-3 px-3 flex',
        {
          'border-b-main text-blue-500 font-semibold': active,
          'border-b-transparent text-gray500 font-medium': !active,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
