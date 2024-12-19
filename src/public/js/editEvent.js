document.addEventListener('DOMContentLoaded', () => {
    
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita el clic en la fila
            const countryRow = button.closest('.country-row');
            const countryDetails = JSON.parse(countryRow.dataset.details);
            //alert(`Editar el país: ${countryDetails.nombre}`);
            // Aquí se puede implementar la lógica para abrir un formulario de edición
        });
    });

});
