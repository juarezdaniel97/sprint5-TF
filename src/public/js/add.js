document.addEventListener('DOMContentLoaded', (event) => {

    const formAgregar = document.getElementById('formAgregar');

    formAgregar.addEventListener('submit', async (event) => {
        event.preventDefault();

        //CAPTURAMOS LOS DATOS 
        const data = getDataForms();

        console.log(data.independent);
        console.log(typeof data.independent);
        

        //OBTENEMOS EL OBJETO CON LOS DATOS COMPLETO 
        const countryData = Country(data);
        //console.log(countryData);
        //console.log(JSON.stringify(countryData, null, 2));

        //REALIZAMOS LA PETICIÓN FETCH
        alert('Botón agregar')
    });


    const Country = (data) => {
        const CountryData = {

            name: {
                common: data.nameCommon,
                official: data.nameOfficial,
                nativeName: {
                    grn: {
                        official: "Ppepe pepe",
                        common: "pepe"
                    },
                    spa: {
                        official: "República Colombia",
                        common: "Colombia"
                    }
                }
            },
            independent: data.independent,
            status: "officially-assigned",
            unMember: true,
            currencies: {
                ARS: {
                    name: "Argentine peso",
                    symbol: "$"
                }
            },
            capital:data.capital,
            region: data.region,
            subregion: data.subregion,
            languages: {
                grn: "Guaraní",
                spa: "Spanish"
            },
            latlng: [
                -34,
                -64
            ],
            landlocked: false,
            borders: data.borders,
            area: data.area,
            flag: "🇦🇷",
            maps: {
                "googleMaps": "https://goo.gl/maps/Z9DXNxhf2o93kvyc6",
                "openStreetMaps": "https://www.openstreetmap.org/relation/286393"
            },
            population: data.population,
            gini: {
                "2024": 142.9,
                "2023": 10.5
            },
            fifa: "ARG",
            timezones: data.timezones,
            continents: [
                "South America"
            ],
            flags: {
                png: "https://flagcdn.com/w320/ar.png",
                svg: "https://flagcdn.com/ar.svg",
                alt: "The flag of Argentina features."
            },
            startOfWeek: "monday",
            capitalInfo: {
                latlng: [
                    -34.58,
                    -58.67
                ]
            },
            creador: "Daniel Juarez"

        }

        return CountryData;
    }

    const getDataForms = () => {

         //OBTENEMOS EL NOMBRE COMNÚN DEL PAÍS
        const nameCommon = document.getElementById('common-name').value;

        //OBTENEMOS EL NOMBRE OFICIAL DEL PAÍS
        const nameOfficial = document.getElementById('official-name').value;
        
        //OBTENEMOS LAS CAPITALES DEL PAÍS
        const capitalReceived = document.getElementById('capital').value;
        const capital = capitalReceived.split(',').map(cap => cap.trim()); //Convertimo en un array separando por coma

        //OBTENEMOS LA REGIÓN DEL PAÍS
        const region = document.getElementById('region').value;

        //OBTENEMOS LA SUBREGIÓN DEL PAÍS
        const subregion = document.getElementById('subregion').value;

        //OBTENEMOS LAS FRONTERAS DEL PAÍS
        const bordersReceived = document.getElementById('borders').value;
        const borders = bordersReceived.split(',').map(border => border.trim());

        //OBTENEMOS LA POBLACIÓN DEL PAÍS
        const population = document.getElementById('population').value;

        //OBTENEMOS EL ÁREA PAÍS
        const area = document.getElementById('area').value;

        //OBTENEMOS EL VALOR (TRUE O FALSE) DE LA INDEPENDENCIA DEL PAÍS
        const independent = getIndependent();

        //OBTENEMOS LAS ZONAS HORARIAS DEL PAÍS
        const timezonesReceived = document.getElementById('timezones').value;
        const timezones = timezonesReceived.split(',').map(time => time.trim());

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
    const getIndependent = () =>{
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
    const getIndiceGini = () =>{
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

});