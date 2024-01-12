import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";
import {getCustomerTransaction} from "../../services/customerTransaction.js";

const TableTransaction = () => {
  const [data, setData] = useState([]);
  const [existingCustomerTransaction, setCustomerTransaction] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  const getCustomerTransactionList = async () => {
    const response = await getCustomerTransaction();
    setData(response);
  }

  useEffect(() => {
    getCustomerTransactionList()
  }, []);

  const deleteCustomerTransaction = async (customerTransactionId) => {
    await deleteCustomerTransactionById(customerTransactionId);
    setData(data.filter(item => item.id !== customerTransactionId));
  }


  return (
    <div className="mt-5 mb-10 admin-table">
      <Table dataSource={data} rowKey={'id'}>
        <Column title="User" dataIndex="user" key="user" render={user => user ? user.name : ""}/>
        <Column title="Quantity" dataIndex="quantity" key="quantity"/>
        <Column title="Delivery Date" dataIndex="deliveryDate" key="deliveryDate"/>
        <Column title="Batch" dataIndex="productBatch" key="productBatch" render={productBatch => productBatch ? productBatch.id : "" }/>
        <Column title="Action" key="action" className={"admin-action-title"} render={(_, record) => (
          <Space size="middle">
            <a href={"#"} className={"btn secondary admin-action"}>
              Modifier
            </a>
            <span className="admin-action delete" onClick={() => {
              deleteCustomerTransaction(record.id);
            }}>Supprimer</span>
          </Space>
        )} />
      </Table>
    </div>
  )
}

export default TableTransaction;
