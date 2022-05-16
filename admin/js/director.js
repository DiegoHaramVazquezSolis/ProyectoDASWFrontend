async function addDirector() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const addResponse = await fetch(`${API_URL}/api/v1/directors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('userToken')
        },
        body: JSON.stringify({
            name,
            age
        })
    });

    if (addResponse.status === 201) {
        alert('Director agregado correctamente');
        window.location.replace('./catalogo.html');
    } else {
        alert('No se pudo agregar el director');
    }
}

async function editDirector() {
    const id = document.getElementById('id_director').value;
    const name = document.getElementById('director_name').value;
    const age = document.getElementById('director_age').value;
    const editResponse = await fetch(`${API_URL}/api/v1/directors/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('userToken')
        },
        body: JSON.stringify({
            name,
            age
        })
    });

    if (editResponse.status === 200) {
        alert('Director editado correctamente');
        window.location.replace('./catalogo.html');
    } else {
        alert('No se pudo editar el director');
    }
}