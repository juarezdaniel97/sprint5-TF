document.addEventListener('DOMContentLoaded', (event) => {

    const formEditar = document.getElementById('formEditar');

    formEditar.addEventListener('submit', (event) => {
        event.preventDefault();

        // OBTENEMOS EL ID DEL PAIS A ACTUALIZAR
        const id = document.getElementById('id').value;
        console.log(id);

        //CAPTURAMOS LOS DATOS DEL FORMULARIO
        const data = getDataForms();

        //OBTENEMOS EL OBJETO CON LOS DATOS COMPLETOS 
        const countryData = Country(data);

        //REALIZAMOS LA PETICIÓN FETCH
        updateCountry(id, countryData);
    });

    //FUNCIÓN QUE OBTIENE TODOS LOS CAMPOS DEL FURMULARIO
    const getDataForms = () => {

        //OBTENEMOS EL NOMBRE COMNÚN DEL PAÍS
        const nameCommon = document.getElementById('common-name').value;

        //OBTENEMOS EL NOMBRE OFICIAL DEL PAÍS
        const nameOfficial = document.getElementById('official-name').value;

        //OBTENEMOS LAS CAPITALES DEL PAÍS
        const capitalReceived = document.getElementById('capital').value;
        const capital = capitalReceived.split(',').map(cap => cap); //Convertimo en un array separando por coma

        //OBTENEMOS LA REGIÓN DEL PAÍS
        const region = document.getElementById('region').value;

        //OBTENEMOS LA SUBREGIÓN DEL PAÍS
        const subregion = document.getElementById('subregion').value;

        //OBTENEMOS LAS FRONTERAS DEL PAÍS
        const bordersReceived = document.getElementById('borders').value;
        const borders = bordersReceived.split(',').map(border => border);

        //OBTENEMOS LA POBLACIÓN DEL PAÍS
        const population = document.getElementById('population').value;

        //OBTENEMOS EL ÁREA PAÍS
        const area = document.getElementById('area').value;

        //OBTENEMOS EL VALOR (TRUE O FALSE) DE LA INDEPENDENCIA DEL PAÍS
        const independent = getIndependent();

        //OBTENEMOS LAS ZONAS HORARIAS DEL PAÍS
        const timezonesReceived = document.getElementById('timezones').value;
        const timezones = timezonesReceived.split(',').map(time => time);

        //LLAMAMOS A UNA FUNCIÓN QUE ME OBTIENE LOS VALORES DE ÍNIDICE GINI
        const indiceGini = getIndiceGini();

        //OBTENEMOS EL NOMBRE DEL CREADOR DEL PAÍS
        const creador = document.getElementById('creador').value;


        return {
            nameCommon,
            nameOfficial,
            capital,
            region,
            subregion,
            borders,
            population,
            area,
            independent,
            timezones,
            indiceGini,
            creador
        }
    }

    //FUNCIÓN PARA OBTENER EL VALOR TRUE O FALSE DE LA INDEPENDENCIA
    const getIndependent = () => {
        const independentRecieved = document.getElementById('independent').value;
        let result;

        if (independentRecieved === 'true') {
            result = true;
        }

        if (independentRecieved === 'false') {
            result = false;
        }
        return result;
    }

    //FUNCIÓN PARA OBTENER EL INDICE GINI
    const getIndiceGini = () => {
        const giniEntries = document.querySelectorAll('.gini-entry');
        const giniData = {};

        giniEntries.forEach((element) => {
            const year = element.querySelector('.gini-year').value;
            const value = element.querySelector('.gini-value').value;

            if (year && value) {
                giniData[year] = parseFloat(value);
            }
        });

        return giniData;
    }

    //FUNCIÓN QUE GENERA UN OBJETO CON LOS DATOS OBTENIDOS DEL FORMULARIO
    const Country = (data) => {
        const CountryData = {
            name: {
                common: data.nameCommon,
                official: data.nameOfficial
            },
            independent: data.independent,
            capital: data.capital,
            region: data.region,
            subregion: data.subregion,
            borders: data.borders,
            area: data.area,
            population: data.population,
            gini: data.indiceGini,
            timezones: data.timezones,
            creador: data.creador
        }

        return CountryData;
    }

    //FUNCIÓN QUE REALIZA UNA PETECIÓN FETCH PARA AGREGAR UN PAÍS
    const updateCountry = async (id, data) => {

        try {
            const response = await fetch(`/api/country/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {

                Swal.fire({
                    title: "¡País modificado correctamente!",
                    icon: "success",
                    draggable: true,
                }).then(() => {
                    window.location.href = "/";
                });

            } else {
                const errorData = await response.json();
                const { errores } = errorData

                errores.forEach(error => {
                    console.log("HAY UN ERROR Y ENTRA POR EL VARIOS ");

                    const isEmptyValue = (value) => {
                        if (Array.isArray(value)) {
                            // Verifica si el array está vacío o solo contiene strings vacíos
                            return value.length === 0 || value.every(item => item === '');
                        }
                        return !value; // Para valores no array
                    };

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${error.message}`,
                        footer: `<p>El valor ingresado es: ${isEmptyValue(error.value) ? 'Vacío' : error.value}</p>`
                    });
                });
            }
        } catch (error) {
            alert(`Error al enviar el formulario. ${error} `);
        }
    }

});