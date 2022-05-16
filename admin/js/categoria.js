async function addCategoria() {
    const name = document.getElementById('categoria').value;
    const addResponse = await fetch(`${API_URL}/api/v1/categories`, {
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
        alert('Categoria agregado correctamente');
        window.location.replace('./catalogo.html');
    } else {
        alert('No se pudo agregar el categoria');
    }
}