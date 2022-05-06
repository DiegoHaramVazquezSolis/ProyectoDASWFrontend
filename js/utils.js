function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function generateMovieCard(movie) {
    return `
        <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-2 p-2">
            <div class="card movie" style='background: transparent; cursor: pointer' id="${movie._id}">
                <img class="card-img-top" src="${movie.poster}" alt="">
                <div class="card-body text-center">
                    <p class="card-text text-white" style='cursor: pointer; margin: 0'>
                        ${movie.title}
                    </p>
                    <p class="card-text text-secondary" style='font-size: 14px'>
                        ${movie.year}
                    </p>
                </div>
            </div>
        </div>
    `;
}

function generateAdminMovieCard(movie) {
    return `
        <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-2 p-2">
            <div class="card movie" style='background: transparent; cursor: pointer' id="${movie._id}">
                <img class="card-img-top" src="${movie.poster}" alt="">
                <div class="card-body text-center">
                    <p class="card-text text-white" style='cursor: pointer; margin: 0'>
                        ${movie.title}
                    </p>
                    <p class="card-text text-secondary" style='font-size: 14px'>
                        ${movie.year}
                    </p>
                </div>
                <div class="card-footer text-muted">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-success">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="btn btn-danger">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}