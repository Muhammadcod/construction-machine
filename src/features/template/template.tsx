import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addMachineType, selectMachineType } from './templateSlice';
import TemplateForm from '../../components/template-form';
import Button from '../../components/ui/button';

const Template = () => {
  const machineTypes = useAppSelector(selectMachineType);
  const dispatch = useAppDispatch();
  return (
    <div className="px-8 pt-8">
      <div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
          {machineTypes.map((machineType) => {
            return (
              <div key={machineType?.id} className="border">
                <TemplateForm item={machineType} />
              </div>
            );
          })}
          <div>
            <Button className="w-full" onClick={() => dispatch(addMachineType())}>
              Add Type
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
