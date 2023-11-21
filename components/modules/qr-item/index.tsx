/* eslint-disable @next/next/no-img-element */
import { Col, Row } from 'antd';
import InputCustom from 'components/common/input';
import React, { useState } from 'react';
import ModalLocationPicker from '../location-picker';

export interface InputProps {
  qrName: string;
  qrLocation: string;
  id: number;
}
interface QRItem {
  inputProps: InputProps;
  handleDelete: (QRItem: number | string) => void;
}

const QrItem = ({ inputProps, handleDelete }: QRItem) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLocation, setLocation] = useState<any>({ lat: '', lng: '' });
  console.log('isLocation', isLocation);

  return (
    <>
      <div>
        <Row gutter={[10, 10]}>
          <Col lg={10}>
            <div>
              <InputCustom h="37px" rounded="0" placeholder={inputProps.qrName} />
            </div>
          </Col>
          <Col lg={10}>
            <div>
              <InputCustom
                h="37px"
                rounded="0"
                placeholder={inputProps.qrLocation}
                value={isLocation.lat ? `${isLocation.lat ?? ''} - ${isLocation.lng ?? ''}` : ``}
                onClick={() => setOpen(true)}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="flex items-center h-full cursor-pointer " onClick={() => handleDelete(inputProps.id)}>
              <img src="/assets/icons/minus.svg" alt="minus" className="w-[15px] h-[15px]" />
            </div>
          </Col>
        </Row>
      </div>
      {isOpen && (
        <ModalLocationPicker
          location={location}
          setLocation={(val) => {
            setLocation(val);
            window.scrollTo({
              top: 5000,
              behavior: 'smooth',
            });
          }}
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          role="admin"
        />
      )}
    </>
  );
};

export default QrItem;
