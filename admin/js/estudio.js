async function addEstudio() {
    const name = document.getElementById('estudio').value;
    const addResponse = await fetch(`${API_URL}/api/v1/studios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('userToken')
        },
        body: JSON.stringify({
            name
        })
    });

    if (addResponse.status === 201) {
        alert('Estudio agregado correctamente');
        window.location.replace('./catalogo.html');
    } else {
        alert('No se pudo agregar el estudio');
    }
}