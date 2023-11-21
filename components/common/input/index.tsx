/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent } from 'react';
import { Input, InputProps } from 'antd';
interface InputPropsCustom extends InputProps {
  h?: '32px' | '56px' | '48px';
  rounded?: '16px' | '10px' | '0';
  w?: string;
  error?: boolean;
}
const InputCustom = (props: InputPropsCustom) => {
  const { h, w, rounded, error, placeholder } = props;
  const heightInput = h === '32px' ? 'h-[32px]' : h === '48px' ? 'h-[48px]' : 'h-[56px]';
  const roundedInput = rounded === '0' ? '' : 'rounded-[16px]';
  const widthInput = w ? w : 'w-full';
  const borderInput =
    'border-[#315E38] border-[1px] border-solid hover:border-[#315E38] focus:border-[#315E38] focus:shadow-inherit text-[17px]';
  return (
    <Input
      {...props}
      placeholder={placeholder ?? 'Placeholder'}
      className={`${heightInput} ${roundedInput} ${widthInput} ${borderInput} ${
        error ? 'border-[red] border-[1px] border-solid' : ''
      }`}
    />
  );
};
interface InputSearchProps {
  onChange?: (val: string) => void;
  onSearchClick?: () => void;
}
const { Search } = Input;
const InputSearchCustom = ({ onChange, onSearchClick }: InputSearchProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
  };

  return (
    <Search
      onChange={handleInputChange}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          onSearchClick && onSearchClick();
        }
      }}
      placeholder="input search text"
      style={{ width: 200 }}
      enterButton={
        <div onClick={onSearchClick} className="w-[20px] h-[20px]">
          <img src="/assets/icons/search.svg" alt="search" className="w-full h-full" />
        </div>
      }
    />
  );
};

export { InputSearchCustom };
export default InputCustom;
