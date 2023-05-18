import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.get('/characters', async (req, res) => {
    const [rows] = await connection.query('SELECT * FROM hp_character');
    res.json(rows);
});

app.get('/characters/:id', async (req, res) => {
    const [rows] = await connection.query('SELECT * FROM hp_character WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
        return res.status(404).json({ message: 'Character Not found' });
    }

    res.json(rows);
});

app.get('/wands', async (req, res) => {
    const [rows] = await connection.query('SELECT * FROM wand');
    res.json(rows);
});

app.get('/wands/:id', async (req, res) => {
    const [rows] = await connection.query('SELECT * FROM wand WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
        return res.status(404).json({ message: 'Wand Not found' });
    }

    res.json(rows);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});