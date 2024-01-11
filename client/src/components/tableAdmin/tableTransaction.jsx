import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";
import {deleteTransactionById, getTransactions} from "../../services/transactions.js";
import RolesFormPopup from "../../pages/admin/Data/Roles/RolesFormPopup.jsx";
import TransactionFormPopup from "../../pages/admin/Data/Transaction/TransactionFormPopup.jsx";

const TableTransaction = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [existingValue, setExistingValue] = useState({});

  const getTransactionsList = async () => {
    const response = await getTransactions();
    setData(response);
  }

  useEffect(() => {
    getTransactionsList();
  }, []);

  const deleteTransactions = async (transactionId) => {
    await deleteTransactionById(transactionId);
    setData(data.filter(item => item.id !== transactionId));
  }

  const openModal = (userId, quantity, deliveryDate, productBatchId, transactionId) => {
    setModalOpen(true);
    console.log(productBatchId);
    setExistingValue({
      user: userId,
      quantity: quantity,
      deliveryDate: deliveryDate,
      productBatch: productBatchId,
      transactionId: transactionId
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setExistingValue({});
  };

  console.log(data);

  return (
    <div className="mt-5 mb-10 admin-table">
      <Table dataSource={data} rowKey={'id'}>
        <Column title="User" dataIndex="user" key="user"/>
        <Column title="Quantity" dataIndex="quantity" key="quantity"/>
        <Column title="Delivery Date" dataIndex="deliveryDate" key="deliveryDate"/>
        <Column title="Batch" dataIndex="productBatch" key="productBatch"/>
        <Column title="Action" key="action" className={"admin-action-title"} render={(_, record) => (
          <Space size="middle">
            <a href={"#"} className={"btn secondary admin-action"}  onClick={() => openModal(record.user, record.quantity, record.deliveryDate, record.productBatch, record.id)}>
              Modifier
            </a>
            <span className="admin-action delete" onClick={() => {
              deleteTransactions(record.id);
            }}>Supprimer</span>
          </Space>
        )} />
      </Table>
      {isModalOpen &&
        <TransactionFormPopup
          closeModal={closeModal}
          openModal={openModal}
          isModalOpen={isModalOpen}
          transactionValue={existingValue}
        />
      }
    </div>
  )
}

export default TableTransaction;
