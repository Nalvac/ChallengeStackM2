import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";

const TableRole = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        name: 'Admin',
      },
      {
        name: 'Magasinier',
      },
      {
        name: 'Commercial',
      },
    ]);
  }, []);


  return (
    <div className="mt-5 mb-10 admin-table">
      <Table dataSource={data} rowKey={'id'}>
        <Column title="Name" dataIndex="name" key="name"/>
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

export default TableRole;
