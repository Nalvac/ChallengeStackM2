import {NavLink} from "react-router-dom";

export default function AdminTab() {
  return(
    <>
      <div className={'flex justify-center gap-3 px-36 py-8'}>
        <NavLink to={'productBatch'} className={({isActive}) => isActive ? `btn secondary` : 'btn primary'}>
          Lot de produit
        </NavLink>
        <NavLink to={'products'} className={({isActive}) => isActive ? `btn secondary` : 'btn primary'}>
          Produit
        </NavLink>
        <NavLink to={'users'} className={({isActive}) => isActive ? `btn secondary` : 'btn primary'}>
          Utilisateurs
        </NavLink>
        <NavLink to={'transaction'} className={({isActive}) => isActive ? `btn secondary` : 'btn primary'}>
          Transaction
        </NavLink>
        <NavLink to={'roles'} className={({isActive}) => isActive ? `btn secondary` : 'btn primary'}>
          Rôles
        </NavLink>
      </div>
    </>
  )
}
