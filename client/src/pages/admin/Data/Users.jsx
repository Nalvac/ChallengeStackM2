import TableUser from "../../../components/tableAdmin/tableUser.jsx";

const Users = () => {
  return (
    <div className={"flex flex-col mt-12"}>
      <a href={"#"} className={"mb-4 btn secondary ml-auto"}>Créer un nouveau client</a>
      <TableUser/>
    </div>
  )
}

export default Users;
