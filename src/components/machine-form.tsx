import { Machine, MachineType } from '../types';
import { firstLetterCap } from '../utils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectMachineType } from '../features/template/templateSlice';
import InputField from './ui/input-field';
import { addToForm, removeMachine } from '../features/inventory/inventorySlice';

interface InputGroupProps {
  item: Machine;
}

const MachineForm = ({ item }: InputGroupProps) => {
  const dispatch = useAppDispatch();
  const machineTypes = useAppSelector(selectMachineType);
  const { id, title, type, form } = item;
  const machineTemplate = machineTypes?.find((item) => item?.id === type) ?? ({} as MachineType);
  const fields = machineTemplate?.otherFields;
  const base = machineTemplate?.baseFields;
  const baseValue = base[1]?.value?.toLowerCase();
  let current;
  if (form) {
    current = form[baseValue];
  }

  const handleDelete = (id: string) => {
    dispatch(removeMachine(id));
  };

  const handleChange = (attr: string, value: unknown) => {
    dispatch(addToForm({ id, attr: attr?.toLowerCase(), value }));
  };

  return (
    <div className="pb-10">
      <div className="px-4 py-3 mb-3 text-xl font-bold bg-gray-200 flex justify-between">
        <h2>
          {firstLetterCap(title ?? '')} {current ? `- ${current}` : ''}
        </h2>
        <span className="cursor-pointer" onClick={() => handleDelete(id)}>
          X
        </span>
      </div>

      <form className="px-6">
        <div>
          {(fields || []).map((field, idx) => (
            <div>
              <h3 className="mb-3">{field?.name}</h3>
              <div>
                <InputField
                  key={idx}
                  id={`${field?.name?.toLowerCase()}-${id}`}
                  type={field?.type}
                  value={form?.[field?.name?.toLowerCase()] || ''}
                  onChange={(e) => handleChange(field?.name, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default MachineForm;
