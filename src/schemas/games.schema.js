import joi from 'joi'

export const gameSchema = joi.object({
  name: joi.string().required().min(1),
  stockTotal: joi.number().required().positive(),
  pricePerDay: joi.number().required().positive(),
  image: joi.string().required()
})