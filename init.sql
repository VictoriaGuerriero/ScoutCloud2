-- init.sql
CREATE TABLE IF NOT EXISTS users (
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

CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    description TEXT,
    unit VARCHAR(255),
    date DATE,
    location VARCHAR(255),
    organizer_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fullName VARCHAR(120),
    unit VARCHAR(255),
    grade VARCHAR(255),
    birthdate DATE,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla intermedia para la relación Many-to-Many entre events y scouts
CREATE TABLE IF NOT EXISTS event_scouts (
    event_id UUID REFERENCES events(id),
    scout_id UUID REFERENCES scouts(id),
    PRIMARY KEY (event_id, scout_id)
);

-- Datos de prueba
INSERT INTO users (fullname, email, password, phone_number, emergency_contact_fullname, emergency_contact_phone)
VALUES ('John Doe', 'johndoe@example.com', 'password123', '1234567890', 'Jane Doe', '0987654321');
