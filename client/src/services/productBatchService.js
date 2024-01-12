import axios from 'axios';

const API_URL = "https://localhost:8000/api";


export async function getProductBatch() {
  try {
    const response = await axios.get(`${API_URL}/product_batches`);
    const productBatches = response.data;

    return productBatches;
  } catch (e) {
    console.log(e);
  }
}


export async function addProductBatch(addProduct) {
  const product = {
    "name": addProduct.name,
    "brand": addProduct.brand,
    "stock_alert": addProduct.stockAlert,
    "productBatch": "/api/product_batches/2",
    "vaccinType": addProduct.vaccinType,
    "stockAlert": addProduct.stockAlert
  }
  try {
    return await axios.post(`${API_URL}/products`, JSON.stringify(product), {headers: {
        "Content-Type" : "application/json",
      }});
  } catch (e) {
    console.log(e);
  }
}

export async function updateProductBatch(productId, updatedProduct) {
  const product = {
    "name": updatedProduct.name,
    "brand": updatedProduct.brand,
    "stock_alert": updatedProduct.stockAlert,
    "productBatch": "/api/product_batches/2",
    "vaccinType": updatedProduct.vaccinType,
    "stockAlert": updatedProduct.stockAlert
  }
  try {
    return await axios.put(`${API_URL}/products/${productId}`, product)
  } catch (e) {
    console.log(e);
  }
}

export async function deleteProductBatchById(productId) {
  try {
    return await axios.delete(`${API_URL}/products/${productId}`);
  } catch (e)  {
    console.log(e);
  }
}
