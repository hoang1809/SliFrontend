import React, { useState } from 'react';
import { Button, Form, Modal, Slider, Checkbox, Row } from 'antd';

export default function FilterModal() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <button onClick={showModal}>
                <img src='/assets/icons/filter.svg' height='24px' width='24px'></img>
            </button>
            <Modal
                className='bg-[#F5F5F5]'
                open={open}
                title="Bộ lọc"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >

                <Form >
                    <div>
                        <Form.Item className='p-[20px] bg-white rounded-2xl'>
                            <div>
                                Sắp xếp theo
                            </div>
                            <Checkbox.Group>
                                <Row>
                                    <Checkbox value="B" style={{ lineHeight: '24px' }}>
                                        Mới nhất
                                    </Checkbox>
                                </Row>
                                <Row>
                                    <Checkbox value="B" style={{ lineHeight: '24px' }}>
                                        B
                                    </Checkbox>
                                </Row>
                                <Row>
                                    <Checkbox value="B" style={{ lineHeight: '24px' }}>
                                        B
                                    </Checkbox>
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item>
                            <div>
                                Mức giá
                            </div>
                            <Slider range defaultValue={[50,70]}/>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item>
                            <div>
                                Diện tích
                            </div>
                            <Slider range defaultValue={[50,70]}/>
                        </Form.Item>
                    </div>
                </Form>


            </Modal>
        </>
    )
}
