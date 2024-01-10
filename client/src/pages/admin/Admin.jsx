import {Outlet} from "react-router-dom";

const Admin = () => {
    return (
        <div>
            <p>Bienvenue sur l'admin</p>
            <a href={"/admin/users"}>Voir les utilisateurs</a>
            <Outlet/>
        </div>
    )
}

export default Admin;