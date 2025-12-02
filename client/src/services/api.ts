
import { getToken } from "@/lib/auth";

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
  baseURL: import.meta.env.VITE_API_URL || "https://crm-api-2-fmay.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const CACHE_PREFIX = 'api_cache_';
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes



api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  if (config.method === "get") {
    const key = CACHE_PREFIX + config.url!;
    const cachedItem = localStorage.getItem(key);

    if (cachedItem) {
      const cached = JSON.parse(cachedItem);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return Promise.reject({
          __fromCache: true,
          data: cached.data
        });
      }
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use(
  (response) => {
    if (response.config.method === "get") {
      const key = CACHE_PREFIX + response.config.url!;
      localStorage.setItem(key, JSON.stringify({
        data: response.data,
        timestamp: Date.now()
      }));
    }
    return response;
  },
  (error) => {
    if (error.__fromCache) {
      return Promise.resolve({ data: error.data });
    }
    return Promise.reject(error);
  }
);

export const userApi = {
  login: async (user: Pick<User, 'email' | 'password'>): Promise<LoginResponse> => {
    const response = await api.post('/users/login', user)
    return response.data
  },
  register: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post('/users/register', user)
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
