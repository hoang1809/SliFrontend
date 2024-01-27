import React, { useState } from 'react';
import { Modal, Form, Radio, Slider, Button, Tooltip } from 'antd';

const MyModal = () => {
  const [visible, setVisible] = useState(false);
  const [slider1Value, setSlider1Value] = useState([0, 100]);
  const [slider2Value, setSlider2Value] = useState([0, 100]);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values:any) => {
    console.log('Received values:', values);
    // Handle form submission here
    setVisible(false); // Close the modal after form submission
  };

  const formatValue = (value:any) => {
    return `${formatNumber(value[0])} - ${formatNumber(value[1])}`;
  };

  const formatNumber = (number:any) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(number * 50000);
  };

  const handleSlider1Change = (value:any) => {
    setSlider1Value(value);
  };

  const handleSlider2Change = (value:any) => {
    setSlider2Value(value);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="My Modal"
        visible={visible}
        onCancel={handleCancel}
        footer={null} // Hide the default footer
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item name="order" label="Sắp xếp theo" rules={[{ required: true, message: 'Please select an option' }]}>
            <Radio.Group>
              <Radio value="newest">Mới nhất</Radio>
              <Radio value="LowToHigh">Giá thấp tới cao</Radio>
              <Radio value="HighToLow">Giá cao tới thấp</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="slider1" label="Slider 1" rules={[{ required: true, message: 'Please select a value' }]}>
            <Slider tooltip={{ formatter: null }}  range value={slider1Value} onChange={handleSlider1Change} />
            <div style={{ textAlign: 'center' }}>
              <Tooltip title={formatValue(slider1Value)}>
                <span>{formatValue(slider1Value)}</span>
              </Tooltip>
            </div>
          </Form.Item>
          <Form.Item name="slider2" label="Slider 2" rules={[{ required: true, message: 'Please select a value' }]}>
            <Slider tooltip={{ formatter: null }}  range value={slider2Value} onChange={handleSlider2Change} />
            <div style={{ textAlign: 'center' }}>
              <Tooltip title={formatValue(slider2Value)}>
                <span>{formatValue(slider2Value)}</span>
              </Tooltip>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyModal;
