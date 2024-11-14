const express = require('express');
const pool = require('./db');
const port = 3000;

const app = express();
app.use(express.json());

//routes

// USERS
app.get('/users', async (req, res) => {
    try{
        const data = await pool.query('SELECT * FROM users');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

app.post('/users', async (req,res) => {
    const { fullname, email, password, phone_number, emergency_contact_fullname, emergency_contact_phone } = req.body;
    try{
        await pool.query('INSERT INTO users (fullname, email, password, phone_number, emergency_contact_fullname, emergency_contact_phone) VALUES ($1, $2, $3, $4, $5, $6)', [fullname, email, password, phone_number, emergency_contact_fullname, emergency_contact_phone]);
        res.status(200).send('User added successfully');
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

// SCOUTS

app.get('/scouts', async (req, res) => {
    try{
        const data = await pool.query('SELECT * FROM scouts');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

// Crear un nuevo Scout para un Usuario
app.post('/users/:userId/scouts', async (req, res) => {
    const { userId } = req.params;
    const { full_name, unit, grade, birthdate } = req.body;

    try {
        await pool.query(
            'INSERT INTO scouts (full_name, unit, grade, birthdate, user_id) VALUES ($1, $2, $3, $4, $5)',
            [full_name, unit, grade, birthdate, userId]
        );
        res.status(200).send('Scout created successfully');
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Inscribir un Scout en un Evento

app.post('/events/:eventId/scouts/:scoutId', async (req, res) => {
    const { eventId, scoutId } = req.params;

    try {
        await pool.query(
            'INSERT INTO event_scouts (event_id, scout_id) VALUES ($1, $2)',
            [eventId, scoutId]
        );
        res.status(200).send('Scout registered for the event successfully');
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


// Listar Eventos en los que un Scout Está Inscrito
app.get('/scouts/:scoutId/events', async (req, res) => {
    const { scoutId } = req.params;

    try {
        const result = await pool.query(`
            SELECT events.* 
            FROM events
            INNER JOIN event_scouts ON events.id = event_scouts.event_id
            WHERE event_scouts.scout_id = $1
        `, [scoutId]);

        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// EVENTS

app.post('/events', async (req, res) => {
    const { title, description, unit, date, location, organizer_id } = req.body;

    try {
        await pool.query(
            `INSERT INTO events (title, description, unit, date, location, organizer_id) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [title, description, unit, date, location, organizer_id]
        );
        res.status(201).send('Event created successfully');
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/events', async (req, res) => {
    try{
        const data = await pool.query('SELECT * FROM events');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

// SETUP
app.get('/setup', async (req, res) => {
    try {
        await pool.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                fullname VARCHAR(255),
                email VARCHAR(255),
                password VARCHAR(225),
                phone_number VARCHAR(355),
                emergency_contact_fullname VARCHAR(255),
                emergency_contact_phone VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE events (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title VARCHAR(255),
                description TEXT,
                unit VARCHAR(255),
                date DATE,
                location VARCHAR(255),
                organizer_id INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE SET NULL
            );
        `);

        await pool.query(`
            CREATE TABLE scouts (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                full_name VARCHAR(120),
                unit VARCHAR(255),
                grade VARCHAR(255),
                birthdate DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INTEGER,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        await pool.query(`
            CREATE TABLE event_scouts (
                event_id UUID,
                scout_id UUID,
                PRIMARY KEY (event_id, scout_id),
                FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
                FOREIGN KEY (scout_id) REFERENCES scouts(id) ON DELETE CASCADE
            );
        `);

        res.status(200).send('Tables created successfully');
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});



app.listen(port, () => console.log('Server has started on port ' + port));