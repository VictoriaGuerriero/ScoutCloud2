# Como correr y probar la aplicación

API para gestionar usuarios, scouts y eventos en una aplicación scout, ejecutada con Docker y probada mediante test.rest.

Ejecutar la aplicacion:

    docker-compose up --build


### Obtener todos los usuarios
GET http://localhost:13000/users

### Obtener todos los eventos
GET http://localhost:13000/events

### Obtener todos los scouts
GET http://localhost:13000/scouts

##

### Ejecutar cada solicitud en orden, reemplazando {{userId}}, {{eventId}}, y {{scoutId}} con los valores que obtengas en cada respuesta.

### 1. Configurar la Base de Datos (Crear Tablas)
GET http://localhost:13000/setup

### 2. Crear un Usuario
POST http://localhost:13000/users
Content-Type: application/json

    {
        "fullname": "Juan Pérez",
        "email": "juan.perez@example.com",
        "password": "securepassword",
        "phone_number": "123456789",
        "emergency_contact_fullname": "Maria Lopez",
        "emergency_contact_phone": "987654321"
    }

### 3. Crear un Scout Asociado a un Usuario
POST http://localhost:13000/users/{{userId}}/scouts
Content-Type: application/json

    {
        "full_name": "Scout Nombre",
        "unit": "Exploradores",
        "grade": "Tercero",
        "birthdate": "2010-05-12"
    }

### 4. Crear un Evento
POST http://localhost:13000/events
Content-Type: application/json

    {
        "title": "Campamento de Verano",
        "description": "Campamento anual para exploradores",
        "unit": "Unidad de Exploradores",
        "date": "2024-07-15",
        "location": "Bosque Nacional",
        "organizer_id": {{userId}}
    }

### 5. Inscribir un Scout en un Evento
POST http://localhost:13000/events/{{eventId}}/scouts/{{scoutId}}
Content-Type: application/json


### 6. Obtener Eventos en los que un Scout Está Inscrito
GET http://localhost:13000/scouts/{{scoutId}}/events
