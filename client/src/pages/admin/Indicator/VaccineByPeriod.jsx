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

  let labels = [];

  const [products, setProducts] = useState([]);
  const [indicators, setIndicators] = useState([]);

  const getListProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  }

  useEffect(() => {
    getListProducts();
  }, []);

  const onSubmit = async (data) => {
    const response = await getVaccineByPeriod(data.products, data.year);
    if(response && response.status === 200)
    {
      console.log(response);
      setIndicators(response.data);
    }

    const multiSelect = document.querySelector('#period-selector');
    const options = multiSelect.options;
    for(const option of multiSelect.options)
    {
      if (option.selected)
      {
        console.log(option.value);
        console.log(option.text);
        labels.push(option.text.toString());
      }
    }
  }

  console.log(indicators);
  console.log(labels);

  let chartData = [];

  indicators.forEach(indicator => {
    chartData.push({
      label: indicator.name + ' ' + indicator.brand,
      data: labels.map(() => indicator.quantite),
      backgroundColor: randomRGB(),
    });
  });

  const data = {
    labels,
    datasets : chartData
  };

  // function submitPeriod() {
  //   const multiSelect = document.querySelector('#period-selector');
  //
  //   const options = multiSelect.options;
  //
  //   console.log(multiSelect);
  //
  //   for(const option of multiSelect.options)
  //   {
  //     if (option.selected)
  //     {
  //       console.log(option.value);
  //       console.log(option.text);
  //       labels.push(option.text.toString());
  //     }
  //   }
  // }

  return (
    <>
      <CustomChart type={'bar'} options={options} data={data}/>
      <IndicatorPerform displayText={'Le vaccin vendu le plus sur cette période est l’hépatite A'}></IndicatorPerform>
      <form className={"flex flex-row"} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor={"name"}>Nom de la catégorie</label>
          <select {...register("products")} multiple={true}>
            {products.map((product, key) => {
              return (
                <option key={key} value={product.id}>{product.name} {product.brand}</option>
              )
            })}
          </select>
          {/*<input type={"text"} placeholder={"Produits"} {...register("products", { required: true})}/>*/}
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

      {/*<div>*/}
      {/*  */}
      {/*  <button className={''} onClick={submitPeriod}>Sélectionner cette période</button>*/}
      {/*</div>*/}
    </>
  )
}
