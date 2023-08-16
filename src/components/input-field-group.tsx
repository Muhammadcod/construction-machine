import InputField from './ui/input-field';
import { AttributeProp, MachineType } from '../types';
import SelectFieldType from './select-field-type';
import {
  addInputField,
  editBaseField,
  editInputField,
  editInputType,
  removeField,
  removeMachineType,
} from '../features/template/templateSlice';
import { useAppDispatch } from '../app/hooks';
import { firstLetterCap } from '../utils';
import { removeAllMachineType } from '../features/inventory/inventorySlice';
import SelectInput from './ui/select-input';

interface InputGroupProps {
  fieldGroup: MachineType;
}

const options: AttributeProp[] = [
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Date', value: 'date' },
];

const InputFieldGroup = ({ fieldGroup }: InputGroupProps) => {
  const dispatch = useAppDispatch();
  const { otherFields, baseFields, id } = fieldGroup;
  const titleOptions: string[] = otherFields.map((item) => item?.fieldName);
  const handleSelectOption = (data: AttributeProp) => {
    dispatch(
      addInputField({
        machineID: id,
        ...data,
      }),
    );
  };

  const handleRemoveField = (fieldId: string) => {
    dispatch(
      removeField({
        machineID: id,
        id: fieldId,
      }),
    );
  };

  const handleUpdateType = (attributeID: string, data: AttributeProp) => {
    dispatch(
      editInputType({
        machineID: id,
        attributeID,
        type: data?.label,
      }),
    );
  };

  const handleChangeField = (attributeID: string, value: string) => {
    dispatch(
      editInputField({
        machineID: id,
        attributeID,
        name: firstLetterCap(value),
      }),
    );
  };

  const deleteTemplate = (machineId: string) => {
    dispatch(removeMachineType(machineId));
    dispatch(removeAllMachineType(machineId));
  };

  return (
    <div className="pb-10">
      <div className="px-4 py-3 mb-3 text-xl font-semibold bg-gray-200 flex justify-between">
        <h2>{firstLetterCap(baseFields[0]?.value ?? '')}</h2>
        <span className="cursor-pointer" onClick={() => deleteTemplate(id)}>
          X
        </span>
      </div>

      <form className="px-6">
        <div>
          <h3 className="mb-3 font-normal">{firstLetterCap(baseFields[0]?.name) ?? ''}</h3>
          <InputField
            onChange={(e) =>
              dispatch(
                editBaseField({
                  id,
                  attr: baseFields[0]?.name,
                  name: firstLetterCap(e.target.value),
                }),
              )
            }
            value={baseFields[0]?.value}
          />
        </div>
        <div>
          <h3 className="mb-3 font-normal">{firstLetterCap(baseFields[1]?.name) ?? ''}</h3>
          <SelectInput
            onChange={(e) =>
              dispatch(
                editBaseField({
                  id,
                  attr: baseFields[1]?.name,
                  name: firstLetterCap(e.target.value),
                }),
              )
            }
            selected={baseFields[1]?.value}
            options={titleOptions}
          />
        </div>
        <div>
          <h3 className="mb-3">Fields</h3>
          <div>
            {otherFields.map((input, idx) => (
              <InputField
                key={idx}
                btnClass="w-full xtext-xs 2xl:text-base h-full rounded-br rounded-tr"
                options={options}
                title={input?.field}
                value={input?.fieldName}
                rightComponent={SelectFieldType}
                deleteField={() => handleRemoveField(input?.attributeID)}
                selectOption={(data) => handleUpdateType(input?.attributeID, data)}
                onChange={(e) => handleChangeField(input?.attributeID, e.target.value)}
              />
            ))}
          </div>

          <div>
            <SelectFieldType options={options} btnClass="w-full" selectOption={handleSelectOption} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputFieldGroup;
