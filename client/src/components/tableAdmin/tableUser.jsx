"use client";
import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";
import {deleteUserById, getUserById, getUsers} from "../../services/users.js";
import Signup from "../../pages/Singup/Signup.jsx";
import {deleteRoleById} from "../../services/roles.js";

const TableUser = () => {
  const [data, setData] = useState([]);
  const [existingUser, setExistingUser] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  const getUsersList = async () => {
    const response = await getUsers();
    setData(response);
  }

  useEffect(() => {
    getUsersList();
  }, []);

  const openModal = (user) => {
    setModalOpen(true);
    setExistingUser(user);
  };

  const closeModal = () => {
    setModalOpen(false);
    setExistingUser(undefined);
  };

  const deleteUser = async (userId) => {
    await deleteUserById(userId);
    setData(data.filter(item => item.id !== userId));
  }

  const editUser = async (userId) => {
    const response = await getUserById(userId);
    setData(data.filter(item => item.id !== userId));
    openModal(response);
  }
    return (
      <div className="mt-5 mb-10 admin-table">
        <Table dataSource={data} rowKey={'id'}>
          <Column title="Name" dataIndex="name" key="name"/>
          <Column title="Email" dataIndex="mail" key="mail"/>
          <Column title="Phone" dataIndex="phone" key="phone"/>
          <Column title="Address" dataIndex="adress" key="adress"/>
          <Column title="City" dataIndex="city" key="city"/>
          <Column title="Country" dataIndex="land" key="land"/>
          <Column title="Zip Code" dataIndex="zip_code" key="zip_code"/>
          <Column title="Role" dataIndex="roles" key="roles" render={roles => roles ? roles.role : "" }/>
          <Column title="Action" key="action" className={"admin-action-title"} render={(_, record) => (
            <Space size="middle">
              <a href={"#"} className={"btn secondary admin-action"} onClick={() => editUser(record.id)}>
                Modifier
              </a>
              <span className="admin-action delete" onClick={() => {
                deleteUser(record.id);
              }}>Supprimer</span>
            </Space>
          )} />
        </Table>
        {isModalOpen &&
          <Signup
            closeModal={closeModal}
            openModal={openModal}
            isModalOpen={isModalOpen}
            userValue={existingUser}
          />
        }
      </div>
    )
}

export default TableUser;
