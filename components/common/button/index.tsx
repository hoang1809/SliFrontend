import React from 'react';
import { Button, ButtonProps } from 'antd';
interface IButton extends ButtonProps {
  fullwidth?: boolean | string;
  h?: '56px' | '40px' | '36px' | '';
  borderRadius?: '16px' | '';
  btntype?: 'primary' | 'secondary';
  w?: string;
}
const ButtonCustom = (props: IButton) => {
  const { children, fullwidth, className, h, borderRadius, w, loading = false, btntype = 'primary' } = props;
  const widthBtn = fullwidth ? 'w-full' : 'w-full';
  let classNameCustom = '';
  if (btntype === 'primary') {
    classNameCustom += 'bg-[#273895]';
  }
  if (btntype === 'secondary') {
    classNameCustom +=
      'bg-orange-500 text-white-color border-none';
  }
  const heightBtn = h === '56px' ? 'h-[56px]' : h === '40px' ? 'h-[40px]' : h === '36px' ? 'h-[36px]' : 'h-[72px]';
  const borderRadiusBtn = borderRadius === '16px' ? 'rounded-[16px]' : 'rounded-[16px]';

  return (
    <Button
      {...props}
      loading={loading}
      className={`${classNameCustom} flex justify-center items-center border-none hover:bg-[#273895] focus:bg-[#273895] ${widthBtn} ${heightBtn} ${borderRadiusBtn} ${className}`}
    >
      <span className={`font-bold ${className} `}>{children}</span>
    </Button>
  );
};

export default ButtonCustom;
