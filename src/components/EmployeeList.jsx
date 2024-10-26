import React, { useState } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import EmployeeForm from './EmployeeModal';

const EmployeeList = () => {
    const { employees, deleteEmployee } = useEmployee();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [emp, setCurrentEmp] = useState(null);

    const openModal = (emp = null) => {
        setCurrentEmp(emp);
        setIsFormOpen(true);
    };

    return (
        <div style={{marginLeft:'10px', marginRight:'10px'}}>
            <h1>Employee List</h1>
            <button onClick={() => openModal()}>Add Employee</button>
            <div >
                {employees.length === 0 ? (
                    <p>No employees found, add more employees using the Add Employee Button</p>
                ) : (
                    employees.map((employee) => (
                        <div key={employee.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                            <h3><strong>Name:</strong>{employee.name}</h3>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Date of Birth:</strong> {employee.dob || 'N/A'}</p>
                            <p><strong>Address:</strong> {employee.address || 'N/A'}</p>
                            {employee.photo && (
                                <div>
                                    <strong>Photo:</strong>
                                    <img src={URL.createObjectURL(employee.photo)} alt={employee.name} style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '5px' }} />
                                </div>
                            )}
                            <button onClick={() => openModal(employee)}>Edit</button>
                            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
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
