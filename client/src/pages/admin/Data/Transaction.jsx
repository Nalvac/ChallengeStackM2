import TableTransaction from "../../../components/tableAdmin/tableTransaction.jsx";

export default function Transaction() {
  return (
    <div className={"flex flex-col mt-12"}>
      <a href={"#"} className={"mb-4 btn secondary ml-auto"}>Créer une nouvelle transaction</a>
      <TableTransaction/>
    </div>
  )
}
