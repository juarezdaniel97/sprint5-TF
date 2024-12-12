

export const filterCountriesAPI = (countries) => {
    return countries
        .filter(country => country.languages && Object.values(country.languages).includes("Spanish"))
        .map(country => {
            const { translations, car, postalCode, ...cleanedCountry } = country;
            return cleanedCountry;
        });
};
