async function addActor() {
    const name = document.getElementById('actor').value;
    const age = document.getElementById('age').value;
    const character = document.getElementById('character').value;
    const addResponse = await fetch(`${API_URL}/api/v1/actors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('userToken')
        },
        body: JSON.stringify({
            name,
            age,
            character
        })
    });

    if (addResponse.status === 201) {
        alert('Actor agregado correctamente');
        window.location.replace('./catalogo.html');
    } else {
        alert('No se pudo agregar el actor');
    }
}

async function editActor() {
    const id = document.getElementById('id_actor').value;
    const name = document.getElementById('actor_name').value;
    const age = document.getElementById('actor_age').value;
    const character = document.getElementById('actor_character').value;
    const editResponse = await fetch(`${API_URL}/api/v1/actors/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('userToken')
        },
        body: JSON.stringify({
            name,
            age,
            character
        })
    });

    if (editResponse.status === 200) {
        alert('Actor editado correctamente');
        window.location.replace('./catalogo.html');
    } else {
        alert('No se pudo editar el actor');
    }
}