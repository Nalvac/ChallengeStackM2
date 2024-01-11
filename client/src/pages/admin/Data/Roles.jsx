import TableRole from "../../../components/tableAdmin/tableRole.jsx";
import RolesFormPopup from "./Roles/RolesFormPopup.jsx";
import {useState} from "react";

const Roles = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={"flex flex-col mt-12"}>
      <a href={"#"} className={"mb-4 btn secondary ml-auto"} onClick={openModal}>Créer un nouveau rôle</a>
      <TableRole/>
      {isModalOpen &&
        <RolesFormPopup
          closeModal={closeModal}
          openModal={openModal}
          isModalOpen={isModalOpen}
        />
      }
    </div>
  )
}

export default Roles;
