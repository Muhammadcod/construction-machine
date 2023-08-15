import InputField from './ui/input-field';
import { MachineType, OptionProp } from '../types';
import SelectFieldType from './select-field-type';
import {
  addInputField,
  editBaseField,
  editInputField,
  removeMachineType,
} from '../features/manage-machine/machineTypesSlice';
import { useAppDispatch } from '../app/hooks';
import { firstLetterCap } from '../utils';

interface InputGroupProps {
  fieldGroup: MachineType;
  index: number;
}

const options: OptionProp[] = [
  { id: 'sss', label: 'Small text', field: 'Small text', type: 'string' },
  { id: 'ddd', label: 'Long text', field: 'Long text', type: 'string' },
  { id: 'ccc', label: 'Number', field: 'Number', type: 'number' },
  { id: 'rrr', label: 'Date', field: 'Date', type: 'Date' },
];

const heading = ({ title }: { title: string }) => (
  <h2 className="absolute right-0 top-0 text-white text-base w-1/3 flex justify-center items-center bg-gray-600 border h-full">
    {title}
  </h2>
);

const InputFieldGroup = ({ fieldGroup, index }: InputGroupProps) => {
  const dispatch = useAppDispatch();
  const { otherFields, baseFields, id } = fieldGroup;

  const handleSelectOption = (data: OptionProp) => {
    dispatch(
      addInputField({
        id,
        label: '',
        type: data?.type as string,
        field: data?.field as string,
      }),
    );
  };

  return (
    <div className="pb-10">
      <div className="px-4 py-3 mb-3 text-xl font-bold bg-gray-200 flex justify-between">
        <h2>{firstLetterCap(baseFields['object_type'] ?? '')}</h2>
        <span className="cursor-pointer" onClick={() => dispatch(removeMachineType(id))}>
          X
        </span>
      </div>

      <form className="px-6">
        {Object.entries(baseFields).map(([key], idx) => {
          const fieldName = key.split('_').join(' ');
          return (
            <div key={idx}>
              <h3 className="mb-3">{firstLetterCap(fieldName) ?? ''}</h3>

              <InputField
                onChange={(e) =>
                  dispatch(
                    editBaseField({
                      id,
                      attr: 'object_type',
                      name: e.target.value,
                    }),
                  )
                }
              />
            </div>
          );
        })}
        <div>
          <h3 className="mb-3">Fields</h3>
          <div>
            {otherFields.map((input, idx) => (
              <InputField
                key={idx}
                rightComponent={heading}
                title={input?.field}
                onChange={(e) => dispatch(editInputField({ id, inputIdx: idx, name: e.target.value }))}
              />
            ))}
          </div>

          <div>
            <SelectFieldType options={options} selectOption={handleSelectOption} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputFieldGroup;
