import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";

const TableUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        key: '1',
        name: 'Covid-19',
        brand: 'Pfizer',
        stockAlert: '100',
        stockTotal: '500',
      },
      {
        key: '2',
        name: 'Test',
        brand: 'Test',
        stockAlert: '200',
        stockTotal: '300',
      },
      {
        key: '3',
        name: 'Toto',
        brand: 'Tata',
        stockAlert: '10',
        stockTotal: '20',
      },
    ]);
  }, []);


  return (
    <div className="mt-5 mb-10 admin-table">
      <Table dataSource={data} rowKey={'id'}>
        <Column title="Name" dataIndex="name" key="name"/>
        <Column title="Brand" dataIndex="brand" key="brand"/>
        <Column title="Alert Stock" dataIndex="stockAlert" key="stockAlert"/>
        <Column title="Total Stock" dataIndex="stockTotal" key="stockTotal"/>
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

export default TableUser;
