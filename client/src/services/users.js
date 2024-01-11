import axios from "axios";

const API_URL = "http://localhost:8000/api";

export async function getUsers() {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (e)
  {
    console.log(e);
  }
}

export async function addUser(name, mail, phone, zip_code, city, land, address, password, roleId) {
  console.log(name, mail, phone, zip_code, city, land, address, password, roleId);
  try {
    return await axios.post(`${API_URL}/users`, JSON.stringify({
      name: name,
      mail: mail,
      phone: phone,
      zip_code: zip_code,
      city: city,
      land: land,
      adress: address,
      password: password,
      roles: `/api/roles/${roleId}`,
    }), {headers: {
        "Content-Type" : "application/json",
      }});
  } catch (e) {
    console.log(e);
  }
}

export async function updateUser(name, mail, phone, zip_code, city, land, address, password, roleId, userId) {
  console.log(name, mail, phone, zip_code, city, land, address, password, `/api/roles/${roleId}`);
  try {
    return await axios.put(`${API_URL}/users/${userId}`, JSON.stringify({
      name: name,
      mail: mail,
      phone: phone,
      zip_code: zip_code,
      city: city,
      land: land,
      adress: address,
      password: password,
      roles: `/api/roles/${roleId}`,
    }), {headers: {
        "Content-Type" : "application/json",
      }});
  } catch (e) {
    console.log(e);
  }
}

export async function deleteUserById(userId) {
  try {
    return await axios.delete(`${API_URL}/users/${userId}`);
  } catch (e)  {
    console.log(e);
  }
}
