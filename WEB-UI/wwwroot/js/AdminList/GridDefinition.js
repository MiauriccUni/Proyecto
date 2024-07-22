﻿const columnDefinition = [
    { field: "identificacion", headerName: "Identificacion" },
    { field: "nombre", headerName: "Nombre" },
    { field: "apellidos", headerName: "Apellidos" },

    { field: "correo", headerName: "Correo" },
    { field: "Fecha Nacimiento", headerName: "Fecha Nacimiento" },
    { field: "rol", headerName: "Rol" }

];

const gripOptions = {
    columnDefs: columnDefinition,
    rowData: [],
    rowSelection: 'single',

    defaultColDef: { sortable: true, filter: true },


    onRowDoubleClicked: params => {
        ProcessDoubleClick(params);
    }



}

function ProcessDoubleClick(params) {
    var view = new UsuariosList();
    view.GetUsersDetails(params.data.correo);

}

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gripOptions);
});