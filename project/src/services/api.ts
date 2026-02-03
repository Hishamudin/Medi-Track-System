import axios from 'axios';

// Create axios instance with base URL
export const api = axios.create({
  // In production, this would point to your backend API
  baseURL: 'https://api.meditrack.example/v1',
});

// For demo purposes, implement response interceptor to simulate API calls
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if this is a real error or a simulated one
    if (error.config && error.config.url) {
      // Mock responses for different endpoints
      console.log(`Mocking response for: ${error.config.url}`);
      
      // Mock login response
      if (error.config.url.includes('/auth/login')) {
        return Promise.resolve({
          data: {
            token: 'mock-jwt-token',
            user: {
              id: '1',
              name: 'Admin User',
              email: 'admin@meditrack.com',
              role: 'admin',
            },
          },
        });
      }
      
      // If no mock implemented, return the original error
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

// API functions for authentication
export const authApi = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  getCurrentUser: () => api.get('/auth/me'),
};

// API functions for patients
export const patientsApi = {
  getAll: (params?: any) => api.get('/patients', { params }),
  
  getById: (id: string) => api.get(`/patients/${id}`),
  
  create: (data: any) => api.post('/patients', data),
  
  update: (id: string, data: any) => api.put(`/patients/${id}`, data),
  
  delete: (id: string) => api.delete(`/patients/${id}`),
  
  getMedicalRecords: (patientId: string) => 
    api.get(`/patients/${patientId}/medical-records`),
    
  addMedicalRecord: (patientId: string, data: any) => 
    api.post(`/patients/${patientId}/medical-records`, data),
};

// API functions for appointments
export const appointmentsApi = {
  getAll: (params?: any) => api.get('/appointments', { params }),
  
  getById: (id: string) => api.get(`/appointments/${id}`),
  
  create: (data: any) => api.post('/appointments', data),
  
  update: (id: string, data: any) => api.put(`/appointments/${id}`, data),
  
  delete: (id: string) => api.delete(`/appointments/${id}`),
  
  getAvailableSlots: (doctorId: string, date: string) => 
    api.get('/appointments/available-slots', { 
      params: { doctorId, date } 
    }),
};

// API functions for reports
export const reportsApi = {
  generatePatientSummary: (patientId: string) => 
    api.get(`/reports/patient-summary/${patientId}`),
    
  generateTreatmentReport: (patientId: string, treatmentId: string) => 
    api.get(`/reports/treatment/${patientId}/${treatmentId}`),
    
  getAnalytics: (params?: any) => api.get('/reports/analytics', { params }),
};

// API functions for users
export const usersApi = {
  getAll: (params?: any) => api.get('/users', { params }),
  
  getById: (id: string) => api.get(`/users/${id}`),
  
  create: (data: any) => api.post('/users', data),
  
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  
  delete: (id: string) => api.delete(`/users/${id}`),
};