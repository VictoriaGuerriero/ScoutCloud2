const BASE_URL = 'http://localhost:13000';

// Crear usuario
document.getElementById('userForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fullname: event.target.fullname.value,
            email: event.target.email.value,
            password: event.target.password.value,
            phone_number: event.target.phone_number.value,
            emergency_contact_fullname: event.target.emergency_contact_fullname.value,
            emergency_contact_phone: event.target.emergency_contact_phone.value
        })
    });
    document.getElementById('userMessage').textContent = response.ok ? 'Usuario creado exitosamente' : 'Error al crear usuario';
});

// Crear scout
document.getElementById('scoutForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userId = event.target.user_id.value;
    const response = await fetch(`${BASE_URL}/users/${userId}/scouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            full_name: event.target.scout_name.value,
            unit: event.target.scout_unit.value,
            grade: event.target.scout_grade.value,
            birthdate: event.target.scout_birthdate.value
        })
    });
    document.getElementById('scoutMessage').textContent = response.ok ? 'Scout creado exitosamente' : 'Error al crear scout';
});

// Crear evento
document.getElementById('eventForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const response = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: event.target.event_title.value,
            description: event.target.event_description.value,
            unit: event.target.event_unit.value,
            date: event.target.event_date.value,
            location: event.target.event_location.value,
            organizer_id: event.target.organizer_id.value
        })
    });
    document.getElementById('eventMessage').textContent = response.ok ? 'Evento creado exitosamente' : 'Error al crear evento';
});

// Listar eventos
window.onload = async () => {
    const eventsList = document.getElementById('eventsList');
    if (eventsList) {
        const response = await fetch(`${BASE_URL}/events`);
        const events = await response.json();
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.textContent = `Título: ${event.title} - Ubicación: ${event.location}`;
            eventsList.appendChild(eventItem);
        });
    }
};

// Inscribir scout en evento
document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const eventId = event.target.event_id.value;
    const scoutId = event.target.scout_id.value;
    const response = await fetch(`${BASE_URL}/events/${eventId}/scouts/${scoutId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    document.getElementById('registerMessage').textContent = response.ok ? 'Scout inscrito exitosamente' : 'Error al inscribir scout';
});
