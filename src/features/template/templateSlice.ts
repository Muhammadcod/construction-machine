import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { AttributeProp, MachineType } from '../../types';
import { RootState } from '../../app/store';

export interface TemplateState {
  machines: Array<MachineType>;
}

interface InputProp extends AttributeProp {
  machineID: string;
}

const initialState: TemplateState = {
  machines: [],
};

export const templateSlice = createSlice({
  name: 'machineTypes',
  initialState,
  reducers: {
    addMachineType: (state) => {
      state.machines = state.machines.concat({
        id: nanoid(),
        type: '',
        title: '',
        baseFields: [
          { name: 'Object type', value: '', type: 'input' },
          { name: 'Object title', value: '', type: 'select' },
        ],
        otherFields: [{ fieldName: 'Title', attributeID: nanoid(), fieldType: 'text', field: 'Text' }],
      });
    },

    removeMachineType: (state, action: PayloadAction<string>) => {
      const newId = action.payload;
      state.machines = state.machines.filter((item) => item?.id !== newId);
    },

    editInputField: (
      state,
      action: PayloadAction<{
        machineID: string;
        attributeID: string;
        name: string;
      }>,
    ) => {
      const { machineID, name, attributeID } = action.payload;

      const machine = state.machines.find((machine) => machine.id === machineID);

      if (machine) {
        const fieldToUpdate = machine.otherFields.find((field) => field.attributeID === attributeID);
        if (fieldToUpdate) {
          fieldToUpdate.fieldName = name;
        }
      }
    },

    editInputType: (
      state,
      action: PayloadAction<{
        machineID: string;
        attributeID: string;
        type: string;
      }>,
    ) => {
      const { machineID, type, attributeID } = action.payload;

      const machine = state.machines.find((machine) => machine.id === machineID);

      if (machine) {
        const newField = machine.otherFields.find((field) => field.attributeID === attributeID);
        if (newField) {
          newField.field = type;
        }
      }
    },
    editBaseField: (state, action: PayloadAction<{ id: string; attr: string; name: string }>) => {
      const { id, name, attr } = action.payload;

      state.machines = state.machines.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: attr === 'Object type' ? name : item?.title,
            baseFields: [...item.baseFields].map((base) => {
              if (base?.name === attr) {
                return {
                  ...base,
                  value: name,
                };
              }
              return base;
            }),
          };
        }
        return item;
      });
    },
    addInputField: (state, action: PayloadAction<InputProp>) => {
      const { machineID, label, value } = action.payload;
      state.machines = state.machines.map((item) => {
        if (item.id === machineID) {
          return {
            ...item,
            otherFields: [...item.otherFields].concat({
              fieldName: '',
              attributeID: nanoid(),
              fieldType: value,
              field: label,
            }),
          };
        }
        return item;
      });
    },
    removeField: (state, action: PayloadAction<{ machineID: string; id: string }>) => {
      const { machineID, id } = action.payload;
      state.machines = state.machines.map((item) => {
        if (item.id === machineID) {
          return {
            ...item,
            otherFields: [...item.otherFields].filter((field) => field?.attributeID !== id),
          };
        }
        return item;
      });
    },
  },
});

const { actions, reducer } = templateSlice;

export const {
  addMachineType,
  editInputField,
  removeField,
  editInputType,
  editBaseField,
  addInputField,
  removeMachineType,
} = actions;

export const selectMachineType = (state: RootState) => state.template?.machines;

export default reducer;
