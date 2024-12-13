import { body } from "express-validator";

//VALIDATION FOR THE OFFICIAL NAME FIELD  
export const validateNameCountry = body('name.official')
    .notEmpty().withMessage('¡EL CAMPO NOMBRE NO PUEDE ESTAR VACÍO!')
    .trim()
    .isLength({min:3, max:90}).withMessage('¡EL NOMBRE OFICIAL DEL PAÍS DEBE TENER ENTRE 3 Y 90 CARACTERES!')

// VALIDATION FOR THE CAPITAL FIELD
export const validateCapitalCountry = body('capital')
    .trim()
    .isLength({min:3, max:90}).withMessage('¡LA CAPITAL DEL PAÍS DEBE TENER ENTRE 3  Y 90 CARACTERES!')

//VALIDATION FOR THE BORDERS FIELD
export const validateBordersCountry = body('borders')
    .custom((borders) =>{
        for(const border of borders){
            
            if (border.trim().length !== 3) {
                throw new Error('¡CADA LÍMITE DEBE TENER 3 CARACTERES!');
            }
            
            if (border.trim() !== border.trim().toUpperCase()) {
                throw new Error('¡CADA LÍMITE DEBE TENER TODOS SUS CARACTERES EN MAYÚSCULAS!');
            }
        }
        return true;
    });


//VALIDATION FOR THE AREA FIELD
export const validateAreaCountry = body('area')
    .isNumeric().withMessage('¡EL VALOR INGRESADO DEBE SER NUMÉRICO!')
    .isFloat({min: 0}).withMessage('¡EL VALOR INGRESADO EN EL ÁREA NO PUEDE SER NEGATIVO, POR FAVOR INGRESA UN VALOR MAYOR A 0!')

//VALIDATION FOR THE POPULATION FIELD
export const validatePopulationCountry = body('population')
    .isNumeric().withMessage('¡EL VALOR INGRESADO DEBE SER NUMÉRICO!')
    .isInt({min: 0}).withMessage('¡EL VALOR INGRESADO EN POBLACIÓN NO PUEDE SER NEGATIVO, POR FAVOR INGRESA UN VALOR MAYOR A 0!')

//VALIDATION FOR THE GINI FIELD
export const validateGiniCountry = body('gini.2019')
    .isNumeric().withMessage('¡EL VALOR INGRESADO DEBE SER NUMÉRICO!')
    .isFloat({min:0, max:100}).withMessage('¡!EL VALOR INGRESADO EN GINI DEBE ESTAR COMPRENDIDO ENTRE LOS VALORES 0 Y 100');