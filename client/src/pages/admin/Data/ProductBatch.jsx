import TableProductBatch from "../../../components/tableAdmin/tableProductBatch.jsx";
import {useEffect, useState} from "react";
import ProductBatchPopupForm from "./Products/ManageProductBatch.jsx";
import {deleteProductById, getProductById, getProducts, getUserById} from "../../../services/productService.js";
import {getProductBatch} from "../../../services/productBatchService.js";

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
    if (response) {
      for (let batch of response) {
        const productResponse = await getProductById(2);
        const userResponse = await getUserById(2);

        batch.productDetails = productResponse.data;
        batch.userDetails = userResponse.data;
      }
    }
    setProductsBatch(response);
  }

  const deleteProduct = async (id) => {
    await deleteProductById(id);
    setProductsBatch(productBatch.filter((p) => p.id !== id ));
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
      <TableProductBatch productsBatch={productsBatch} editProductBatch={editProductBatch}/>
        {isModalOpen &&
          <ProductBatchPopupForm
            closeModal={closeModal}
            openModal={openModal}
            isModalOpen={isModalOpen}
            productBatch={productBatch}
            productsBatch={productsBatch}
            setProductsBatch={setProductBatch}
        />
        }
    </div>
  )
}

export default ProductBatch;
