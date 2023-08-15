import InputField from './ui/input-field';
import { MachineType, OptionProp } from '../types';
import React from 'react';

interface InputGroupProps {
  addField: ({ id, label, type, field }: OptionProp) => void;
  removeForm: (id: string) => void;
  editField: ({ id, name }: { id: string; name: string }) => void;
  fieldGroup: MachineType;
}

const MachineFieldGroup = ({ fieldGroup, addField, removeForm, editField }: InputGroupProps) => {
  const { otherFields, id } = fieldGroup;

  return (
    <div className="pb-10">
      <div className="px-4 py-3 mb-3 text-xl font-bold bg-gray-200 flex justify-between">
        <h2>Chainsaws</h2>
        <span className="cursor-pointer" onClick={() => removeForm(id)}>
          X
        </span>
      </div>

      <form className="px-6">
        <div>
          {otherFields.map((input, idx) => (
            <div>
              <h3 className="mb-3">Model</h3>
              <div>
                <InputField
                  key={idx}
                  title={input?.field}
                  // type={`${input?.fieldType}`}
                  onChange={(e) =>
                    editField({
                      id: '',
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default MachineFieldGroup;
