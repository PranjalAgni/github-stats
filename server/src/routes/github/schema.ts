import Joi from "joi";

export default {
  username: Joi.object().keys({
    username: Joi.string().required()
  })
};
