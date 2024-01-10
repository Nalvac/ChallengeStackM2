import TableProduct from "../../../components/tableAdmin/tableProduct.jsx";

export default function Products() {
  return(
    <>
      <div className={"flex flex-col mt-28"}>
        <a href={"/newUser"} className={"mb-4 btn secondary ml-auto"}>Créer un nouveau produit</a>
        <TableProduct/>
      </div>
    </>
  )
}
