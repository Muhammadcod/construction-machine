export interface MachineType {
  id: string;
  type: string;
  title: string;
  baseFields: { object_type: string; object_title: string };
  otherFields: Array<{ fieldName: string; fieldType: string | number | Date; field: string }>;
}

export interface OptionProp {
  id: string;
  label: string;
  type: string | number | Date;
  field: string;
}
