

export const calculosCounties = (countries) => {

    
    //Calculamos la población total acumulando todas las poblaciones de los paises
    const poblacionTotal = countries.reduce((acc, country) => acc + country.population, 0);

    //Calculamos el área total acumulando todas los áreas de los paises
    const areaTotal = countries.reduce((acc, country) => acc + country.area, 0);

    //Calculamos el inidce Gini
    const indiceIni = poblacionTotal / areaTotal;

    //Calculamos el pais con mayor población
    const paisMayorPoblacion = countries.reduce((may, country) => {
        return country.population > may.population ? country : may;
    }, countries[0]);

    //Calculamos el país con menor población
    const paisMenorPoblacion = countries.reduce((men, country) => 
        country.population < men.population ? country : men, countries[0]
    );

    
    return {
        poblacionTotal,
        areaTotal,
        indiceIni,
        paisMayorPoblacion,
        paisMenorPoblacion
    };

}