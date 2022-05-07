function isUserLogged() {
    return Boolean(localStorage.getItem('userToken')).valueOf();
}

function executeIfUserLogged(next) {
    if (isUserLogged()) {
        next();
    } else {
        $("#signInModal").modal('show');
    }
}

async function signIn() {
    const email = document.getElementById('inputSignInEmail').value;
    const password = document.getElementById('inputSignInPassword').value;
    const signInRequest = await fetch(`${API_URL}/api/v1/auth/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    document.getElementById('inputSignInEmail').value = '';
    document.getElementById('inputSignInPassword').value = '';

    if (signInRequest.status === 200) {
        const token = await signInRequest.json();
        localStorage.setItem('userToken', token.token);
        renderNavbar();
        $("#signInModal").modal('hide');
    } else {
        alert('No se pudo iniciar sesión, verifique sus credenciales');
    }
}

async function signUpUser() {
    const name = document.getElementById('inputSignUpName').value;
    const email = document.getElementById('inputSignUpEmail').value;
    const password = document.getElementById('inputSignUpPassword').value;
    const signInRequest = await fetch(`${API_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    document.getElementById('inputSignUpName').value = '';
    document.getElementById('inputSignUpEmail').value = '';
    document.getElementById('inputSignUpPassword').value = '';

    if (signInRequest.status === 200) {
        const token = await signInRequest.json();
        localStorage.setItem('userToken', token.token);
        renderNavbar();
        $("#signUpModal").modal('hide');
    } else {
        alert('No se pudo crear la cuenta, intentelo mas tarde');
    }
}

function signOut() {
    localStorage.removeItem('userToken');
    renderNavbar();
}