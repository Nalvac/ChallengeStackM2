"use client";
import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";
import {getUsers} from "../../services/users.js";
import {getRoleById} from "../../services/roles.js";
import Signup from "../../pages/Singup/Signup.jsx";

const TableUser = () => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState('');
  const [existingUser, setExistingUser] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  const getUsersList = async () => {
    const response = await getUsers();
    setData(response);
    // console.log(response);
  }

  useEffect(() => {
    getUsersList();
  }, []);

  const getRole = async (roleId) => {
    const response = await getRoleById(roleId);
    setRole(response);
    // console.log(response);
  }

  const openModal = (user) => {
    setModalOpen(true);
    setExistingUser(user);
  };

  const closeModal = () => {
    setModalOpen(false);
    setExistingUser(undefined);
  };

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
          <Column title="Role" dataIndex="roles" key="roles"/>
          <Column title="Action" key="action" className={"admin-action-title"} render={(_, record) => (
            <Space size="middle">
              <a href={"#"} className={"btn secondary admin-action"} onClick={() => openModal(record)}>
                Modifier
              </a>
              <span className="admin-action delete" onClick={() => {
                console.log('Setup delete')
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
