document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita el clic en la fila

            const countryRow = button.closest('.country-row'); //Obtengo la fila
            const countryDetails = JSON.parse(countryRow.dataset.details); //Obtengo los datos
            const deleteForms = document.querySelectorAll('form[action*="_method=DELETE"]'); //obtengo el fomulario Eliminar

            deleteForms.forEach(form => {
                form.addEventListener('submit', (event) => {
                    event.preventDefault(); // Previene el envío del formulario de eliminar

                    Swal.fire({
                        title: `¿Estás seguro de eliminar a ${countryDetails.nombre}?`,
                        text: "¡Los datos se eliminarán de forma permanente!",
                        icon: "warning",
                        showCancelButton: true,
                        cancelButtonColor: "#B22222",
                        confirmButtonColor: "#008000",
                        confirmButtonText: "Sí, Eliminar"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            form.submit(); // Envía el formulario solo si se confirma
                        }
                    });
                });
            });

            /* if (confirm(`¿Estás seguro de que quieres eliminar ${countryDetails.nombre}?`)) {
                 //countryRow.remove(); // Elimina la fila de la tabla
            }*/
        });
    });
});
