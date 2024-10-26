import React, { createContext, useState, useContext } from 'react';

const EmployeeContext = createContext();

export const useEmployee = () => {
    return useContext(EmployeeContext);
};

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    const addEmployee = (employee) => {
        setEmployees((oldEmployees) => [...oldEmployees, employee]);
    };

    const deleteEmployee = (id) => {
        setEmployees((oldEmployees) => oldEmployees.filter((emp) => emp.id !== id));
    };

    const editEmployee = (id, updatedEmployee) => {
        setEmployees((oldEmployees) =>
            oldEmployees.map((emp) => (emp.id === id ? updatedEmployee : emp))
        );
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, deleteEmployee, editEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};
