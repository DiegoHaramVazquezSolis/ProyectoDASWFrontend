async function getTrailer(movieId) {
    const trailerResponse = await fetch(`${API_TEST_URL}/api/v1/movies/${movieId}`, { method: 'GET' });
    if (trailerResponse.status === 200) {
        const data = (await trailerResponse.json()).movie;
        const trailerUrl = data.trailer.replace('watch?v=', 'embed/')
        document.getElementById('trailerContainer').innerHTML = `<iframe width="100%" height="315" src="${trailerUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        document.getElementById('movieDuration').innerText = `Duración: ${data.duration}`;
        document.getElementById('movieRating').innerText = `Rating: ${data.rating}`;
        document.getElementById('movieDirector').innerText = `Director: ${data.director.map((director) => director.name)}`;
        document.getElementById('movieStudio').innerText = `Estudio: ${data.studio.name}`;
        document.getElementById('movieDescription').innerText = `${data.description}`;
        document.getElementById('movieActors').innerText = `Protagonistas:\n${data.actor.map((actor) => `${actor.name}\n`)}`;
        $("#trailerModal").modal('show');
    }
}