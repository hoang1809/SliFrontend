/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent } from 'react';
import { Input, InputProps } from 'antd';
interface InputPropsCustom extends InputProps {
  h?: '32px' | '56px' | '48px';
  rounded?: '16px' | '10px' | '0';
  w?: string;
  error?: boolean;
}
export const InputCustom = (props: InputPropsCustom) => {
  const { w, error, placeholder } = props;
  const widthInput = w ? w : 'w-full';
  const borderInput =
    'border-b border-[1px] border-solid hover:border-none focus:border-none shadow-none hover:shadow-none focus:shadow-none text-[17px]';
  return (
    <Input
      {...props}
      placeholder={placeholder ?? 'Placeholder'}
      className={` ${widthInput} ${borderInput} h-[46px] ${error ? 'border-[red] border-[1px] border-solid' : ''
        }`}
    />
  );
};


export const InputPassword = (props: InputPropsCustom) => {
  const { w, error, placeholder } = props;
  const widthInput = w ? w : 'w-full';
  const borderInput =
    'border-b border-[1px] border-solid hover:border-none focus:border-none shadow-none hover:shadow-none focus:shadow-none text-[17px]';
  return (
    <Input.Password
      {...props}
      placeholder={placeholder ?? 'Placeholder'}
      className={` ${widthInput} ${borderInput} h-12 ${error ? 'border-[red] border-[1px] border-solid' : ''
        }`}
    />
  );
};

export interface InputSearchProps {
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


