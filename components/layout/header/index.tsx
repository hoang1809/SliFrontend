import React from 'react';
import ButtonCustom from 'components/common/button';

const Header = () => {
  return (
    <div className="w-full py-5 bg-white shadow-md">
      <div className="flex justify-between items-center px-56">
        <div className="flex gap-6">
          <ButtonCustom btntype="secondary" fullwidth="true" className="flex items-center text-lg font-bold px-11">
            Đăng nhập
          </ButtonCustom>
          <ButtonCustom fullwidth="true" className="flex items-center text-lg font-bold px-11">
            Đăng ký
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default Header;
