import IndicatorTab from "../../../components/IndicatorTab/IndicatorTab.jsx";
import {Outlet} from "react-router-dom";
import IndicatorPerform from "../../../components/IndicatorPerform/IndicatorPerform.jsx";

export default function Indicator() {
  return(
    <>
      <IndicatorTab></IndicatorTab>
      <div>
        <Outlet></Outlet>
      </div>
      <IndicatorPerform displayText={'Le fournisseur qui livrait le plus dans cette zone sur le trimestre 1 est AstraZeneca'}></IndicatorPerform>
    </>

  )
}
