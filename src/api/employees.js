import axios from 'axios';

const API_URL = 'https://accursed-spirit-9jgvvwq4493pgqr-5000.app.github.dev/api/employees';


export const getEmployees = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addEmployee = async (employeeData) => {
    const response = await axios.post(API_URL, employeeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin' : '*'
        },
    });
    return response.data;
};

export const updateEmployee = async (id, employeeData) => {
    const response = await axios.put(`${API_URL}/${id}`, employeeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin' : '*'
        },
    });
    return response.data;
};

export const deleteEmployee = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};