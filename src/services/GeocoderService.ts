import * as nodeGeocoder from 'node-geocoder'
import { LocationData } from '../types/locationData'

class GeocoderService {
  async getCoordinates (data: LocationData) {
    try {
      const geocoder = nodeGeocoder({ provider: 'openstreetmap'})
      const fromCoordinates = await geocoder.geocode(data.from)
      const toCoordinates = await geocoder.geocode(data.to)

      const coordinates = [
        {
          type: 'PICKUP',
          lat: fromCoordinates[0].latitude,
          lon: fromCoordinates[0].longitude,
          label: data.from
        },
        {
          type: 'DELIVERY',
          lat: toCoordinates[0].latitude,
          lon: toCoordinates[0].longitude,
          label: data.to
        }
      ]
      return coordinates
    } catch (err) {
      throw new Error('Cannot get coordinates by location name')
    }
  }
}

export default GeocoderService
