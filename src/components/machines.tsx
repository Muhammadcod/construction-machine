import Button from './ui/button';
import React, { useState } from 'react';
import { MachineType, OptionProp } from '../types';
import MachineFieldGroup from './machine-field-group';

const field = { object_type: '', object_title: '' };

const machineObject = {
  id: '',
  type: '',
  title: '',
  baseFields: field,
  otherFields: [{ fieldName: '', fieldType: 'Small text', field: 'Small text' }],
};

const Machines = () => {
  const [machineTypes, setMachineTypes] = useState<MachineType[]>([machineObject]);

  const addForm = () => {
    setMachineTypes((prevState) => [
      ...prevState,
      {
        ...machineObject,
      },
    ]);
  };

  const removeForm = (id: string) => {
    const machines = [...machineTypes];
    const filteredMachines = machines.filter((item) => item?.id !== id);

    setMachineTypes(filteredMachines);
  };

  const handleAddMoreField = ({ id, label, type, field }: OptionProp) => {
    const machines = [...machineTypes];

    const updatedMachine = machines.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          otherFields: [...item.otherFields].concat({ fieldName: label, fieldType: type, field }),
        };
      }
      return item;
    });
    setMachineTypes(updatedMachine);
  };

  const editField = ({ id, name }: { id: string; name: string }) => {
    const machines = [...machineTypes];

    const updatedMachine = machines.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          otherFields: [...item.otherFields].map((field, index) => {
            if (field?.fieldName === name) {
              return {
                ...field,
                fieldName: name,
              };
            }
            return field;
          }),
        };
      }
      return item;
    });
    setMachineTypes(updatedMachine);
  };
  return (
    <div className="px-8 pt-8">
      <div>
        <div className="grid grid-cols-4 gap-10">
          {machineTypes.map((field, index) => (
            <div key={index} className="border">
              <MachineFieldGroup
                key={index}
                fieldGroup={field}
                editField={editField}
                removeForm={removeForm}
                addField={handleAddMoreField}
              />
            </div>
          ))}
          <div>
            <Button onClick={addForm}>Add Type</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machines;
