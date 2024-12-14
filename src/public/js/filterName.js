// Función para filtrar la tabla
function filtrarTabla() {
    const input = document.getElementById('filtro');
    const filter = input.value.toLowerCase();
    const tabla = document.getElementById('tabla-paises');
    const filas = tabla.getElementsByTagName('tr');

    // Recorre todas las filas de la tabla
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        let mostrarFila = false;

        // Recorre todas las celdas de la fila
        for (let j = 0; j < celdas.length; j++) {
            const celdaTexto = celdas[j].textContent || celdas[j].innerText;
            if (celdaTexto.toLowerCase().indexOf(filter) > -1) {
                mostrarFila = true;
                break;
            }
        }

        // Muestra u oculta la fila según el filtro
        filas[i].style.display = mostrarFila ? '' : 'none';
    }
}