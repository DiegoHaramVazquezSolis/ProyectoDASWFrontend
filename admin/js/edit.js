function getMovieId() {
    const searchParams = new URLSearchParams(window.location.search);

    return searchParams.get('id');
}

async function loadCategories() {
    const categoriesResponse = await fetch(`${API_URL}/api/v1/categories`, { method: 'GET' });

    if (categoriesResponse.status === 200) {
        const { categories } = (await categoriesResponse.json());
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            document.getElementById('category').innerHTML += `
            <option value='${category._id}'>${category.name}</option>
        `;
        }
    }
}

async function loadDirectors() {
    const directorsResponse = await fetch(`${API_URL}/api/v1/directors`, { method: 'GET' });

    if (directorsResponse.status === 200) {
        const { directors } = (await directorsResponse.json());
        for (let i = 0; i < directors.length; i++) {
            const director = directors[i];
            document.getElementById('director').innerHTML += `
            <option value='${director._id}'>${director.name}</option>
        `;
        }
    }
}

async function loadActors() {
    const actorsResponse = await fetch(`${API_URL}/api/v1/actors`, { method: 'GET' });

    if (actorsResponse.status === 200) {
        const { actors } = (await actorsResponse.json());
        for (let i = 0; i < actors.length; i++) {
            const actor = actors[i];
            document.getElementById('actor').innerHTML += `
            <option value='${actor._id}'>${actor.name}</option>
        `;
        }
    }
}

async function loadStudios() {
    const studiosResponse = await fetch(`${API_URL}/api/v1/studios`, { method: 'GET' });

    if (studiosResponse.status === 200) {
        const { studios } = (await studiosResponse.json());
        for (let i = 0; i < studios.length; i++) {
            const studio = studios[i];
            document.getElementById('studio').innerHTML += `
            <option value='${studio._id}'>${studio.name}</option>
        `;
        }
    }
}

async function loadMovieToEdit() {
    await loadCategories();
    await loadDirectors();
    await loadActors();
    await loadStudios();
    const movieId = getMovieId();

    const movieDataResponse = await fetch(`${API_URL}/api/v1/movies/${movieId}`, { method: 'GET' });

    if (movieDataResponse.status === 200) {
        const movieData = (await movieDataResponse.json()).movie;

        Object.keys(movieData).forEach((movieField) => {
            if (document.getElementById(movieField)) {
                const value = Array.isArray(movieData[movieField]) ? (movieData[movieField][0]._id ? movieData[movieField][0]._id : movieData[movieField]) : ((typeof movieData[movieField] === 'string' || typeof movieData[movieField] === 'number') ? movieData[movieField] : movieData[movieField]._id);
                document.getElementById(movieField).value = value.toString();
            }
        });
    }
}

async function editMovie() {
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const duration = document.getElementById('duration').value;
    const rating = document.getElementById('rating').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const director = document.getElementById('director').value;
    const actor = document.getElementById('actor').value;
    const studio = document.getElementById('studio').value;
    const poster = document.getElementById('poster').value;
    const trailer = document.getElementById('trailer').value;

    const addMovieResponse = await fetch(`${API_URL}/api/v1/movies/${getMovieId()}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('userToken')
        },
        body: JSON.stringify({
            title,
            year: parseInt(year),
            duration,
            rating,
            score: "5",
            category: [category],
            description,
            director: [director],
            actor: [actor],
            studio,
            poster,
            trailer
        })
    });

    if (addMovieResponse.status === 200) {
        alert('Actualizada correctamente');
        window.location.replace('../catalogo.html');
    } else {
        alert('No se pudo actualizar, verifica los datos');
    }
}

loadMovieToEdit();
console.log(localStorage.getItem('userToken'));