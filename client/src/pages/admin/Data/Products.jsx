import TableProduct from "../../../components/tableAdmin/tableProduct.jsx";

const Products = () => {
  return (
    <div className={"flex flex-col mt-12"}>
      <a href={"#"} className={"mb-4 btn secondary ml-auto"}>Créer un nouveau produit</a>
      <TableProduct/>
    </div>
  )
}

export default Products;
