import IndicatorPerform from "../../../components/IndicatorPerform/IndicatorPerform.jsx";
import BarChart from "../../../components/Chart/CustomChart.jsx";
import CustomChart from "../../../components/Chart/CustomChart.jsx";

export default function VaccineByZone() {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Graphique en barre montrant les vaccins vendus par zone',
      },
    },
  };

  const labels = ['Lyon France', 'Londre Angleterre', 'Madrid Espagne', 'Charleroi Espagne'];

  const data = {
    labels,
    datasets : [
      {
        label: "Covid-19",
        data: labels.map(() => 1000),
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
      <IndicatorPerform displayText={'Le vaccin vendu le plus par zone est l’hépatite A'}></IndicatorPerform>
    </>
  )
}
