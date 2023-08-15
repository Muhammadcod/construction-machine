import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addMachineType, selectMachineType } from './machineTypesSlice';
import InputFieldGroup from '../../components/input-field-group';
import Button from '../../components/ui/button';

const MachineTypesComponent = () => {
  const machineTypes = useAppSelector(selectMachineType);
  const dispatch = useAppDispatch();
  return (
    <div className="px-8 pt-8">
      <div>
        <div className="grid grid-cols-4 gap-10">
          {machineTypes.map((field, index) => {
            return (
              <div key={index} className="border">
                <InputFieldGroup key={index} fieldGroup={field} index={index} />
              </div>
            );
          })}
          <div>
            <Button onClick={() => dispatch(addMachineType())}>Add Type</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineTypesComponent;
