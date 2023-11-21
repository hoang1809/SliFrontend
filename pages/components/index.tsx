import ButtonCustom from 'components/common/button';
import InputCustom, { InputSearchCustom } from 'components/common/input';
import SelectCustom from 'components/common/select';
import React from 'react';

const ComponentsCustom = () => {
  return (
    <div>
      <div className="text-2xl mb-2">Button:</div>
      <div className="flex gap-2 ml-2">
        <ButtonCustom btntype='primary' h='56px' className='text-lg'>
          Button primary
        </ButtonCustom>

        <ButtonCustom btntype='secondary'>Button secondary</ButtonCustom>
      </div>
      <div className="text-2xl mb-2 mt-5">Input:</div>
      <div className="ml-2">
        <InputCustom />
        <div className="my-2">
          <InputSearchCustom />
        </div>
      </div>
      <div className="text-2xl mb-2 mt-5">Select:</div>
      <div></div>
    </div>
  );
};

export default ComponentsCustom;
