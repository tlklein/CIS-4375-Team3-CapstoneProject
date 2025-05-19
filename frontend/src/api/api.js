// This file contains all API calls to the API endpoints
import axios from "axios";

// Create HTTP client with the base URL, and specify that the data sent in the request body is JSON
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ROOT_API, // Use the baseURL dynamically from the environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("VITE_ROOT_API:", import.meta.env.VITE_ROOT_API); // Log the base URL for debugging

// BARBER API CALLS

// Get all barbers
export const getAllBarbers = async () => {
  try {
    const response = await apiClient.get('/api/barbers'); // Fetch all barbers
    return response.data;
  } catch (error) {
    console.error('Error fetching barbers:', error);
    throw error;
  }
};

// Create a new barber
export const createBarber = async (barberData) => {
  try {
    const response = await apiClient.post('/api/barbers', barberData); // Create a new barber
    return response.data;
  } catch (error) {
    console.error('Error creating barber:', error);
    throw error;
  }
};

// Update a barber by ID
export const updateBarber = async (barberId, barberData) => {
  try {
    const response = await apiClient.put(`/api/barbers/${barberId}`, barberData); // Update barber details
    return response.data;
  } catch (error) {
    console.error('Error updating barber:', error);
    throw error;
  }
};

// Delete a barber by ID
export const deleteBarber = async (barberId) => {
  try {
    const response = await apiClient.delete(`/api/barbers/${barberId}`); // Delete a barber
    return response.data;
  } catch (error) {
    console.error('Error deleting barber:', error);
    throw error;
  }
};


// SERVICE API CALLS

// Get all services
export const getAllServices = async () => {
  try {
    const response = await apiClient.get('/api/services'); // Fetch all services
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Create a new service
export const createService = async (serviceData) => {
  try {
    const response = await apiClient.post('/api/services', serviceData); // Create a new service
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

// Update a service by ID
export const updateService = async (serviceId, serviceData) => {
  try {
    const response = await apiClient.put(`/api/services/${serviceId}`, serviceData); // Update service details
    return response.data;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

// Delete a service by ID
export const deleteService = async (serviceId) => {
  try {
    const response = await apiClient.delete(`/api/services/${serviceId}`); // Delete a service
    return response.data;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// USERS API CALLS

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/api/users'); // Fetch all users
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/api/users', userData); // Create a new user
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update a user by ID
export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/api/users/${userId}`, userData); // Update user details
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/api/users/${userId}`); // Delete a user
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// APPOINTMENTS API CALLS

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const response = await apiClient.get('/api/appointments'); // Fetch all appointments
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  try {
    const response = await apiClient.post('/api/appointments', appointmentData); // Create a new appointment
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Update an appointment by ID
export const updateAppointment = async (appointmentid, appointmentData) => {
  try {
    const response = await apiClient.put(`/api/appointments/${appointmentid}`, appointmentData); // Update appointment details
    return response.data;
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

// Delete an appointment by ID
export const deleteAppointment = async (appointmentid) => {
  try {
    const response = await apiClient.delete(`/api/appointments/${appointmentid}`); // Delete an appointment
    return response.data;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

// CUSTOMERS API CALLS

// Get all customers
export const getAllCustomers = async () => {
  try {
    const response = await apiClient.get('/api/customers'); // Fetch all customers
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Create a new customer
export const createCustomer = async (customerData) => {
  try {
    const response = await apiClient.post('/api/customers', customerData); // Create a new customer
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

// Update a customer by ID
export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await apiClient.put(`/api/customers/${customerId}`, customerData); // Update customer details
    return response.data;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

// Delete a customer by ID
export const deleteCustomer = async (customerId) => {
  try {
    const response = await apiClient.delete(`/api/customers/${customerId}`); // Delete a customer
    return response.data;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

// LOGIN API CALL

// User login
export const loginUser = async (loginData) => {
  try {
    console.log('Sending login request with data:', loginData); // Debugging log
    const response = await apiClient.post('/api/login', loginData); // Send login credentials
    console.log('Login response:', response.data); // Debugging log
    return response.data; // Return the token and any additional data
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message); // Debugging log
    throw error;
  }
};




