import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// Chat API
export const chatAPI = {
  sendMessage: (text, sessionId) => api.post('/chat/message', { text, sessionId }),
  getSession: (sessionId) => api.get(`/chat/session/${sessionId}`),
  getSessions: () => api.get('/chat/sessions'),
  getMetrics: () => api.get('/chat/metrics')
};

export default api;