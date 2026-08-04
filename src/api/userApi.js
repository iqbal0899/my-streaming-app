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

// Simpan/ubah status langganan user ke MockAPI.
// `subscription` bisa berupa objek paket (mis. { id, name, price, ... }) atau null kalau belum berlangganan.
export async function updateSubscription(id, subscription) {
  const res = await axiosApi.put(`/users/${id}`, { subscription });
  return res.data;
}

export async function deleteUser(id) {
  await axiosApi.delete(`/users/${id}`);
}