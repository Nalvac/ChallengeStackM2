import IndicatorPerform from "../../../components/IndicatorPerform/IndicatorPerform.jsx";
import CustomChart from "../../../components/Chart/CustomChart.jsx";
import {useForm} from "react-hook-form";
import {getVaccineByPeriod} from "../../../services/indicators.js";
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

  const getListProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  }

  useEffect(() => {
    getListProducts();
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

  if(indicators)
  {
    const multiSelect = document.querySelector('#period-selector');

    if(multiSelect)
    {
      for(const option of multiSelect.options)
      {
        if (option.selected)
        {
          labels.push(option.text);
        }
      }
    }


    for(let [key, value] of Object.entries(indicators)) {
      labels.forEach(label => {
        if(key === label)
        {
          if(value)
          {
            for(let [childKey, childValue] of Object.entries(value))
            {
              console.log(childValue.brand);

              chartData.push({
                label: childValue.name + ' ' + childValue.brand,
                data: labels.map(() => childValue.quantite),
                backgroundColor: randomRGB(),
              });
            }
          }
        }
      })
    }

    dataVaccine = {
      labels,
      datasets : chartData
    };
  }

  console.log(indicators);
  return (
    <>
      {dataVaccine &&
        <CustomChart type={'bar'} options={options} data={dataVaccine}/>
      }
      <IndicatorPerform displayText={'Le vaccin vendu le plus sur cette période est l’hépatite A'}></IndicatorPerform>
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
