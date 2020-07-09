import { Request, Response } from 'express'
import { validationResult, Result } from 'express-validator'
import GlovoApiService from '../services/GlovoApiService'
import GeocoderService from '../services/GeocoderService'
import { LocationData } from '../types/locationData'
import discount from '../utils/discount'
import { CoordinatesData } from '../types/coordinatesData'

class PriceController {
  async getPrice(req: Request, res: Response) {
    const errors: Result = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() })
    }

    try {
      const locationData: LocationData = req.body

      const geocoderService = new GeocoderService()
      const coordinates: CoordinatesData[] = await geocoderService.getCoordinates(locationData)

      const glovoApiService = new GlovoApiService()
      const priceInfo = await glovoApiService.getPrice(coordinates)

      priceInfo.total.amount = discount(priceInfo.total.amount)

      return res.status(200).send({ result: priceInfo })
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}

export default PriceController
