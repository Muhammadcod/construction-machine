import Button from './ui/button';
import { useRef, useState } from 'react';
import { AttributeProp } from '../types';
import { cn } from '../utils';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

type Props = {
  options: Array<AttributeProp>;
  selectOption: ({ ...props }: AttributeProp) => void;
  deleteField?: () => void;
  title?: string;
  btnClass?: string;
  canRemove?: boolean;
};

const SelectFieldType = ({ options, selectOption, title, canRemove, btnClass, deleteField }: Props) => {
  const elementRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(elementRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: AttributeProp) => {
    selectOption(option);
    setIsOpen(false);
  };

  return (
    <div ref={elementRef} className="dropdown relative h-full">
      <Button
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown();
        }}
        className={cn('whitespace-nowrap', btnClass)}
      >
        {title ?? 'Add Field'}
      </Button>

      {isOpen && (
        <ul className="border absolute bg-white z-10">
          {options.map((option) => (
            <li
              key={option.label}
              onClick={() => handleOptionClick(option)}
              className="dropdown-option cursor-pointer py-2 px-7"
            >
              {option.label}
            </li>
          ))}
          {canRemove ? (
            <li onClick={deleteField} className="dropdown-option cursor-pointer py-2 px-7">
              Remove
            </li>
          ) : null}
        </ul>
      )}
    </div>
  );
};

export default SelectFieldType;
