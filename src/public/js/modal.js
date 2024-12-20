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

        let giniContent = 'No disponible';

        if (country.indiceGini && country.indiceGini.length > 0) {
            
            giniContent = '<ul class="list-disc list-inside space-y-1 text-gray-600">';

            country.indiceGini.forEach(gini => {
                giniContent += `<li> Año: ${gini.year} - Valor: ${gini.value}</li>`;
            });

            giniContent += '</ul>';
        }

        modalContent.innerHTML = `
            <p><strong>Nombre Común:</strong> ${country.nombreComun}</p>
            <p><strong>Nombre Oficial:</strong> ${country.nombre}</p>
            <p><strong>Capital:</strong> ${country.capital.join(',') || 'No tiene'}</p>
            <p><strong>Región:</strong> ${country.region || 'No tiene'}</p>
            <p><strong>Subregión:</strong> ${country.subregion || 'No tiene'} </p>
            <p><strong>Fronteras:</strong> ${country.fronteras.join(', ') || 'No tiene'}</p>
            <p><strong>Intependiente:</strong> ${country.independiente}</p>
            <p><strong>Zona Horaria:</strong> ${country.zonaHoraria.join(',') || 'No tiene'}</p>
            <p><strong>Índice Gini:</strong> ${giniContent}</p>
            <p><strong>Creador:</strong> ${country.creador}</p>
        `;
        modal.classList.remove('hidden');
    }

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
});
