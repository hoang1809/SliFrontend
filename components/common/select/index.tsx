import { Select, SelectProps } from 'antd';
import React from 'react';

interface InputSelect {
  value: string;
  label: string;
}
export interface SelectArray {
  props?: SelectProps;
  valueSelect: InputSelect[];
  handleChange?: (value: any) => void;
  error?: boolean;
}

const SelectCustom = ({ props, valueSelect, handleChange, error }: SelectArray) => {
  return (
    <Select
      defaultValue={'test'}
      className={`select-custom ${error ? 'border-[red] border-[1px] border-solid' : ''}`}
      style={{ width: '100%' }}
      onChange={handleChange}
      options={valueSelect}
      {...props}
    />
  );
};

export default SelectCustom;
