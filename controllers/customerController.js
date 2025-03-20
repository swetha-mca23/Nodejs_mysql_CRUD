const connectToDatabase = require('../config/db');

const executeQuery = async (query, params = []) => {
    const db = await connectToDatabase();
    const [result] = await db.query(query, params);
    db.end();
    return result;
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await executeQuery("SELECT * FROM customers");
        res.json(customers);
    } catch {
        res.status(500).json({ error: "Database error" });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await executeQuery("SELECT * FROM customers WHERE id = ?", [req.params.id]);
        res.json(customer[0] || { message: "Customer not found" });
    } catch {
        res.status(500).json({ error: "Database error" });
    }
};

exports.createCustomer = async (req, res) => {
    try {
        const { name, address } = req.body;
        if (!name || !address) return res.status(400).json({ error: "Name and address required" });

        const result = await executeQuery("INSERT INTO customers (name, address) VALUES (?, ?)", [name, address]);
        res.json({ id: result.insertId, name, address });
    } catch {
        res.status(500).json({ error: "Database error" });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const { name, address } = req.body;
        if (!name || !address) return res.status(400).json({ error: "Name and address required" });

        await executeQuery("UPDATE customers SET name = ?, address = ? WHERE id = ?", [name, address, req.params.id]);
        res.json({ message: "Customer updated" });
    } catch {
        res.status(500).json({ error: "Database error" });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        await executeQuery("DELETE FROM customers WHERE id = ?", [req.params.id]);
        res.json({ message: "Customer deleted" });
    } catch {
        res.status(500).json({ error: "Database error" });
    }
};
