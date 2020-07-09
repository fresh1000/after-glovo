import { LocationData } from '../types/locationData'
import GeocoderService from './GeocoderService'
import geocoder from '../configs/geocoder'
import { CoordinatesData } from '../types/coordinatesData'

describe('#geocoder service', () => {
  it('should return result with coordinates', async () => {
    const spy = jest.spyOn(geocoder, 'geocode').mockResolvedValue([{ latitude: 22, longitude: 33 }])
    const params = {
      from: 'Vatslava Havela Boulevard 6, Kiev, Kyiv city',
      to: 'Velyka Vasylkivska Street 22, Kiev, Kyiv city',
    } as LocationData

    const geocoderService = new GeocoderService()
    const result: CoordinatesData[] = await geocoderService.getCoordinates(params)

    expect(result[0].lat).toEqual(22)
    expect(result[0].lon).toEqual(33)
    expect(result[0].type).toEqual('PICKUP')
    expect(result[0].label).toEqual('Vatslava Havela Boulevard 6, Kiev, Kyiv city')

    spy.mockRestore()
  })

  it('should throw error', async () => {
    const spy = jest.spyOn(geocoder, 'geocode').mockRejectedValue(new Error('Mock error'))
    const params = {
      from: 'Vatslava Havela Boulevard 6, Kiev, Kyiv city',
      to: 'Velyka Vasylkivska Street 22, Kiev, Kyiv city',
    } as LocationData

    const geocoderService = new GeocoderService()

    await expect(geocoderService.getCoordinates(params)).rejects.toThrow(new Error('Cannot get coordinates by location name'))

    spy.mockRestore()
  })
})
