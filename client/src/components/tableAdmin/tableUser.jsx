import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";

const TableUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        key: '1',
        name: 'Mike Mike',
        email: 'mike@mike.com',
        phone: '+33123456789',
        address: '10 Downing Street',
        role: 'Commercial',
      },
      {
        key: '2',
        name: 'John Doe',
        email: 'john@doe.com',
        phone: '+33123456789',
        address: '10 Updward Street',
        role: 'Magasinier',
      },
      {
        key: '3',
        name: 'Admin admin',
        email: 'admin@admin.com',
        phone: '+33123456789',
        address: '10 Admin Street',
        role: 'Admin',
      },
    ]);
  }, []);


    return (
      <div className="mt-5 mb-10 admin-table">
        <Table dataSource={data} rowKey={'id'}>
          <Column title="Name" dataIndex="name" key="name"/>
          <Column title="Email" dataIndex="email" key="email"/>
          <Column title="Phone" dataIndex="phone" key="phone"/>
          <Column title="Address" dataIndex="address" key="address"/>
          <Column title="Role" dataIndex="role" key="role"/>
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
