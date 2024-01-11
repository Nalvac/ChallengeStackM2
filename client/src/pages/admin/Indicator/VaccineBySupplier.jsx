import CustomChart from "../../../components/Chart/CustomChart.jsx";
import IndicatorPerform from "../../../components/IndicatorPerform/IndicatorPerform.jsx";

export default function VaccineBySupplier() {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Graphique en barre montrant les vaccins vendus par période',
      },
    },
  };

  const labels = ['Janvier', 'Février', 'Octobre', 'Décembre'];

  const data = {
    labels,
    datasets : [
      {
        label: "Covid-19",
        data: labels.map(() => 4000),
        backgroundColor: 'rgb(188, 24, 124)',
      },
      {
        label: "Hépatite A",
        data: labels.map(() => 300),
        backgroundColor: 'rgb(126, 190, 197)',
      },
      {
        label: "Hépatite B",
        data: labels.map(() => 100),
        backgroundColor: 'rgb(135, 247, 118)',
      },
    ]
  };

  return (
    <>
      {/*Doens't work yet*/}
      {/*<CustomChart data={data} options={options}/>*/}
      <IndicatorPerform displayText={'Le fournisseur qui livrait le plus dans cette zone sur le trimestre 1 est AstraZeneca'}></IndicatorPerform>
      En cours
    </>
  )
}
