document.addEventListener('DOMContentLoaded', (event) => {

    const formAgregar = document.getElementById('formAgregar');

    formAgregar.addEventListener('submit', async (event) => {
        event.preventDefault();

        //CAPTURAMOS LOS DATOS 
        const data = getDataForms();
        console.log(data.nameCommon);
        console.log(data.nameOfficial);


        //OBTENEMOS EL OBJETO CON LOS DATOS COMPLETO 
        const countryData = Country(data);
        console.log(countryData);
        console.log(JSON.stringify(countryData, null, 2));

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
            independent: true,
            status: "officially-assigned",
            unMember: true,
            currencies: {
                ARS: {
                    name: "Argentine peso",
                    symbol: "$"
                }
            },
            capital: [
                "Buenos Aires"
            ],
            region: "Americas",
            subregion: "South America",
            languages: {
                grn: "Guaraní",
                spa: "Spanish"
            },
            latlng: [
                -34,
                -64
            ],
            landlocked: false,
            borders: [
                "BOL",
                "BRA",
                "CHL",
                "PRY",
                "URY"
            ],
            area: 2780400,
            flag: "🇦🇷",
            maps: {
                "googleMaps": "https://goo.gl/maps/Z9DXNxhf2o93kvyc6",
                "openStreetMaps": "https://www.openstreetmap.org/relation/286393"
            },
            population: 45376763,
            gini: {
                "2024": 142.9,
                "2023": 10.5
            },
            fifa: "ARG",
            timezones: [
                "UTC-03:00"
            ],
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
        const nameCommon = document.getElementById('common-name').value;
        const nameOfficial = document.getElementById('official-name').value;

        return {
            nameCommon,
            nameOfficial
        }
    }

});