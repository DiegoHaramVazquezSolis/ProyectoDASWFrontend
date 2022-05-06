async function getAllCategoriesWithMovies() {
    const categoriesResponse = await fetch(`${API_URL}/api/v1/categories`, { method: 'GET' });
    if (categoriesResponse.status === 200) {
        const { categories } = await categoriesResponse.json();

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            renderCategory(category, i);
        }
    }
}

function renderCategory(cat, index) {
    const catName = cat.name;
    const catId = cat.name.replace(/\s/g, "");

    document.getElementById('categorysAccordion').innerHTML += `
        <div class="card" style="background-color: transparent;">
            <div class="card-header" role="tab" id="${catId}">
                <h5 class="mb-0">
                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#${catId}ContentId" aria-expanded="true" aria-controls="${catId}ContentId">
                    ${catName}
                </button>
                </h5>
            </div>
            <div id="${catId}ContentId" class="collapse in ${index === 0 && 'show'}" role="tabpanel" aria-labelledby="${catId}">
                <div class="card-body">
                    <div class="container">
                        <div class="row" id="${catId}Container">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    renderCategoryMovies(catId, cat.movies);
}

function renderCategoryMovies(cat, movies) {
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        document.getElementById(`${cat}Container`).innerHTML += generateMovieCard(movie);

        document.getElementById(movie._id).onclick = () => executeIfUserLogged(() => getTrailer(movie._id));
    }
}

getAllCategoriesWithMovies();
renderNavbar();
renderSignInDialog();
renderSignUpDialog();