import {Table} from "antd";

const TableAdmin = ({ dataSource, columns }) => {
    return (
        <Table dataSource={dataSource} columns={columns} />
    )
}

export default TableAdmin;