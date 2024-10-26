const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' })); 
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
