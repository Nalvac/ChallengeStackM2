import {Space, Table} from "antd";
const { Column } = Table;
import {useEffect, useState} from "react";
import {deleteRoleById, getRoles} from "../../services/roles.js";
import RolesFormPopup from "../../pages/admin/Data/Roles/RolesFormPopup.jsx";

const TableRole = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [exsitingName, setExsitingName] = useState('');
  const [exsitingId, setExsitingId] = useState('');

  const getRolesList = async () => {
    const response = await getRoles();
    setData(response);
  }

  useEffect(() => {
    getRolesList();
  }, []);

  const deleteRole = async (roleId) => {
    await deleteRoleById(roleId);
    setData(data.filter(item => item.id !== roleId));
  }

  const openModal = (roleName, roleId) => {
    setModalOpen(true);
    setExsitingName(roleName);
    setExsitingId(roleId);
  };

  const closeModal = () => {
    setModalOpen(false);
    setExsitingName('');
    setExsitingId('');
  };

  return (
    <div className="mt-5 mb-10 admin-table">
      <Table dataSource={data} rowKey={'id'}>
        <Column title="Id" dataIndex="id" key="id"/>
        <Column title="Name" dataIndex="role" key="role"/>
        <Column title="Action" key="action" className={"admin-action-title"} render={(_, record) => (
          <Space size="middle">
            <a href={'#'} className={"btn secondary admin-action"} onClick={() => openModal(record.role, record.id)}>
              Modifier
            </a>
            <span className="admin-action delete" onClick={() => {
              deleteRole(record.id);
            }}>Supprimer</span>
          </Space>
        )} />
      </Table>
      {isModalOpen &&
        <RolesFormPopup
          closeModal={closeModal}
          openModal={openModal}
          isModalOpen={isModalOpen}
          existingValue={exsitingName}
          roleId={exsitingId}
        />
      }
    </div>
  )
}

export default TableRole;
