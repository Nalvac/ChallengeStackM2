import TableRole from "../../../components/tableAdmin/tableRole.jsx";

export default function Roles() {
  return(
    <>
      <div className={"flex flex-col mt-28"}>
        <a href={"/newUser"} className={"mb-4 btn secondary ml-auto"}>Créer un nouveau rôle</a>
        <TableRole/>
      </div>
    </>
  )
}
