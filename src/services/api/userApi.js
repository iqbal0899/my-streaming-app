import axiosApi from "./axiosApi";

// Semua request di bawah otomatis pakai baseURL dari VITE_API_BASE_URL

function toErrorMessage(err) {
  const backendMessage = err.response?.data?.message;
  return new Error(backendMessage || err.message || "Terjadi kesalahan, coba lagi.");
}

export async function getUsers() {
  try {
    const res = await axiosApi.get("/users");
    return res.data;
  } catch (err) {
    throw toErrorMessage(err);
  }
}

export async function getUserById(id) {
  try {
    const res = await axiosApi.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    throw toErrorMessage(err);
  }
}

// data: { nama, email, password, foto_profile }
export async function createUser(userData) {
    try {
        const response = await axiosApi.post(
            "/users",
            userData
        );

        return response.data;

    } catch (err) {

        console.error(
            "CREATE USER ERROR:",
            err.response?.data
        );

        console.error(
            "STATUS:",
            err.response?.status
        );

        console.error(
            "FULL ERROR:",
            err
        );

        throw toErrorMessage(err);
    }
}

export async function updateUser(id, data) {
  try {
    const res = await axiosApi.put(`/users/${id}`, data);
    return res.data;
  } catch (err) {
    throw toErrorMessage(err);
  }
}

export async function patchUser(id, data) {
    try {
        const res = await axiosApi.patch(
            `/users/${id}`,
            data
        );

        return res.data;

    } catch (err) {
        throw toErrorMessage(err);
    }
}

export async function deleteUser(id) {
  try {
    const res = await axiosApi.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    throw toErrorMessage(err);
  }
}

// Login divalidasi di SERVER (password tidak pernah dikirim ke browser
// lewat getUsers()), lewat endpoint khusus POST /users/login.
export async function loginUser(data) {
    try {
        const response = await axiosApi.post("/users/login", data);

        return response.data;
    } catch (err) {
        const backendMessage = err.response?.data?.message;

        throw new Error(
            backendMessage || err.message || "Login gagal", { cause: err }
        );
        }
}


export async function forgotPassword(email) {
    try {
        const response = await axiosApi.post(
            "/users/forgot-password",
            {
                email
            }
        );

        return response.data;

    } catch (err) {
        throw toErrorMessage(err);
    }
}

export async function checkEmail(email) {
    try {
        const response = await axiosApi.get("/users/check-email", {
            params: {
                email
            }
        });

        return response.data;

    } catch (err) {
        throw toErrorMessage(err);
    }
}

export async function verifyEmail(token) {
    try {
        const response = await axiosApi.get(
            `/users/verify-email/${token}`
        );

        return response.data;

    } catch (err) {
        throw toErrorMessage(err);
    }
}

export async function getMyProfile() {
  try {
    const response = await axiosApi.get("/users/profile");

    return response.data;
  } catch (err) {
    throw toErrorMessage(err);
  }
}

export async function uploadProfilePhoto(file) {
  try {
    const formData = new FormData();
    formData.append("foto_profile", file);
 
    const response = await axiosApi.post("/users/profile/photo", formData, {
      // PENTING: jangan set "Content-Type": "application/json" untuk request ini.
      // Kalau instance axiosApi kamu punya default header JSON secara global,
      // override di sini supaya axios otomatis set multipart/form-data + boundary.
      headers: { "Content-Type": "multipart/form-data" },
    });
 
    return response.data; // -> { message, foto_profile }
  } catch (err) {
    console.error("UPLOAD ERROR:", err.response?.data);
    console.error("STATUS:", err.response?.status);
    console.error("URL:", err.config?.url);
 
    throw toErrorMessage(err);
  }
}

