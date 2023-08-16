import MachineForm from '../../components/machine-form';
import { useAppSelector } from '../../app/hooks';
import { selectMachineType } from '../template/templateSlice';
import { selectMachines } from './inventorySlice';
import AddMachine from '../../components/add-machine';
import { useLocation } from 'react-router-dom';

const Inventory = () => {
  const location = useLocation();
  const machineTypes = useAppSelector(selectMachineType);
  const path = location?.pathname.split('/');
  const machineID = path[2];
  const machines = useAppSelector(selectMachines);

  const filteredMachines = machineID
    ? machines?.filter((type) => type?.type === machineID)
    : machines;
  const filteredOptions = machineID
    ? machineTypes?.filter((type) => type?.id === machineID)
    : machineTypes;
  const machineOptions = filteredOptions.map((type) => ({
    label: type?.title,
    value: type?.title?.toLowerCase(),
  }));

  return (
    <div className="px-8 pt-8">
      <div>
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
          {filteredMachines.map((machine, index) => (
            <div key={index} className="border">
              <MachineForm item={machine} />
            </div>
          ))}
          <div>
            <AddMachine options={machineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
