import TableProduct from "../../../../components/tableAdmin/tableProduct.jsx";
import {useState} from "react";
import ProductPopupForm from "./ManageProduct.jsx";

const Products = () => {

  const [isModalOpen, setModalOpen] = useState(false);


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={"flex flex-col mt-12"}>
      <a href={"#"} className={"mb-4 btn secondary ml-auto"} onClick={openModal}>Créer un nouveau produit</a>
      <TableProduct/>
      {isModalOpen &&
        <ProductPopupForm
          closeModal={closeModal}
          openModal={openModal}
          isModalOpen={isModalOpen}
        />
      }
    </div>
  )
}

export default Products;
