import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { MachineType, OptionProp } from '../../types';
import { RootState } from '../../app/store';

export interface MachineTypeState {
  status: 'idle' | 'loading' | 'failed';
  machines: Array<MachineType>;
}

const field = { object_type: '', object_title: '' };
const initialState: MachineTypeState = {
  status: 'idle',
  machines: [],
};

export const machineTypesSlice = createSlice({
  name: 'machineTypes',
  initialState,
  reducers: {
    addMachineType: (state) => {
      state.machines = state.machines.concat({
        id: nanoid(),
        type: '',
        title: '',
        baseFields: field,
        otherFields: [{ fieldName: '', fieldType: 'Small text', field: 'Small text' }],
      });
    },

    removeMachineType: (state, action: PayloadAction<string>) => {
      const newId = action.payload;
      state.machines = state.machines.filter((item) => item?.id !== newId);
    },

    editInputField: (state, action: PayloadAction<{ id: string; name: string; inputIdx?: number }>) => {
      const { id, name, inputIdx } = action.payload;

      const machine = state.machines.find((machine) => machine.id === id);

      if (machine) {
        const fieldToUpdate = machine.otherFields[inputIdx as number];
        if (fieldToUpdate) {
          fieldToUpdate.fieldName = name;
        }
      }
    },

    editBaseField: (state, action: PayloadAction<{ id: string; attr: string; name: string }>) => {
      const { id, name, attr } = action.payload;

      state.machines = state.machines.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            baseFields: { ...item.baseFields, [attr]: name },
          };
        }
        return item;
      });
    },
    addInputField: (state, action: PayloadAction<OptionProp>) => {
      const { id, type, field } = action.payload;
      state.machines = state.machines.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            otherFields: [...item.otherFields].concat({ fieldName: '', fieldType: type, field }),
          };
        }
        return item;
      });
    },
  },
});

const { actions, reducer } = machineTypesSlice;

export const { addMachineType, editInputField, editBaseField, addInputField, removeMachineType } = actions;

export const selectMachineType = (state: RootState) => state.machineTypes?.machines;

export default reducer;
