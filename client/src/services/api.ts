const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
import axios from "axios";

export interface Lead {
  id: number;
  name: string;
  phone: string;
  create_date: string;

}

export interface User {
  name: string,
  email: string,
  password: string,
  phone: string
}

export interface LoginResponse {
  status: string;
  token: string;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken")
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config
}, (error) => {
  return Promise.reject(error)
})

export const userApi = {
  login: async (user: Pick<User, 'email' | 'password'>): Promise<LoginResponse> => {
    const response = await api.post('/users/login', user)
    return response.data
  }
}

export const leadsApi = {
  getAll: async (): Promise<Lead[]> => {
    const res = await api.get<Lead[]>("/leads/");
    return res.data;
  },

  create: async (lead: Omit<Lead, "id" | "create_date">): Promise<Lead> => {
    const res = await api.post<Lead>("/leads/", lead);
    return res.data;
  },

};

// API de Pagamentos
// export const paymentsApi = {
//   getAll: () => fetchApi<Payment[]>('/payments'),
//   getById: (id: number) => fetchApi<Payment>(`/payments/${id}`),
//   create: (payment: Omit<Payment, 'id' | 'create_date'>) =>
//     fetchApi<Payment>('/payments', {
//       method: 'POST',
//       body: JSON.stringify(payment),
//     }),
//   update: (id: number, payment: Partial<Payment>) =>
//     fetchApi<Payment>(`/payments/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(payment),
//     }),
//   delete: (id: number) =>
//     fetchApi<void>(`/payments/${id}`, {
//       method: 'DELETE',
//     }),
// };

// // API de Usuários
// export const usersApi = {
//   getAll: () => fetchApi<User[]>('/users'),
//   getById: (id: number) => fetchApi<User>(`/users/${id}`),
//   create: (user: Omit<User, 'id' | 'create_date'>) =>
//     fetchApi<User>('/users', {
//       method: 'POST',
//       body: JSON.stringify(user),
//     }),
//   update: (id: number, user: Partial<User>) =>
//     fetchApi<User>(`/users/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(user),
//     }),
//   delete: (id: number) =>
//     fetchApi<void>(`/users/${id}`, {
//       method: 'DELETE',
//     }),
// };

export const statsApi = {
  getDashboard: () => api.get('/status/dashboard').then(r => r.data)
};
