function borrarTodasLasCookies() {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        const d = c.indexOf("=");
        const nombre = d > -1 ? c.substring(0, d) : c;
        document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    }
}

function cerrarSesion() {
    console.log("Botón de cerrar sesión presionado");


    borrarTodasLasCookies();

    sessionStorage.clear();

    window.location.href = '/Home/Index';
}

