

export const filterCountriesAPI = (countries) => {
    return countries
        .filter(country => country.name.common === 'Argentina') //Pribando filtrando solamnete Argentina
        .map(({ translations, tld, cca2, ccn3, cca3, cioc, idd, altSpellings, car, coatOfArms, postalCode, demonyms, ...resto }) => ({ ...resto, creador: "Daniel Juarez" }));
};