import React from 'react';
import { Button, ButtonProps } from 'antd';
interface IButton extends ButtonProps {
  fullwidth?: boolean | string;
  h?: '56px' | '40px' | '36px' | '';
  borderRadius?: '16px' | '';
  border?: 'green' | '';
  btntype?: 'primary' | 'secondary';
  w?: string;
}
const ButtonCustom = (props: IButton) => {
  const { children, fullwidth, className, h, borderRadius, w, loading = false, btntype = 'primary' } = props;
  const widthBtn = fullwidth ? 'w-full' : w;
  let classNameCustom = '';
  if (btntype === 'primary') {
    classNameCustom += 'bg-primary-color hover:bg-primary-blur-color text-white hover:text-white border-none';
  }
  if (btntype === 'secondary') {
    classNameCustom +=
      'bg-white-color hover:bg-white-color text-primary-color hover:text-primary-color border-primary-color hover:border-primary-color border-[1px] border-solid';
  }
  const heightBtn = h === '56px' ? 'h-[56px]' : h === '40px' ? 'h-[40px]' : h === '36px' ? 'h-[36px]' : 'h-[36px]';
  const borderRadiusBtn = borderRadius === '16px' ? 'rounded-[16px]' : 'rounded-[16px]';

  return (
    <Button
      {...props}
      loading={loading}
      className={`${classNameCustom} ${widthBtn} ${heightBtn} ${borderRadiusBtn} ${className}`}
    >
      <span className={`font-bold ${className} `}>{children}</span>
    </Button>
  );
};

export default ButtonCustom;
