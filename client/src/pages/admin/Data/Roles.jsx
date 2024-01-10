import TableRole from "../../../components/tableAdmin/tableRole.jsx";

const Roles = () => {
  return (
    <div className={"flex flex-col mt-28"}>
      <a href={"#"} className={"mb-4 btn secondary ml-auto"}>Créer un nouveau rôle</a>
      <TableRole/>
    </div>
  )
}

export default Roles;
