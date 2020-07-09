import { body } from 'express-validator'

const validateLocationData = [
  body('from').isString(),
  body('to').isString(),
]

export default validateLocationData
