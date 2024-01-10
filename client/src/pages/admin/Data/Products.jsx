import TableProduct from "../../../components/tableAdmin/tableProduct.jsx";

const Roles = () => {
  return (
    <div className={"flex flex-col mt-28"}>
      <a href={"#"} className={"mb-4 btn secondary ml-auto"}>Créer un nouveau produit</a>
      <TableProduct/>
    </div>
  )
}

export default Roles;
