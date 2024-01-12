import axios from 'axios';

const API_URL = "https://localhost:8000/api";


export async function getProductBatch() {
  try {
    const response = await axios.get(`${API_URL}/product_batches`);
    const productBatches = response.data;

    return productBatches.map(batch => ({
      id: batch.id,
      dateExp: batch.dateExp.split("T")[0],
      quantity: batch.quantity,
      brand: batch.product?.name,
      name: batch.user?.name,
    }));

  } catch (e) {
    console.log(e);
  }
}


export async function addProductBatch(addProduct) {
  const productBash = {
    dateExp: addProduct.dateExp,
    quantity: addProduct.batchStock,
    product: '/api/products/2',
    user: '/api/users/2'
  }
  try {
    return await axios.post(`${API_URL}/product_batches`, JSON.stringify(productBash), {headers: {
        "Content-Type" : "application/json",
      }});
  } catch (e) {
    console.log(e);
  }
}

export async function updateProductBatch(productId, updatedProduct) {

  const productBash = {
    dateExp: updatedProduct.dateExp,
    quantity: updatedProduct.quantity,
    product: '/api/products/2',
    user: '/api/users/2'
  }

  try {
    return await axios.put(`${API_URL}/product_batches/${productId}`, productBash)
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
