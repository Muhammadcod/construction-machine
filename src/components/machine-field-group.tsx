import { Machine, MachineType } from '../types';
import { firstLetterCap } from '../utils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectMachineType } from '../features/template/templateSlice';
import InputField from './ui/input-field';
import { addToForm, removeMachine } from '../features/inventory/inventorySlice';

interface InputGroupProps {
  item: Machine;
  removeForm?: (id: string) => void;
}

const MachineFieldGroup = ({ item, removeForm }: InputGroupProps) => {
  const dispatch = useAppDispatch();
  const machineTypes = useAppSelector(selectMachineType);
  const { id, title, type, form } = item;
  const machineTemplate = machineTypes?.find((item) => item?.id === type) ?? ({} as MachineType);
  const fields = machineTemplate?.otherFields;
  const base = machineTemplate?.baseFields;
  const baseValue = base[0]?.name?.toLowerCase();

  const handleDelete = (id: string) => {
    dispatch(removeMachine(id));
  };

  const handleChange = (attr: string, value: unknown) => {
    dispatch(addToForm({ id, attr: attr?.toLowerCase(), value }));
  };

  return (
    <div className="pb-10">
      <div className="px-4 py-3 mb-3 text-xl font-bold bg-gray-200 flex justify-between">
        <h2>{firstLetterCap(title ?? '')}</h2>
        <span className="cursor-pointer" onClick={() => handleDelete(id)}>
          X
        </span>
      </div>

      <form className="px-6">
        <div>
          <div>
            <h3 className="mb-3 font-normal">{firstLetterCap(baseValue) ?? ''}</h3>
            <InputField
              onChange={(e) => handleChange(baseValue, e.target.value)}
              type="text"
              value={form?.[baseValue] || ''}
            />
          </div>
          {(fields || []).map((field, idx) => (
            <div>
              <h3 className="mb-3">{field?.fieldName}</h3>
              <div>
                <InputField
                  key={idx}
                  id={`${field?.fieldName?.toLowerCase()}-${id}`}
                  type={`${field?.fieldType}`}
                  value={form?.[field?.fieldName?.toLowerCase()] || ''}
                  onChange={(e) => handleChange(field?.fieldName, e.target.value)}
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
