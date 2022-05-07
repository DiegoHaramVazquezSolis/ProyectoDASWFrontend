function renderNavbar() {
    if (isUserLogged()) {
        const token = localStorage.getItem('userToken');
        const tokenData = parseJwt(token);
        let rol = tokenData.roles.some((rol) => rol.name === 'admin') ? 'admin' : 'user';

        if (rol === 'admin') {
            return document.getElementById('navbarLinks').innerHTML = `
                <li class="nav-item active">
                    <a class="nav-link" href="./catalogo.html">
                        Catalogo
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" data-toggle="modal" data-target="#searchModal">
                        Buscar
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./cuenta.html">
                        Cuenta
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./admin/catalogo.html">
                        Manejar catalogo
                    </a>
                </li>
                <li class="nav-item">
                    <button class="btn btn-outline-light my-2 my-sm-0" type="button" onclick="signOut()">
                        Cerrar sesión
                    </button>
                </li>
            `;
        } else {
            return document.getElementById('navbarLinks').innerHTML = `
                <li class="nav-item active">
                    <a class="nav-link" href="./catalogo.html">
                        Catalogo
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./cuenta.html">
                        Buscar
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./cuenta.html">
                        Cuenta
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./cuenta.html">
                        Cuenta
                    </a>
                </li>
                <li class="nav-item">
                    <button class="btn btn-outline-light my-2 my-sm-0" type="button" onclick="signOut()">
                        Cerrar sesión
                    </button>
                </li>
            `;
        }
    }

    document.getElementById('navbarLinks').innerHTML = `
        <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#signInModal">
                Iniciar sesión
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#signUpModal">
                Crear cuenta
            </a>
        </li>
    `;
}

function renderSignInDialog() {
    document.body.innerHTML += `
        <div class="modal fade" id="signInModal" tabindex="-1" aria-labelledby="signInModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="signInModalLabel">
                            Inicia sesión para continuar
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="inputSignInEmail">Email address</label>
                            <input type="email" class="form-control" id="inputSignInEmail">
                        </div>
                        <div class="form-group">
                            <label for="inputSignInPassword">Password</label>
                            <input type="password" class="form-control" id="inputSignInPassword">
                        </div>
                        <button type="button" class="btn btn-primary" onclick="signIn()">Iniciar sesión</button>
                    </div>
                    <div class="modal-footer float-right">
                        No tienes cuenta?&nbsp;<a href="#" data-dismiss="modal" data-toggle="modal" data-target="#signUpModal">Crea una</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderSignUpDialog() {
    document.body.innerHTML += `
        <div class="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="signUpModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="signUpModalLabel">
                            Crea una cuenta para continuar
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="inputSignUpName">Nombre</label>
                            <input type="text" class="form-control" id="inputSignUpName">
                        </div>
                        <div class="form-group">
                            <label for="inputSignUpEmail">Email address</label>
                            <input type="email" class="form-control" id="inputSignUpEmail">
                        </div>
                        <div class="form-group">
                            <label for="inputSignUpPassword">Password</label>
                            <input type="password" class="form-control" id="inputSignUpPassword">
                        </div>
                        <button type="button" class="btn btn-primary" onclick="signUpUser()">Crear cuenta</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function findMovieByName() {
    document.getElementById('searchResultsContainer').innerHTML = '';
    const title = document.getElementById('searchMovieField').value;
    if (title.length > 1) {
        const resultsResponse = await fetch(`${API_URL}/api/v1/movies/${title}`, { method: 'POST' });

        if (resultsResponse.status === 200) {
            const results = (await resultsResponse.json()).movie;
            if (results.length) {
                for (let i = 0; i < results.length; i++) {
                    const movie = results[i];
                    document.getElementById('searchResultsContainer').innerHTML += `
                        <li class="media">
                            <img src="${movie.poster}" style="height: 128px; width: 100px;" class="mr-3" alt="${movie.title}">
                            <div class="media-body">
                                <h5 class="mt-0 mb-1">${movie.title}</h5>
                                <p>
                                    ${movie.description.substring(0, 327)}...
                                </p>
                            </div>
                        </li>
                    `;
                }
            }
        }
    }
}