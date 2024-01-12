import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getVaccineByPeriod(productId, deliveryDate) {
  try {
    return await axios.post(`${API_URL}/tension/vaccin`, JSON.stringify({
      productId: productId,
      deliveryDate: deliveryDate
    }), {headers: {
        "Content-Type" : "application/json",
      }});
  } catch (e) {
    console.log(e);
  }
}

export async function getBestSellingVaccine()
{
  try {
    const response = await axios.get(`${API_URL}/best/vaccin`);
    return response.data;
  } catch (e)
  {
    console.log(e);
  }
}
