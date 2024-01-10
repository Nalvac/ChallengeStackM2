import TableAdmin from "../../components/tableAdmin.jsx";

const User = () => {

    const dataSource = [
        {
            key: '1',
            name: 'Mike Mike',
            email: 'mike@mike.com',
            phone: '+33123456789',
            address: '10 Downing Street',
            role: 'Commercial',
        },
        {
            key: '2',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '+33123456789',
            address: '10 Updward Street',
            role: 'Magasinier',
        },
        {
            key: '3',
            name: 'Admin admin',
            email: 'admin@admin.com',
            phone: '+33123456789',
            address: '10 Admin Street',
            role: 'Admin',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];

    return (
        <div className={"flex flex-col mt-28"}>
            <a href={"#"} className={"mb-9 btn secondary ml-auto"}>Créer un nouveau client</a>
            <TableAdmin dataSource={dataSource} columns={columns}/>
        </div>
    )
}

export default User;