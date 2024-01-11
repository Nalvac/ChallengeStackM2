import IndicatorPerform from "../../../components/IndicatorPerform/IndicatorPerform.jsx";
import CustomChart from "../../../components/Chart/CustomChart.jsx";

export default function VaccineByPeriod () {

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
      <CustomChart type={'bar'} options={options} data={data}/>
      <IndicatorPerform displayText={'Le vaccin vendu le plus sur cette période est l’hépatite A'}></IndicatorPerform>
    </>
  )
}
