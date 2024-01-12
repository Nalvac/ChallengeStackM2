import TableProductBatch from "../../../components/tableAdmin/tableProductBatch.jsx";
import {useEffect, useState} from "react";
import ProductBatchPopupForm from "./Products/ManageProductBatch.jsx";
import {deleteProductBatchById, getProductBatch} from "../../../services/productBatchService.js";

const ProductBatch = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [productsBatch, setProductsBatch] = useState([]);
  const [productBatch, setProductBatch] = useState(null);


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalOpen(false);
    setProductBatch(null);
  };

  const getProductBatchList = async () => {
    const response = await getProductBatch();
    console.log(response);
    setProductsBatch(response);
  }

  const deleteProduct = async (id) => {
    await deleteProductBatchById(id);
    setProductsBatch(productsBatch.filter((p) => p.id !== id ));
  }

  useEffect(() => {
    getProductBatchList();
  }, []);

  function editProductBatch(id) {
    setProductBatch(productsBatch.find(p => p.id === id));
    openModal();
  }


  return (
    <div className={"flex flex-col mt-12"}>
      <button className={"mb-4 btn secondary ml-auto"} onClick={openModal}>Créer un nouveau lot de produit</button>
      <TableProductBatch productsBatch={productsBatch} editProductBatch={editProductBatch} deleteProduct={deleteProduct}/>
        {isModalOpen &&
          <ProductBatchPopupForm
            closeModal={closeModal}
            openModal={openModal}
            isModalOpen={isModalOpen}
            productBatch={productBatch}
            productsBatch={productsBatch}
            setProductsBatch={setProductsBatch}
        />
        }
    </div>
  )
}

export default ProductBatch;
