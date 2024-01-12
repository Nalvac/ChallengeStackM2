import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";
import {getProductBatch} from "../../services/productBatch.js";
import Signup from "../../pages/Singup/Signup.jsx";

const TableProductBatch = () => {
  const [data, setData] = useState([]);
  const [existingProductBatch, setExistingProductBatch] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  const getProductBatchList = async () => {
    const response = await getProductBatch();
    setData(response);
  }

  useEffect(() => {
    getProductBatchList();
  }, []);

  const openModal = (productBatch) => {
    setModalOpen(true);
    setExistingProductBatch(productBatch);
  };

  const closeModal = () => {
    setModalOpen(false);
    setExistingUser(undefined);
  };

  const deleteProductBatch = async (productBatchId) => {
    await deleteProductBatch(productBatchId);
    setData(data.filter(item => item.id !== productBatchId));
  }



  return (
    <div className="mt-5 mb-10 admin-table">
      <Table dataSource={data} rowKey={'id'}>
        <Column title="Product Name" dataIndex="product" key="product" render={product => product ? product.name : "" }/>
        <Column title="Fournisseur" dataIndex="user" key="user" render={user => user ? user.name : "" }/>
        <Column title="Batch Stock" dataIndex="quantity" key="quantity"/>
        <Column title="Expiration Date" dataIndex="dateExp" key="dateExp"/>
        <Column title="Action" key="action" className={"admin-action-title"} render={(_, record) => (
          <Space size="middle">
            <a href={"#"} className={"btn secondary admin-action"}>
              Modifier
            </a>
            <span className="admin-action delete" onClick={() => {
              deleteProductBatch(record.id);
            }}>Supprimer</span>
          </Space>
        )} />
      </Table>
      {isModalOpen &&
        <Signup
          closeModal={closeModal}
          openModal={openModal}
          isModalOpen={isModalOpen}
          productBatchValue={existingProductBatch}
        />
      }
    </div>
  )
}

export default TableProductBatch;
