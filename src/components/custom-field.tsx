export {};
// import React, { ComponentProps } from 'react';
// import SelectInput from './ui/select-input';
// import InputField from './ui/input-field';
//
// export interface InputProps<T extends string> {
//   selected?: T;
//   type: 'Select' | 'FormInput';
//   options?: string[];
//   value: string;
// }
//
// const CustomField = ({ ...props }: InputProps) => {
//   const { type, options, ...rest } = props;
//   const components: Record<ComponentProps<string>['type'], React.FC<any>> = {
//     Select: SelectInput,
//     FormInput: InputField,
//   };
//   const Component = components[type as keyof typeof components];
//
//   return <Component {...rest} />;
// };
//
// export default CustomField;
