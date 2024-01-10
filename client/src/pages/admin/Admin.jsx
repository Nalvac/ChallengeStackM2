import {Outlet} from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <p>Bienvenue sur l'admin</p>
      <div>
        <a href={"/admin/users"}>Voir les utilisateurs</a>
        <a href={"/admin/roles"}>Voir les rôles</a>
        <a href={"/admin/products"}>Voir les produits</a>
      </div>
      <Outlet/>
    </div>
  )
}

export default Admin;
