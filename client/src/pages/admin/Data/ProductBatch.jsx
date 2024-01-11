import TableProductBatch from "../../../components/tableAdmin/tableProductBatch.jsx";
import {useState} from "react";
import ProductBatchPopupForm from "./Products/ManageProductBatch.jsx";

const ProductBatch = () => {

  const [isModalOpen, setModalOpen] = useState(false);


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <div className={"flex flex-col mt-12"}>
      <button className={"mb-4 btn secondary ml-auto"} onClick={openModal}>Créer un nouveau lot de produit</button>
      <TableProductBatch/>
        {isModalOpen &&
          <ProductBatchPopupForm
            closeModal={closeModal}
            openModal={openModal}
            isModalOpen={isModalOpen}
        />
        }
    </div>
  )
}

export default ProductBatch;
