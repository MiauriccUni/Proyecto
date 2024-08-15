function borrarTodasLasCookies() {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        const d = c.indexOf("=");
        const nombre = d > -1 ? c.substring(0, d) : c;
        document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    }
}

function cerrarSesion() {
    // Mostrar modal de confirmación antes de cerrar sesión
    Swal.fire({
        title: '¿Quieres cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cerrar Sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, proceder con el cierre de sesión
            console.log("Cerrando sesión");

            borrarTodasLasCookies();
            sessionStorage.clear();

            // Redirige al usuario a la página de inicio
            window.location.href = '/Home/Index';
        }
    });
}
