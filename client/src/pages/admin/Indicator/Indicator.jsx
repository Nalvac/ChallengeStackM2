import IndicatorTab from "../../../components/IndicatorTab/IndicatorTab.jsx";
import {Outlet} from "react-router-dom";

export default function Indicator() {
  return(
    <>
      <IndicatorTab></IndicatorTab>
      <div>
        <Outlet></Outlet>
      </div>
    </>

  )
}
