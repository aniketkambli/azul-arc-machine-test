import React, { useState, useEffect } from 'react';
import { useEmployee } from '../context/EmployeeContext';


const EmployeeForm = ({ employee, closeModal }) => {
    const { handleAddEmployee, handleUpdateEmployee } = useEmployee();
    const [empFormInfo, setEmpFormInfo] = useState({
        _id: '',
        name: '',
        email: '',
        dob: '',
        address: '',
        photo: null,
    });
    
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (employee) {
            setEmpFormInfo(employee);
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setEmpFormInfo({
            ...empFormInfo,
            [name]: name === 'photo' ? files[0] : value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!empFormInfo.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(empFormInfo.name)) {
            newErrors.name = 'Name can only contain letters and spaces';
        }

        if (!empFormInfo.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(empFormInfo.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (empFormInfo.photo && !empFormInfo.photo.type.startsWith('image/')) {
            newErrors.photo = 'Selected file must be an image';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                if (employee) {
                    await handleUpdateEmployee(employee._id, empFormInfo);
                } else {
                    await handleAddEmployee(empFormInfo);
                }
                closeModal(); 
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{employee ? `Editing ${empFormInfo.name}` : 'Add Employee'}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={empFormInfo.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            type="text" 
                            name="email"
                            value={empFormInfo.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div>
                        <input
                            type="date"
                            name="dob"
                            value={empFormInfo.dob}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <textarea
                            name="address"
                            value={empFormInfo.address}
                            onChange={handleChange}
                            placeholder="Address"
                        />
                    </div>

                    <div>
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleChange}
                        />
                        {errors.photo && <p className="error">{errors.photo}</p>}
                    </div>

                    <div>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
