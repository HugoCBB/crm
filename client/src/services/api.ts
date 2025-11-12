
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  roles: 'ADMIN' | 'USER';
  create_date: string;
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  create_date: string;
  user_id: number;
}

export interface Payment {
  id: number;
  value: number;
  type: 'BOLETO' | 'CARTAO' | 'AVISTA' | 'PIX';
  create_date: string;
  final_date: string;
  status: 'PENDENTE' | 'VENCIDO' | 'PAGO';
  leads_id: number;
}


async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}


export const leadsApi = {
  getAll: () => fetchApi<Lead[]>('/leads'),
  
  getById: (id: number) => fetchApi<Lead>(`/leads/${id}`),
  
  create: (lead: Omit<Lead, 'id' | 'create_date'>) => 
    fetchApi<Lead>('/leads/', {
      method: 'POST',
      body: JSON.stringify(lead),
    }),
  
  update: (id: number, lead: Partial<Lead>) =>
    fetchApi<Lead>(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(lead),
    }),
  delete: (id: number) =>
    fetchApi<void>(`/leads/${id}`, {
      method: 'DELETE',
    }),
};

// API de Pagamentos
export const paymentsApi = {
  getAll: () => fetchApi<Payment[]>('/payments'),
  getById: (id: number) => fetchApi<Payment>(`/payments/${id}`),
  create: (payment: Omit<Payment, 'id' | 'create_date'>) =>
    fetchApi<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    }),
  update: (id: number, payment: Partial<Payment>) =>
    fetchApi<Payment>(`/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payment),
    }),
  delete: (id: number) =>
    fetchApi<void>(`/payments/${id}`, {
      method: 'DELETE',
    }),
};

// API de Usuários
export const usersApi = {
  getAll: () => fetchApi<User[]>('/users'),
  getById: (id: number) => fetchApi<User>(`/users/${id}`),
  create: (user: Omit<User, 'id' | 'create_date'>) =>
    fetchApi<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),
  update: (id: number, user: Partial<User>) =>
    fetchApi<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    }),
  delete: (id: number) =>
    fetchApi<void>(`/users/${id}`, {
      method: 'DELETE',
    }),
};

// API de Estatísticas
export const statsApi = {
  getDashboard: () => fetchApi<{
    usersCount: number;
    leadsCount: number;
    totalRevenue: number;
    pendingPayments: number;
  }>('/stats/dashboard'),
};
