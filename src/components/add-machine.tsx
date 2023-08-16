import Button from './ui/button';
import { useState } from 'react';
import { MachineOption, MachineType } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { firstLetterCap } from '../utils';
import { selectMachineType } from '../features/template/templateSlice';
import { addMachine } from '../features/inventory/inventorySlice';

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
    const machine = machinesTypes.find((machine) => machine?.title?.toLowerCase() === type) ?? ({} as MachineType);
    const { title, id, baseFields, otherFields } = machine;
    const savedFields = otherFields.map(({ fieldName, fieldType }) => ({
      name: fieldName,
      type: fieldType,
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

  return (
    <div className="app">
      <div className="dropdown relative">
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            toggleDropdown();
          }}
        >
          Add Item
        </Button>

        {isOpen && (
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
