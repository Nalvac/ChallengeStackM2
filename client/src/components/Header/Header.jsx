import {NavLink} from "react-router-dom";
import logo from '../../assets/images/logo.png';
export default function Header (){
  return (
    <>
      <header className={'flex items-center'}>
        <div className={'flex  w-4/5 '}>
          <div className={'ml-8 mr-8 w-28'}>
            <img alt={'CCAM Logo'} src={logo}/>
          </div>
          <div className={'flex justify-center items-center'}>
            <NavLink to={'indicator'} className={`mr-5`} >
              <h4>Indicateurs</h4>
            </NavLink>
            <NavLink to={'data'}>
              <h4>Données</h4>
            </NavLink>
          </div>
        </div>
        <div className={'ml-5 flex justify-center items-center w-1/5 '}>
          <h3 className={'mr-2'}>Bienvenu Joe Doe !</h3>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </header>
    </>
  )

}
