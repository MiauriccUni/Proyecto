var correo = sessionStorage.getItem('correo');

function Consultar() {
    fetch('https://localhost:7253/api/PlanesMensuales/GetPlanMensualByCorreo?Correo=' + correo)
        .then(response => response.json())
        .then(data => {
            const result = data[0];
            if (result) {
                const precioPlan = result.precioPlan;
                document.getElementById('datoPrecio').textContent = 'Precio Plan: $' + precioPlan;

                let totalPagar = precioPlan; // Valor inicial en caso de no haber descuento
                if (result.cuponesList && result.cuponesList.length > 0) {
                    const cupon = result.cuponesList[0];
                    const nombreCupon = cupon.nombreCupon;
                    const descuento = cupon.descuento;

                    document.getElementById('datoDescuento').textContent = 'Descuento: ' + nombreCupon + '  (' + descuento + '%)';
                    totalPagar = precioPlan - (precioPlan * (descuento / 100));
                } else {
                    document.getElementById('datoDescuento').textContent = 'Descuento: No disponible';
                }

                document.getElementById('datoTotalPagar').textContent = 'Total a Pagar: $' + totalPagar.toFixed(2);

                if (result.usuariosList && result.usuariosList.length > 0) {
                    const usuario = result.usuariosList[0];
                    const nombreUsuario = usuario.nombre;
                    const correoUsuario = usuario.correo;

                    document.getElementById('datoNombre').textContent = 'Nombre completo: ' + nombreUsuario;
                    document.getElementById('datoCorreo').textContent = 'Contacto: ' + correoUsuario;
                } else {
                    document.getElementById('datoNombre').textContent = 'Nombre: No disponible';
                    document.getElementById('datoCorreo').textContent = 'Contacto: No disponible';
                }

                // Limpiar el contenedor antes de renderizar el botón de PayPal
                const paypalButtonContainer = document.getElementById('paypal-button-container');
                if (paypalButtonContainer) {
                    paypalButtonContainer.innerHTML = ''; // Limpiar el contenido

                    paypal.Buttons({
                        createOrder: function (data, actions) {
                            // Crea una orden en PayPal usando el valor de totalPagar
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: totalPagar.toFixed(2) // Monto a pagar
                                    }
                                }]
                            });
                        },
                        onApprove: function (data, actions) {
                            // Captura el pago
                            return actions.order.capture().then(function (details) {
                                // Muestra un mensaje de éxito
                                alert('Pago completado por ' + details.payer.name.given_name);
                            });
                        },
                        onError: function (err) {
                            // Maneja errores
                            console.error('Error al procesar el pago:', err);
                        }
                    }).render('#paypal-button-container'); // Renderizar el botón en el contenedor
                } else {
                    console.error('El contenedor de PayPal no se encontró.');
                }

            } else {
                console.error("No se encontraron datos para el correo proporcionado.");
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    Consultar();
});