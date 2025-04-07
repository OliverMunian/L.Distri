const { ZodError } = require('zod');

function validate(schema) {
    return (req, res, next) => {
        try {
            const result = schema.parse(req.body);
            req.validatedData = result;
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({ error: err.format() }); //Si instance de zod detecte une erreur, renvoi la au
                
            }
            next(err);
        }
    };
}

module.exports = validate;