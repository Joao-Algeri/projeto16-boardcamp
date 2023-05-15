import joi from 'joi'

export const customerSchema = joi.object({
  name: joi.string().required().min(1),
  phone: joi.string().required().min(10).max(11).regex(/^\d+$/),
  cpf: joi.string().required().length(11).regex(/^\d+$/),
  birthday: joi.date().required()
})