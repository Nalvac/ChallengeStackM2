import TableTransaction from "../../../components/tableAdmin/tableTransaction.jsx";
import {useState} from "react";
import TransactionFormPopup from "./Transaction/TransactionFormPopup.jsx";

export default function Transaction() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className={"flex flex-col mt-12"}>
      <button className={"mb-4 btn secondary ml-auto"} onClick={openModal}>Créer une nouvelle transaction</button>
      <TableTransaction/>
      {isModalOpen &&
        <TransactionFormPopup
          closeModal={closeModal}
          openModal={openModal}
          isModalOpen={isModalOpen}
        />
      }
    </div>
  )
}
