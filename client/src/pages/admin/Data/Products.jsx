import TableProduct from "../../../components/tableAdmin/tableProduct.jsx";
import {useEffect, useState} from "react";
import ProductPopupForm from "./Products/ManageProduct.jsx";
import {deleteProductById, getProducts} from "../../../services/productService.js";

const Products = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);



  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setProduct(null);
  };

  const getProductList = async () => {
    const response = await getProducts();
    const products = response.map(r => ({
      id: r.id,
      name: r.name,
      brand: r.brand,
      stock_alert: r.stock_alert,
      vaccinType: r.vaccinType,
      stockTotal: r.productBatches.reduce((total, productBatch) => total + productBatch.quantity, 0),

    }))
    setProducts(products);
  }

  const deleteProduct = async (id) => {
    await deleteProductById(id);
    setProducts(products.filter((p) => p.id !== id ));
  }

  useEffect(() => {
    getProductList();
  }, []);

  function edit(id) {
    setProduct(products.find(p => p.id === id));
    openModal();
  }

  return (
    <div className={"flex flex-col mt-12"}>
      <a href={"#"} className={"mb-4 btn secondary ml-auto"}  onClick={openModal}>Créer un nouveau produit</a>
      <TableProduct products={products} editProduct={edit} deleteProduct={deleteProduct}/>
      {isModalOpen &&
        <ProductPopupForm
          closeModal={closeModal}
          openModal={openModal}
          isModalOpen={isModalOpen}
          product={product}
          products={products}
          setProducts={setProducts}
        />
      }
    </div>
  )
}

export default Products;
