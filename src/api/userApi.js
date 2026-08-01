import axiosApi from './axiosApi';


export async function getUsers() {
  const res = await axiosApi.get('/users');

  if (!Array.isArray(res.data)) {
    console.error('Expected an array from /users but got:', res.data);
    throw new Error('Data user tidak valid. Cek endpoint API (/users) di MockAPI.');
  }

  return res.data;
}

export async function createUser(data) {
  const res = await axiosApi.post('/users', data);
  return res.data;
}

export async function updateUser(id, data) {
  const res = await axiosApi.put(`/users/${id}`, data);
  return res.data;
}

export async function deleteUser(id) {
  await axiosApi.delete(`/users/${id}`);
}