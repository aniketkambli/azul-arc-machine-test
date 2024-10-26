import React, { useState } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import EmployeeForm from './EmployeeModal';
import API_URL from '../api/url';



const EmployeeList = () => {
    const { employees, handleDeleteEmployee } = useEmployee();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [emp, setCurrentEmp] = useState(null);

    const openModal = (emp = null) => {
        setCurrentEmp(emp);
        setIsFormOpen(true);
    };


    return (
        <div style={{ marginLeft: '10px', marginRight: '10px' }}>
            <h1>Employee List</h1>
            <button onClick={() => openModal()}>Add Employee</button>
            <div >
                {employees.length === 0 ? (
                    <p>No employees found, add more employees using the Add Employee Button</p>
                ) : (
                    employees.map((employee) => (
                        <div key={employee._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                            <h3><strong>Name:</strong>{employee.name}</h3>
                            <p><strong>Age:</strong> {employee.age}</p>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Date of Birth:</strong> {employee.dob || 'N/A'}</p>
                            <p><strong>Address:</strong> {employee.address || 'N/A'}</p>
                            {employee.photo ? (
                                <img
                                    src={`${API_URL}/${employee.photo}`}
                                    alt={employee.name}
                                    style={{ width: '100px', height: '100px' }}
                                />
                            ) : (
                                <p>No photo available</p>
                            )}
                            <br/>
                            <button onClick={() => openModal(employee)}>Edit</button>
                            <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
            {isFormOpen && (
                <EmployeeForm
                    employee={emp}
                    closeModal={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
};

export default EmployeeList;
