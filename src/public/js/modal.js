document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('country-modal');
    const modalContent = document.getElementById('country-details');
    const closeModalButton = document.getElementById('close-modal');
    const countryRows = document.querySelectorAll('.country-row');

    countryRows.forEach(row => {
        row.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-button') || event.target.classList.contains('delete-button')) {
                return; // Evita abrir el modal si se hizo clic en un botón
            }

            const countryDetails = JSON.parse(row.dataset.details);
            showDetails(countryDetails);
        });
    });

    function showDetails(country) {
        modalContent.innerHTML = `
            <p><strong>Nombre:</strong> ${country.nombre}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Área:</strong> ${country.area}</p>
            <p><strong>Población:</strong> ${country.poblacion}</p>
            <p><strong>Fronteras:</strong> ${country.fronteras.join(', ')}</p>
            <p><strong>Índice Gini:</strong> ${country.indiceGini}</p>
            <p><strong>Zona Horaria:</strong> ${country.zonaHoraria}</p>
            <p><strong>Creador:</strong> ${country.creador}</p>
        `;
        modal.classList.remove('hidden');
    }

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
});
