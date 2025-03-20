require('dotenv').config();
const express = require('express');
const customerRoutes = require('./routes/customerRoutes');
const connectToDatabase = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


(async () => {
    try {
        const connection = await connectToDatabase();
        
        const sql = `CREATE TABLE IF NOT EXISTS customers (
            id INT AUTO_INCREMENT PRIMARY KEY, 
            name VARCHAR(255),
            address VARCHAR(255)
        )`;
        await connection.query(sql);
        
        await connection.end();
    } catch (error) {
        console.error(" Database setup failed:", error);
    }
})();


// app.use('/customers', customerRoutes);

// app.get('/', (req, res) => {
//     res.send(' Server is running');
// });

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
