import React from 'react';
import { DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';

interface Props {
  onChange?: (value: number) => void;
  value?: number;
  error?: boolean;
}

const DatePickerCustom = ({ onChange, value, error }: Props) => {
  const onDateChange = (momentTime: DatePickerProps['value'] | RangePickerProps['value']) => {
    if (momentTime) {
      onChange && onChange(momentTime?.valueOf() as number);
    }
  };

  return (
    <DatePicker
      value={value ? moment(value) : undefined}
      showTime
      onChange={onDateChange}
      suffixIcon={
        <div>
          <img src="/assets/icons/datetime.svg" alt="datetime" />
        </div>
      }
      className={`date-picker-custom h-[37px] ${error ? 'border-[red] border-[1px] border-solid' : ''}`}
    />
  );
};

export default DatePickerCustom;
