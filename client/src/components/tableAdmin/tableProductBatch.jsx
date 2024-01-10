import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";

const TableProductBatch = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        key: '1',
        name_brand: 'Covid-19 Pfizer',
        fournisseur: 'Pfizer',
        batch_stock: '100',
        expiration_date: '01/01/2025',
      },
      {
        key: '2',
        name_brand: 'Toto Tata',
        fournisseur: 'Tata',
        batch_stock: '1000',
        expiration_date: '10/10/2025',
      },
      {
        key: '3',
        name_brand: 'Test',
        fournisseur: 'Test',
        batch_stock: '100',
        expiration_date: '30/30/2030',
      },
    ]);
  }, []);


  return (
    <div className="mt-5 mb-10 admin-table">
      <Table dataSource={data} rowKey={'id'}>
        <Column title="Name Brand" dataIndex="name_brand" key="name_brand"/>
        <Column title="Fournisseur" dataIndex="fournisseur" key="fournisseur"/>
        <Column title="Batch Stock" dataIndex="batch_stock" key="batch_stock"/>
        <Column title="Expiration Date" dataIndex="expiration_date" key="expiration_date"/>
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

export default TableProductBatch;
