class IRepository{
    create(data){
        throw new Error("Método 'create()' no implementado");
    }

    update(id, data){
        throw new Error("Método 'update()' no implementado");
    }

    deleteById(){
        throw new Error("Método 'delete()' no implementado");
    }

    getFindById(id){
        throw new Error("Método 'getFindById()' no implementado");
    }

    getAll(){
        throw new Error("Método 'getAll()' no implementado");
    }

    saveCountries_of_API(countries){
        throw new Error("Método 'saveCountries_of_API(countries)' no implementado");
    }

    deleteAll(){
        throw new Error("Método 'deleteAll()' no implementado");
    }
}

export default IRepository