

export const calculosCounties = (countries) => {

    //Calculamos la población total acumulando todas las poblaciones de los paises
    const poblacionTotal = countries.reduce((accumulator, country_current) => accumulator + country_current.population, 0);

    //Calculamos el área total acumulando todas los áreas de los paises
    const areaTotal = countries.reduce((accumulator, country_current) => accumulator + country_current.area, 0);

    //Calculamos el inidce Gini
    const indiceIni = poblacionTotal / areaTotal;

    //Calculamos el pais con mayor población
    const paisMayorPoblacion = countries.reduce((may, country_current) => {
        return country_current.population > may.population ? country_current : may;
    }, countries[0]);

    //Calculamos el país con menor población
    const paisMenorPoblacion = countries.reduce((men, country_current) => {
        return country_current.population < men.population ? country_current : men;
    }, countries[0]);

    
    return {
        poblacionTotal,
        areaTotal,
        indiceIni,
        paisMayorPoblacion,
        paisMenorPoblacion
    };

}