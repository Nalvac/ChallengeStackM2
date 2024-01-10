import Header from "../../components/Header/Header.jsx";
import {Outlet} from "react-router-dom";

export default function Homepage () {
  return(
    <>
      <Header></Header>
      <div className={'mt-20'}>
        <Outlet></Outlet>
      </div>
    </>
  )
}
