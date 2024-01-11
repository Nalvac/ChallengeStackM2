import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getTransactions() {
  try {
    const response = await axios.get(`${API_URL}/customer_transactions`);
    return response.data;
  } catch (e)
  {
    console.log(e);
  }
}

export async function addTransactions(quantity, deliveryDate, productBatchId, userId) {
  try {
    return await axios.post(`${API_URL}/customer_transactions`, JSON.stringify({
      quantity: quantity,
      deliveryDate: deliveryDate,
      productBatch: `/api/product_batches/${productBatchId}`,
      user: `/api/users/${userId}`,
    }), {headers: {
        "Content-Type" : "application/json",
      }});
  } catch (e) {
    console.log(e);
  }
}

export async function updateTransactions(quantity, deliveryDate, productBatchId, userId, transactionId) {
  try {
    console.log(quantity);
    console.log(deliveryDate);
    console.log(productBatchId);
    console.log(userId);
    console.log(transactionId);
    return await axios.put(`${API_URL}/customer_transactions/${transactionId}`, JSON.stringify({
      quantity: quantity,
      deliveryDate: deliveryDate,
      productBatch: productBatchId,
      user: userId,
    }), {headers: {
        "Content-Type" : "application/json",
      }});
  } catch (e) {
    console.log(e);
  }
}

export async function deleteTransactionById(transactionId) {
  try {
    return await axios.delete(`${API_URL}/customer_transactions/${transactionId}`);
  } catch (e)  {
    console.log(e);
  }
}
