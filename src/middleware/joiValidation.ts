import { INTERNET_SERVER_ERROR } from '../../config/default';

export const joiValidation = (schema, property) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[property], { convert: false });

      const valid = error == null;
      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        res.status(422).json({
          error: message
        });
      }
    } catch (err) {
      res.status(500).json({
        error: INTERNET_SERVER_ERROR
      });
    }
  };
};
