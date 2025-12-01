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

export interface Payment {
  id: number;
  value: number;
  type: string;
  status: string;
  final_date: string;
  create_date: string;
  leads_id: number;
  lead?: Lead;
}

export const paymentsApi = {
  getAll: async (): Promise<Payment[]> => {
    const res = await api.get<Payment[]>("/payment/");
    return res.data;
  },

  create: async (payment: Omit<Payment, "id" | "create_date">): Promise<Payment> => {
    const res = await api.post<Payment>("/payment/", payment);
    return res.data;
  },

  update: async (id: number, payment: Partial<Payment>): Promise<Payment> => {
    const res = await api.put<Payment>(`/payment/${id}`, payment);
    return res.data;
  },
};

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

export interface Schedule {
  id: number;
  lead_id: number;
  date: string;
  description: string;
  user_id: number;
  lead?: Lead;
}

export const schedulesApi = {
  getAll: async (): Promise<Schedule[]> => {
    const res = await api.get<Schedule[]>("/schedules/");
    return res.data;
  },
  create: async (schedule: Omit<Schedule, "id" | "user_id" | "lead">): Promise<Schedule> => {
    const res = await api.post<Schedule>("/schedules/", schedule);
    return res.data;
  }
};

export const statsApi = {
  getDashboard: () => api.get('/status/dashboard').then(r => r.data)
};
