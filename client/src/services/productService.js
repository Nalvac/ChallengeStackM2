import axios from 'axios';

const API_URL = "https://localhost:8000/api";


export async function getProducts() {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (e)
  {
    console.log(e);
  }
}

export async function addProduct(addProduct) {
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

export async function updateProduct(productId, updatedProduct) {
  const product = {
    "name": updatedProduct.name,
    "brand": updatedProduct.brand,
    "stockAlert": updatedProduct.stock_alert
  }
  try {
    return await axios.put(`${API_URL}/products/${productId}`, product)
  } catch (e) {
    console.log(e);
  }
}

export async function deleteProductById(productId) {
  try {
    return await axios.delete(`${API_URL}/products/${productId}`);
  } catch (e)  {
    console.log(e);
  }
}

export async function getProductById(productId) {
  try {
    return await axios.get(`${API_URL}/products/${productId}`);
  } catch (e)  {
    console.log(e);
  }
}

export async function getUserById(userId) {
  try {
    return await axios.get(`${API_URL}/users/${userId}`);
  } catch (e)  {
    console.log(e);
  }
}
