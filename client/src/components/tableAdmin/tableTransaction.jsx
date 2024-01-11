import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";

const TableTransaction = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        key: '1',
        user: 'Toto',
        quantity: '1000',
        deliveryDate: '23/05/2024',
        batch: '1',
      },
      {
        key: '2',
        user: 'Tata',
        quantity: '2000',
        deliveryDate: '23/04/2024',
        batch: '2',
      },
      {
        key: '3',
        user: 'Titi',
        quantity: '3000',
        deliveryDate: '23/03/2024',
        batch: '3',
      },
    ]);
  }, []);


  return (
    <div className="mt-5 mb-10 admin-table">
      <Table dataSource={data} rowKey={'id'}>
        <Column title="User" dataIndex="user" key="user"/>
        <Column title="Quantity" dataIndex="quantity" key="quantity"/>
        <Column title="Delivery Date" dataIndex="deliveryDate" key="deliveryDate"/>
        <Column title="Batch" dataIndex="batch" key="batch"/>
        <Column title="Action" key="action" className={"admin-action-title"} render={(_, record) => (
          <Space size="middle">
            <a href={"#"} className={"btn secondary admin-action"}>
              Modifier
            </a>
            <span className="admin-action delete" onClick={() => {
              console.log('Setup delete')
            }}>Supprimer</span>
          </Space>
        )} />
      </Table>
    </div>
  )
}

export default TableTransaction;
