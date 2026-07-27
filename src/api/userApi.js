const BASE_URL = "https://6a603507b1933e9d25fcf2ee.mockapi.io/users";

export async function getUsers() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

export async function createUser(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function updateUser(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function deleteUser(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}