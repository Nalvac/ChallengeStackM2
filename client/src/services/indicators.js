import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getVaccineByPeriod(productId, deliveryDate) {
  try {
    const response = await axios.post(`${API_URL}/tension/vaccin`, JSON.stringify({
      productId: productId,
      deliveryDate: deliveryDate
    }), {headers: {
        "Content-Type" : "application/json",
      }});

    return response;
  } catch (e) {
    console.log(e);
  }
}
