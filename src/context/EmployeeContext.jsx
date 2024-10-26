import React, { createContext, useContext, useState, useEffect } from 'react';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../api/employees';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const data = await getEmployees();
            setEmployees(data);
        };
        fetchEmployees();
    }, []);

    const handleAddEmployee = async (employeeData) => {
        const newEmployee = await addEmployee(employeeData);
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    };

    const handleUpdateEmployee = async (id, employeeData) => {
        const updatedEmployee = await updateEmployee(id, employeeData);
        setEmployees((prevEmployees) => 
            prevEmployees.map((employee) => 
                employee.id === id ? updatedEmployee : employee
            )
        );
    };

    const handleDeleteEmployee = async (id) => {
        await deleteEmployee(id);
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    };

    return (
        <EmployeeContext.Provider value={{ employees, handleAddEmployee, handleUpdateEmployee, handleDeleteEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployee = () => useContext(EmployeeContext);
