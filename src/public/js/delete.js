document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita el clic en la fila

            const countryRow = button.closest('.country-row');
            const countryDetails = JSON.parse(countryRow.dataset.details);

            if (confirm(`¿Estás seguro de que quieres eliminar ${countryDetails.nombre}?`)) {
                //countryRow.remove(); // Elimina la fila de la tabla
            }
        });
    });
});
