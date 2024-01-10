import TableProductBatch from "../../../components/tableAdmin/tableProductBatch.jsx";

const ProductBatch = () => {
  return (
    <div className={"flex flex-col mt-28"}>
      <a href={"#"} className={"mb-4 btn secondary ml-auto"}>Créer un nouveau lot de produit</a>
      <TableProductBatch/>
    </div>
  )
}

export default ProductBatch;
