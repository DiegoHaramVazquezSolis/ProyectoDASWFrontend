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