import { Table } from 'antd';
import React from 'react';

interface ITable {
  columns: any[];
  data: any[];
  className?: string;
  loading?: boolean;
}

const TableCustom = (props: ITable) => {
  const { columns, data, className, loading, ...rest } = props;
  return (
    <Table
      {...rest}
      className="ant-custom-table"
      bordered
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={loading}
    />
  );
};

export default TableCustom;
