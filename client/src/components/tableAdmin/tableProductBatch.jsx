import {Space, Table} from "antd";
const { Column } = Table;

const TableProductBatch = ({productsBatch, editProductBatch}) => {



  return (
    <div className="mt-5 mb-10 admin-table">
      <Table dataSource={productsBatch} rowKey={'id'}>
        <Column title="Name Brand" dataIndex="brand" key="brand"/>
        <Column title="Fournisseur" dataIndex="name" key="name"/>
        <Column title="Batch Stock" dataIndex="quantity" key="quantity"/>
        <Column title="Expiration Date" dataIndex="dateExp" key="dateExp"/>
        <Column title="Action" key="action" className={"admin-action-title"} render={(_, record) => (
          <Space size="middle">
            <a href={"#"} className={"btn secondary admin-action"} onClick={() => {editProductBatch(record.id)}}>
              Modifier
            </a>
            <span className="admin-action delete" onClick={() => {
            }}>Supprimer</span>
          </Space>
        )} />
      </Table>
    </div>
  )
}

export default TableProductBatch;
