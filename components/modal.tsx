import React, { useState } from 'react';
import { Modal, Form, Radio, Slider, Space } from 'antd';
import { useRouter } from 'next/router';

const ModalFilter = () => {
    const [priceRange, setPriceRange] = useState([500000, 15000000]);
    const [areaRange, setAreaRange] = useState([10, 200]);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                onFinish(values)
                setOpen(false);
            })
            .catch(errorInfo => {
                console.error('Validation failed:', errorInfo);
            });
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const formatter = (value: any) => `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const handlePriceChange = (value: any) => {
        setPriceRange(value);
    };

    const handleAreaChange = (value: any) => {
        setAreaRange(value);
    };

    const onFinish = (values: any) => {
        const { sortBy } = values;
        const [minPrice, maxPrice] = priceRange;
        const [minArea, maxArea] = areaRange;
        router.push({
            pathname: '/filter',
            query: {
                sortBy,
                search_price_min: minPrice,
                search_price_max: maxPrice,
                search_area_min: minArea,
                search_area_max: maxArea,
            }
        });
    };

    return (
        <div className='h-[24px]'>
            <button onClick={showModal}>
                <img src='/assets/icons/filter.svg' height='24px' width='24px'></img>
            </button>
            <Modal
                okButtonProps={{ style: { backgroundColor: '#1677ff' } }}
                className='rounded-lg text-center'
                title='Bộ Lọc'
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Lọc'
                cancelText='Huỷ'
            >
                <div className='text-start'>
                    <Form form={form} className='w-full bg-white space-y-4' onFinish={onFinish} layout="vertical">
                        <div className='bg-white border p-4 border-blue-400 border-solid rounded-lg'>
                            <div className='font-semibold mb-4 text-base'>Sắp xếp theo</div>
                            <Form.Item
                                name="sortBy"
                            >
                                <Radio.Group>
                                    <Space direction='vertical'>
                                        <Radio value="newest">Mới nhất</Radio>
                                        <Radio value="LowToHigh">Giá thấp tới cao</Radio>
                                        <Radio value="HighToLow">Giá cao tới thấp</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div className='bg-white border p-4 border-blue-400 border-solid rounded-lg'>
                            <Form.Item>
                                <div className='font-semibold text-base'>Mức giá</div>
                                <div style={{ textAlign: 'end', marginTop: '1rem' }}>
                                    {formatter(priceRange[0])} - {formatter(priceRange[1])}
                                </div>
                                <Slider
                                    range
                                    min={500000}
                                    max={15000000}
                                    tooltip={{ formatter: null }}
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                />
                            </Form.Item>
                        </div>
                        <div className='bg-white border p-4 border-blue-400 border-solid rounded-lg'>
                            <Form.Item>
                                <div className='font-semibold text-base'>Diện tích</div>
                                <div style={{ textAlign: 'end', marginTop: '1rem' }}>
                                    {areaRange[0]}m2 - {areaRange[1]}m2
                                </div>
                                <Slider
                                    range
                                    min={10}
                                    max={200}
                                    tooltip={{ formatter: null }}
                                    value={areaRange}
                                    onChange={handleAreaChange}
                                />
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default ModalFilter;
