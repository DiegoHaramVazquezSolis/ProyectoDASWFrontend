async function getAndShowMovies() {
    const moviesResponse = await fetch(`${API_URL}/api/v1/movies`, { method: 'GET' });

    if (moviesResponse.status === 200) {
        const moviesData = (await moviesResponse.json()).movies;
        renderMovies(moviesData);
    }
}

function renderMovies(movies) {
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        document.getElementById('trailersList').innerHTML += generateMovieCard(movie);
        document.getElementById(movie._id).innerHTML += `
            <div class="card-footer text-muted">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-success">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="removeMovie('${movie._id}')">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        `;
    }
}

async function removeMovie(movieId) {
    if (confirm('Estas seguro de querer eliminar esta pelicula?')) {
        const deleteMovieResponse = await fetch(`${API_URL}/api/v1/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('userToken')
            }
        });

        if (deleteMovieResponse.status === 200) {
            document.getElementById(movieId).remove();
            return alert('Pelicula eliminada correctamente');
        }

        alert('No se pudo eliminar la pelicula');
    }
}

async function addMovie() {
    const addMovieResponse = await fetch(`${API_URL}/api/v1/movies`, {
        method: 'POST',
        headers: {
            'x-access-token': localStorage.getItem('userToken')
        },
        body: JSON.stringify({

        })
    });
}

async function editMovie(movieId) {
    const editMovieResponse = await fetch(`${API_URL}/api/v1/movies/${movieId}`, {
        method: 'PUT',
        headers: {
            'x-access-token': localStorage.getItem('userToken')
        },
        body: JSON.stringify({
            
        })
    });
}

getAndShowMovies();
