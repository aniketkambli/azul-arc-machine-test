const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('photo'), async (req, res) => {
    try{
        const { name, age, email, dob, address } = req.body;
        const photo = req.file ? req.file.path : null;
    
        const newEmployee = new Employee({ name, age, email, dob, address, photo });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    }
    catch(e){
        console.log(e);
    }

});

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            return res.status(404).send('File not found');
        }

        res.sendFile(filePath);
    });
});

router.put('/:id', upload.single('photo'), async (req, res) => {
    const { name, age, email, dob, address } = req.body;
    const photo = req.file ? req.file.path : null;

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { name, age, email, dob, address, photo }, { new: true });
    res.json(updatedEmployee);
});

router.delete('/:id', async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
