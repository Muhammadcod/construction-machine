import Button from './ui/button';
import { useState } from 'react';
import { OptionProp } from '../types';

type Props = {
  options: Array<OptionProp>;
  selectOption: ({ ...props }: OptionProp) => void;
};

const SelectFieldType = ({ options, selectOption }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: OptionProp) => {
    selectOption(option);
    setIsOpen(false);
  };

  return (
    <div className="app">
      <div className="dropdown relative">
        <Button
          onClick={(e) => {
            e.preventDefault();
            toggleDropdown();
          }}
        >
          Add Field
        </Button>

        {isOpen && (
          <ul className="border absolute bg-white">
            {options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="dropdown-option cursor-pointer py-2 px-7"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectFieldType;
