import IndicatorPerform from "../../../components/IndicatorPerform/IndicatorPerform.jsx";
import CustomChart from "../../../components/Chart/CustomChart.jsx";
import {useForm} from "react-hook-form";
import {getBestSellingVaccine, getVaccineByPeriod} from "../../../services/indicators.js";
import {useEffect, useState} from "react";
import {getProducts} from "../../../services/products.js";
import randomRGB from "../../../helpers/randomColor.js";

export default function VaccineByPeriod () {

  const { register, handleSubmit,setValue, formState: { errors } } = useForm();

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



  const [products, setProducts] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [bestVaccine, setBestVaccine] = useState([]);

  const getListProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  }

  const getBestVaccine = async () => {
    const response = await getBestSellingVaccine();
    setBestVaccine(response);
  }

  useEffect(() => {
    getListProducts();
    getBestVaccine();
  }, []);

  let chartData = [];
  let dataVaccine;
  let labels = [];

  const onSubmit = async (data) => {
    const response = await getVaccineByPeriod(data.products, data.year);
    if(response && response.status === 200)
    {
      setIndicators(response.data);
    }
  }

  if (indicators) {
    const multiSelect = document.querySelector('#period-selector');

    if (multiSelect) {
      for (const option of multiSelect.options) {
        if (option.selected) {
          labels.push(option.text);
        }
      }
    }

    let vaccineDataMap = {};

    for (let [key, value] of Object.entries(indicators)) {
      if (labels.includes(key)) {
        for (let [childKey, childValue] of Object.entries(value)) {
          let vaccineKey = childValue.name + ' ' + childValue.brand;

          if (!vaccineDataMap[vaccineKey]) {
            vaccineDataMap[vaccineKey] = new Array(labels.length).fill(0);
          }

          let labelIndex = labels.indexOf(key);
          vaccineDataMap[vaccineKey][labelIndex] = childValue.quantite || 0;
        }
      }
    }

    for (let [vaccine, data] of Object.entries(vaccineDataMap)) {
      chartData.push({
        label: vaccine,
        data: data,
        backgroundColor: randomRGB(),
      });
    }

    dataVaccine = {
      labels,
      datasets: chartData
    };
  }

  return (
    <>
      {dataVaccine &&
        <CustomChart type={'bar'} options={options} data={dataVaccine}/>
      }
      <IndicatorPerform displayText={`Le vaccin vendu le plus sur cette période est ${bestVaccine.name} ${bestVaccine.brand}`}></IndicatorPerform>
      <form className={"flex flex-row"} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor={"name"}>Produits</label>
          <select {...register("products")} multiple={true}>
            {products.map((product, key) => {
              return (
                <option key={key} value={product.id}>{product.name} {product.brand}</option>
              )
            })}
          </select>
          {errors.name && <p className={"italic text-red-500 mb-4"}>Veuillez choisir des produits</p>}
        </div>

        <div>
          <label htmlFor={"year"}>Année</label>
          <input type={"number"} placeholder={"Année"} {...register("year", { required: true})}/>
          {errors.name && <p className={"italic text-red-500 mb-4"}>Veuillez entrer une année</p>}
        </div>

        <select {...register("months")} multiple={true} id={"period-selector"}>
          <option key={"01"} value={"01"}>Janvier</option>
          <option key={"02"} value={"02"}>Février</option>
          <option key={"03"} value={"03"}>Mars</option>
          <option key={"04"} value={"04"}>Avril</option>
          <option key={"05"} value={"05"}>Mai</option>
          <option key={"06"} value={"06"}>Juin</option>
          <option key={"07"} value={"07"}>Juillet</option>
          <option key={"12"} value={"08"}>Août</option>
          <option key={"08"} value={"09"}>Septembre</option>
          <option key={"09"} value={"10"}>Octobre</option>
          <option key={"10"} value={"11"}>Novembre</option>
          <option key={"11"} value={"12"}>Décembre</option>

        </select>
        <input className={''} type={"submit"} value={'Charger'}/>
      </form>
    </>
  )
}
