import {Space, Table} from "antd";
import {useEffect} from "react";
const { Column } = Table;

const TableProduct = ({products, editProduct, deleteProduct}) => {

  useEffect(() => {

  },[products])


  return (
    <div className="mt-5 mb-10 admin-table">
      <Table dataSource={[...products].reverse()} rowKey={'id'} >
        <Column title="Name" dataIndex="name" key="name"/>
        <Column title="Brand" dataIndex="brand" key="brand"/>
        <Column title="Alert Stock" dataIndex="stockAlert" key="stockAlert"/>
        <Column title="Total Stock" dataIndex="stockTotal" key="stockTotal"/>
        <Column title="Type" dataIndex="vaccinType" key="vaccinType"/>
        <Column title="Action" key="action" className={"admin-action-title"} render={(_, record) => (
          <Space size="middle">
            <button className={"btn secondary admin-action"} onClick={() => {editProduct(record.id)}}>
              Modifier
            </button>
            <span className="admin-action delete" onClick={() => {
              deleteProduct(record.id)
            }}>Supprimer</span>
          </Space>
        )} />
      </Table>
    </div>
  )
}

export default TableProduct;
