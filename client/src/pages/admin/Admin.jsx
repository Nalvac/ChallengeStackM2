import {Outlet} from "react-router-dom";
import AdminTab from "../../components/AdminTab/AdminTab.jsx";

const Admin = () => {
    return (
        <div>
          <AdminTab/>
          <Outlet/>
        </div>
    )
}

export default Admin;
