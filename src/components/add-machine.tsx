import Button from './ui/button';
import { useState } from 'react';
import { MachineOption, MachineType } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { firstLetterCap } from '../utils';
import { selectMachineType } from '../features/template/templateSlice';
import { addMachine } from '../features/inventory/inventorySlice';
import Down from './images/down';

type Props = {
  options: Array<MachineOption>;
};

const AddMachine = ({ options }: Props) => {
  const dispatch = useAppDispatch();
  const machineTypes = useAppSelector(selectMachineType);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getMachineData = (machinesTypes: Array<MachineType>, type: string) => {
    const machine =
      machinesTypes.find((machine) => machine?.title?.toLowerCase() === type) ??
      ({} as MachineType);
    const { title, id, baseFields, otherFields } = machine;
    const savedFields = otherFields.map(({ name, type }) => ({
      name: name,
      type: type,
      value: '',
    }));
    savedFields.unshift({ name: baseFields[0]?.name, type: 'string', value: '' });
    return {
      title,
      type: id,
    };
  };

  const handleOptionClick = (option: MachineOption) => {
    const data = getMachineData(machineTypes, option?.value);
    dispatch(addMachine(data));
    setIsOpen(false);
  };

  const optionCount = options.length;
  return (
    <div className="app">
      <div className="dropdown relative">
        <Button
          className="w-full flex items-center justify-center flex-row"
          onClick={(e) => {
            e.preventDefault();
            if (optionCount > 1) {
              toggleDropdown();
              return;
            }
            handleOptionClick(options[0]);
          }}
        >
          {optionCount > 1 ? (
            <>
              Add Item <Down fill="white" className="" width={20} height={20} />
            </>
          ) : (
            'Add Item'
          )}
        </Button>

        {isOpen && options.length > 1 && (
          <ul className="border absolute bg-white">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="dropdown-option cursor-pointer py-2 px-7"
              >
                {firstLetterCap(option.label ?? '')}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddMachine;
