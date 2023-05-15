import joi from 'joi'

export const rentalSchema = joi.object({
  customerId: joi.number().required().integer(),
  gameId: joi.number().required().integer().min(1),
  daysRented: joi.number().required().greater(0),
})