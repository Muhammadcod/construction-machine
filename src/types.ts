export interface MachineType {
  id: string;
  type: string;
  title: string;
  baseFields: Array<{ name: string; value: string; type?: string }>;
  otherFields: Array<{ name: string; attributeID: string; type: string }>;
}

export interface Machine {
  id: string;
  title: string;
  type: string;
  form?: { [key: string]: any };
}

export interface AttributeProp {
  label: string;
  value: string;
}

export interface MachineOption {
  label: string;
  value: string;
}
