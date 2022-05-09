async function getAndShowMovies() {
    document.getElementById('trailersList').innerHTML = generateSpinnerHTML();
    setTimeout(async () => {
        const moviesResponse = await fetch(`${API_URL}/api/v1/movies`, { method: 'GET' });

        if (moviesResponse.status === 200) {
            const moviesData = (await moviesResponse.json()).movies;
            renderMovies(moviesData);
        }
    }, 500);
}

function renderMovies(movies) {
    document.getElementById('trailersList').innerHTML = '';
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        document.getElementById('trailersList').innerHTML += generateMovieCard(movie);
        document.getElementById(movie._id).innerHTML += `
            <div class="card-footer text-muted">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <a class="btn btn-success text-light" href='./movies/edit.html?id=${movie._id}'>
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </a>
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

getAndShowMovies();
