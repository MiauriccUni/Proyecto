function MaquinasList() {

    this.InitView = function () {
        $('#registromaquina').click(function () {
            var view = new MaquinasList();
            view.RegistroMaquina();
        });
    }

      this.RegistroMaquina = function () {
          var maquina = {}
          maquina.id = generateUniqueId();
          maquina.nombreMaquina = $('#nombre').val();

          if (maquina.nombreMaquina == "") {
              Swal.fire({
                  icon: 'error',
                  text: "Por favor indique el nombre de la maquina.",
                  title: 'Error'
              });
              return;
          }

          $.ajax({
              headers: {
                  'Accept': "application/json",
                  'Content-Type': "application/json"
              },
              method: "POST",
              url: api + "/api/maquina/Createmaquina",
              contentType: "application/json;charset=utf-8",
              dataType: "json",
              data: JSON.stringify(maquina),
              hasContent: true
          }).done(function (result) {
              Swal.fire({
                  title: "Éxito",
                  icon: "success",
                  text: "Se ha completado el registro",
              })
          }).fail(function (error) {
              Swal.fire({
                  icon: 'error',
                  text: "Error al registrar la maquina",
                  title: 'Error',
              });
          })
          
    }

}

function Consultar() {
    const grid = new gridjs.Grid({
        search: true,
        sort: true,
        resizable: true,
        pagination: {
            limit: 5
        },

        columns: ['Nombre'],
        server: {
            url: 'https://localhost:7253/api/maquina/GetAllMaquinas', /* cambiar esta parte del código */
            then: data => data.data.map(result => [result.nombreMaquina])
        },
    }).render(document.getElementById('myGrid'));
}

generatedIds = [];

generateUniqueId = () => {
    let newId;
    do {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        newId = parseInt(randomNumber);
    } while (generatedIds.includes(newId));
    generatedIds.push(newId);
    return newId;
}

$(document).ready(function () {
    Consultar();
    var view = new MaquinasList();
    view.InitView();
});
