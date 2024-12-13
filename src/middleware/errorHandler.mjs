import { validationResult } from "express-validator";

export const validationErrorHandler = (req, res, next) =>{

    const error = validationResult(req);

    if (!error.isEmpty()) {
        const  detailsError = error.array().map((err)=>({
            field: err.path || 'Desconocido',
            value: err.value,
            message: err.msg,
            location: err.location 
        }));

        return res.status(400).json({
            success: false,
            errores: detailsError
        });
    }

    next();
};