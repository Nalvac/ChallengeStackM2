import TableUser from "../../../components/tableAdmin/tableUser.jsx";
import Signup from "../../Singup/Signup.jsx";
import {useState} from "react";

const Users = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={"flex flex-col mt-12"}>
      <a href={"#"} className={"mb-4 btn secondary ml-auto"} onClick={openModal}>Créer un nouveau client</a>
      <TableUser/>
      {isModalOpen &&
        <Signup
          closeModal={closeModal}
          openModal={openModal}
          isModalOpen={isModalOpen}
        />
      }
    </div>
  )
}

export default Users;
