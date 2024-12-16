

// CONTROLA EL BOTÓN PARA AGREGAR NUEVOS CAMPOS PARA INDICE GINI
document.getElementById('add-gini').addEventListener('click', () => {
    const container = document.getElementById('gini-container');
    const index = container.querySelectorAll('.gini-entry').length + 1;

    const newEntry = document.createElement('div');
    newEntry.classList.add('grid', 'grid-cols-2', 'md:grid-cols-3', 'gap-4', 'gini-entry');
    newEntry.innerHTML = `
        <div>
            <label for="gini-year-${index}" class="block text-sm font-medium text-gray-700">Año</label>
            <input type="number" id="gini-year-${index}" class="gini-year mt-1 block w-full rounded shadow-lg" placeholder="Ej: 2023">
        </div>
        <div>
            <label for="gini-value-${index}" class="block text-sm font-medium text-gray-700">Valor</label>
            <input type="number" step="0.1" id="gini-value-${index}" class="gini-value mt-1 block w-full rounded shadow-lg" placeholder="Ej: 10.5">
        </div>
        <button type="button" class="remove-gini mt-6 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded shadow hover:bg-red-600">
            Quitar
        </button>
    `;
    container.appendChild(newEntry);
    addRemoveListeners();
});


// FUNCIÓN CONTROLA EL BOTÓN PARA QUITAR CAMPOS DEL INDICE GINI
const addRemoveListeners = () => {

    const removeButtons = document.querySelectorAll('.remove-gini');
    removeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const entry = event.target.closest('.gini-entry');
            entry.remove();
        });
    });
}

// ICINICIALIZAR LOS LISTENER AL CARGAR LA PÁGINA
addRemoveListeners();



