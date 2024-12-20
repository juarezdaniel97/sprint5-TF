import { body } from "express-validator";

//VALIDATION FOR THE OFFICIAL NAME FIELD  
export const validateNameCountry = body('name.official')
    .notEmpty().withMessage('¡EL CAMPO NOMBRE NO PUEDE ESTAR VACÍO!')
    .trim()
    .isLength({ min: 3, max: 90 }).withMessage('¡EL NOMBRE OFICIAL DEL PAÍS DEBE TENER ENTRE 3 Y 90 CARACTERES!')


// VALIDATION FOR THE CAPITAL FIELD
export const validateCapitalCountry = body('capital')
    .notEmpty().withMessage('¡EL CAMPO CAPITAL NO PUEDE ESTAR VACÍO!')
    .custom((capital)=>{
        for (const cap of capital) {
            if (cap.trim().length < 3 || cap.trim().length > 90) {
                throw new Error("¡CADA CAPITAL INGRESADA DEBE TENER ENTRE 3  Y 90 CARACTERES!");
            }
        }
        return true;
    });


//VALIDATION FOR THE BORDERS FIELD
export const validateBordersCountry = body('borders')
    .custom((borders) => {
        for (const border of borders) {
            //console.log(border);
            if (border.trim().length !== 3) {
                //console.log("entro al if --> !3");
                throw new Error('¡CADA FRONTERA DEBE TENER 3 CARACTERES!');
            }
            
            if (border.trim() !== border.trim().toUpperCase()) {
                //console.log("entro al if --> MAYUSCULA");
                throw new Error('¡CADA FRONTERA DEBE TENER TODOS SUS CARACTERES EN MAYÚSCULAS!');
            }
        }
        return true;
    });


//VALIDATION FOR THE AREA FIELD
export const validateAreaCountry = body('area')
    .isNumeric().withMessage('¡EL VALOR INGRESADO DEBE SER DE TIPO NUMÉRICO!')
    .isFloat({ min: 1 }).withMessage('¡EL VALOR INGRESADO EN EL ÁREA DEBE SER POSITIVO!')


//VALIDATION FOR THE POPULATION FIELD
export const validatePopulationCountry = body('population')
    .isNumeric().withMessage('¡EL VALOR INGRESADO DEBE SER DE TIPO NUMÉRICO!')
    .isInt({ min: 1 }).withMessage('¡EL VALOR INGRESADO EN POBLACIÓN DEBE SER UN ENTERO POSITIVO!')


//VALIDATION FOR THE GINI FIELD
export const validateGiniCountry = body('gini')
    .custom((value,) => {
        //VALUE --> {2023: 42.5}
        for (const key in value) {
            //KEY --> 2023
            //VALUE[KEY] --> 42.5

            if (value[key] < 0 || value[key] > 100) {
                throw new Error('EL VALOR INGRESADO PARA EL ÍNDICE GINI DEBE ESTAR COMPRENDIDO ENTRE 0 Y 100')
            }
        }
        return true;
    });