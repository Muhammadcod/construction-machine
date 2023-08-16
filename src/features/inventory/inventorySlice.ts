import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Machine } from '../../types';

export interface InventoryState {
  machines: Array<Machine>;
}

const initialState: InventoryState = {
  machines: [],
};

export const inventorySlice = createSlice({
  name: 'machines',
  initialState,
  reducers: {
    addMachine: (state, action: PayloadAction<Omit<Machine, 'id'>>) => {
      state.machines = state.machines.concat({
        id: nanoid(),
        form: {},
        ...action.payload,
      });
    },
    addToForm: (state, action: PayloadAction<{ id: string; attr: string; value: any }>) => {
      const { id, attr, value } = action.payload;
      state.machines = state.machines.map((machine) => {
        if (machine?.id === id) {
          return {
            ...machine,
            form: {
              ...machine?.form,
              [attr]: value,
            },
          };
        }
        return machine;
      });
    },
    removeMachine: (state, action) => {
      const idToRemove = action.payload;
      state.machines = state.machines.filter((machine) => machine.id !== idToRemove);
    },
    removeAllMachineType: (state, action) => {
      const idToRemove = action.payload;
      state.machines = state.machines.filter((machine) => machine.type !== idToRemove);
    },
  },
});

const { actions, reducer } = inventorySlice;

export const { addMachine, addToForm, removeMachine, removeAllMachineType } = actions;

export const selectMachines = (state: RootState) => state.inventory.machines;

export default reducer;
