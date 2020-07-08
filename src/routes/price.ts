import { Router } from 'express'
import PriceController from '../controllers/PriceController'
import validateLocationData from '../validations/validateLocationData'

const router = Router()
const priceController = new PriceController()

router.post('/delivery-price', validateLocationData, priceController.getPrice)

export default router
