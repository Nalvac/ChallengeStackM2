import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getCustomerTransaction() {
  try {
    const response = await axios.get(`${API_URL}/customer_transactions`);
    return response.data;
  } catch (e)
  {
    console.log(e);
  }
}

// export async function getRoleById(pathRoleId) {
//   try {
//     const response = await axios.get(`http://localhost:8000${pathRoleId}`);
//     return response.data;
//   } catch (e)
//   {
//     console.log(e);
//   }
// }
//
// export async function addRole(roleName) {
//   try {
//     return await axios.post(`${API_URL}/roles`, JSON.stringify({
//       role: roleName,
//     }), {headers: {
//         "Content-Type" : "application/json",
//       }});
//   } catch (e) {
//     console.log(e);
//   }
// }
//
// export async function updateRole(roleName, roleId) {
//   try {
//     return await axios.put(`${API_URL}/roles/${roleId}`, JSON.stringify({
//       role: roleName,
//     }), {headers: {
//         "Content-Type" : "application/json",
//       }});
//   } catch (e) {
//     console.log(e);
//   }
// }
//
export async function deleteCustomerTransactionById(customerTransactionId) {
  try {
    return await axios.delete(`${API_URL}/customer_transactions/${customerTransactionId}`);
  } catch (e)  {
    console.log(e);
  }
}
