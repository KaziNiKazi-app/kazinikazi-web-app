import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  registerUser: (data) => api.post('/auth/register/user', data),
  registerEmployer: (data) => api.post('/auth/register/employer', data),
  refreshToken: (data) => api.post('/auth/refresh', data),
};

export const jobsAPI = {
  getJobs: (params = {}) => api.get('/jobs', { params }),
  searchJobs: (params) => api.get('/jobs/search', { params }),
  getJob: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post('/jobs', data),
  updateJob: (id, data) => api.patch(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  getMyJobs: (params = {}) => api.get('/jobs/employer/my-jobs', { params }),
  getCategories: () => api.get('/jobs/categories/list'),
  getDistricts: () => api.get('/jobs/districts/list'),
};

export default api;