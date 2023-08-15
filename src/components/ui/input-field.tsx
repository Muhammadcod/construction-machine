import * as React from 'react';
import { cn } from '../../utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rightComponent?: React.ElementType;
}

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, rightComponent: Component, type, ...props }, ref) => {
    return (
      <div className="mb-6 relative">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {Component ? <Component title={props?.title} /> : null}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
