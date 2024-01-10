import {NavLink} from "react-router-dom";

export default function IndicatorTab(){
  return (
    <>
      <div className={'flex justify-center gap-3 px-36 py-8'}>
        <NavLink to={'vaccineByPeriod'} className={({isActive}) => isActive ? `btn secondary` : 'btn primary'}>
          Vaccin par période
        </NavLink>
        <NavLink to={'vaccineByZone'} className={({isActive}) => isActive ? `btn secondary` : 'btn primary'}>
          Vaccin par zone
        </NavLink>
        <NavLink to={'vaccineBySupplier'} className={({isActive}) => isActive ? `btn secondary` : 'btn primary'}>
          Fournisseur livrant le plus
        </NavLink>
      </div>
    </>
  )
}
