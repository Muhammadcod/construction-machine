import { ChangeEvent } from 'react';
import { cn } from '../../utils';

type SelectProps = {
  options: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
  className?: string;
};

function SelectInput({ options, selected, onChange, className }: SelectProps) {
  return (
    <div className="">
      <select
        className={cn(
          'flex h-10 mb-8 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        value={selected}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
