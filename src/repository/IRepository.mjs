class IRepository{
    create(){
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

    getAll(id){
        throw new Error("Método 'getAll()' no implementado");
    }

    getCountries(id){
        throw new Error("Método 'getCountries()' no implementado");
    }

}

export default IRepository